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

/* QUERY UPDATING */
const updateQuerySearch = () => {
  const queryParameters = new URLSearchParams()

  if (requiredCategory.value)
    queryParameters.append('category', requiredCategory.value)

  if (requiredLanguage.value)
    queryParameters.append('language', requiredLanguage.value)

  if (requiredTags.value.size !== 0)
    for (const tag of requiredTags.value.keys())
      queryParameters.append('tag', tag)

  const queryString = queryParameters.toString()
  const relativePath = window.location.pathname + (
    queryString.length === 0 ? '' : `?${queryString}`
  )
  window.history.replaceState(null, '', relativePath)
}
/* -------- */

/* WATCHERS */
watch(requiredCategory, updatePostShowedRef)
watch(requiredLanguage, updatePostShowedRef)
watch(requiredTags, updatePostShowedRef, { deep: true })

watch(requiredCategory, updateQuerySearch)
watch(requiredLanguage, updateQuerySearch)
watch(requiredTags, updateQuerySearch, { deep: true })
/* -------- */

/* SETUP */
onMounted(updatePostShowedRef)

const isFilterShowed = ref(false)

/* TAG INPUT */
const tagInput = ref(null)
const tagInputHandler = () => {
  if (!tagInput.value)
    return

  // No need to check requiredTags since it set storage
  if (tagRecords.has(tagInput.value)) {
    requiredTags.value.add(tagInput.value)
    tagInput.value = null
  }
}
</script>

<template>
  <div mb-6>
    <button
      btn
      class="filter-button"
      @click="isFilterShowed = !isFilterShowed"
    >
      <p v-if="!isFilterShowed">
        Show filter options
      </p>
      <p v-else>
        Hide filter options
      </p>
    </button>
    <div
      v-show="isFilterShowed"
      mt-4 mb-4 p-1
      b-1 b-rd
    >
      <div flex flex-col>
        <span m-2 flex>
          <p mr-2>
            Category:
          </p>
          <select v-model="requiredCategory" b-rd>
            <option :value="null" />
            <option v-for="(category, index) of categoryRecords.keys()" :key="index">
              {{ category }}
            </option>
          </select>
        </span>
        <span m-2 flex>
          <p mr-2>
            Language:
          </p>
          <select v-model="requiredLanguage" b-rd>
            <option :value="null" />
            <option v-for="(language, index) of languageRecords.keys()" :key="index">
              {{ language }}
            </option>
          </select>
        </span>

        <div m-2 flex flex-col>
          <div flex>
            <p mr-2>
              Tag:
            </p>
            <input
              v-model="tagInput"
              b-1 b-rd
              pl-1 pr-1
              placeholder="Type some tag"
              @keydown.enter="tagInputHandler()"
            >
          </div>
          <div
            m-2
            flex
            gap-1
          >
            <button
              v-for="(tag, index) of requiredTags.keys()" :key="index"
              btn
              b-1
              b-rd pr-2
              pl-2 flex
              class="remove-button"
              @click="requiredTags.delete(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

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

<style scoped lang="sass">
button.filter-button
  background-color: cadetblue
  transition: all 0.4s

button.filter-button:hover
  filter: brightness(85%)
  transition: all 0.4s

button.remove-button
  background-color: lightsalmon
  transition: all 0.4s

button.remove-button:hover
  filter: brightness(85%)
  transition: all 0.4s
</style>
