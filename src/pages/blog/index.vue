<!-- eslint-disable curly -->
<script setup lang="ts">
import type { Ref } from 'vue'
import { parseQuery } from 'vue-router'

import generatedPages from '~pages'
import { Post, Category as PostCategory } from '~/code/models/post'

/* RECORDS */
interface IDisplayablePost {
  post: Post
  showed: Ref<boolean>
}

const records: IDisplayablePost[] = generatedPages
  .filter(({ path }) => { return path.includes('/blog/posts/') })
  .map((route) => {
    try {
      return Post.fromRouteRecord(route)
    }
    catch (error) {
      /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error(`Unable to get post from "${route.path}"`, error)
    }
    return undefined
  })
  .filter((post) => { return post instanceof Post })
  // This map fix type issue with TypeScript
  .map((post) => { return post as Post })
  .map((post) => { return { post, showed: ref(true) } })

/* POSTS BY CATEGORY */
const categoryRecords: Map<string, IDisplayablePost[]> = new Map()
for (const record of records) {
  const category = record.post.meta.category
  if (!categoryRecords.has(category))
    categoryRecords.set(category, [])

  categoryRecords.get(category)?.push(record)
}
/* ----------------- */

/* POSTS BY LANGUAGE */
const languageRecords: Map<string, IDisplayablePost[]> = new Map()
for (const record of records) {
  const language = record.post.meta.language
  if (!languageRecords.has(language))
    languageRecords.set(language, [])

  languageRecords.get(language)?.push(record)
}
/* ----------------- */

/* POSTS BY TAG */
const tagRecords: Map<string, IDisplayablePost[]> = new Map()
for (const record of records) {
  for (const tag of record.post.meta.tags) {
    if (!tagRecords.has(tag))
      tagRecords.set(tag, [])

    tagRecords.get(tag)?.push(record)
  }
}
/* ------------ */

/* QUERY */
const query = parseQuery(window.location.search.substring(1))

const queryCategory = Array.isArray(query.category) ? query.category[0] : query.category || ''
const queryLanguage = Array.isArray(query.language) ? query.language[0] : query.language || ''

const queryTags = (Array.isArray(query.tag) ? query.tag : [])
  .map((value) => { return value as string })
/* ----- */

/* REFERENCES */
const requiredCategory = ref(
  Object.values(PostCategory)
    .includes(queryCategory as PostCategory)
    ? queryCategory as string
    : null,
)
const requiredLanguage = ref(queryLanguage || null)
const requiredTags = ref(new Set(queryTags))
/* ---------- */

/* UPDATING */
const updatePostShowedRef = () => {
  const candidateRecords = records.map(({ post, showed }) => {
    return { post, showed, mustShow: true }
  })

  if (requiredCategory.value) {
    candidateRecords.forEach((record) => {
      record.mustShow = record.post.meta.category as string === requiredCategory.value
    })
  }

  if (requiredLanguage.value) {
    candidateRecords
      .filter(({ mustShow }) => mustShow)
      .forEach((record) => {
        record.mustShow = record.post.meta.language as string === requiredLanguage.value
      })
  }

  if (requiredTags.value.size !== 0) {
    candidateRecords
      .filter(({ mustShow }) => mustShow)
      .forEach((record) => {
        const tagStack = new Set([...requiredTags.value.keys()])
        record.post.meta.tags.forEach(tag => tagStack.delete(tag))
        record.mustShow = tagStack.size === 0
      })
  }

  candidateRecords
    .filter(({ showed, mustShow }) => { return showed.value !== mustShow })
    .forEach(({ showed, mustShow }) => { showed.value = mustShow })
}
/* -------- */

/* WATCHERS */
watch(requiredCategory, updatePostShowedRef)
watch(requiredLanguage, updatePostShowedRef)
watch(requiredTags, updatePostShowedRef)

/* SETUP */
onMounted(updatePostShowedRef)
</script>

<template>
  <ul>
    <li
      v-for="({ post, showed }, index) of records" :key="index"
      mb-4
      flex flex-col
    >
      <div v-show="showed.value">
        <RouterLink
          class="icon-btn"
          :to="post.route.path"
        >
          <div>
            <p text-xl>
              {{ post.meta.name }}
            </p>
            <div flex>
              <p
                text-sm
                text-gray-400 dark:text-gray-500
              >
                {{ post.meta.updated.toDateString() }}
                - {{ post.meta.category }}, {{ post.meta.language }}
              </p>
            </div>
          </div>
        </RouterLink>
      </div>
    </li>
  </ul>
</template>
