<!-- eslint-disable curly -->
<script setup lang="ts">
import generatedPages from '~pages'
import { Post } from '~/code/models/post'

const postPages = generatedPages
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
  .filter((blogPost) => { return blogPost instanceof Post })
  // This map fix type issue with TypeScript
  .map((blogPost) => { return blogPost as Post })
</script>

<template>
  <ul>
    <li v-for="(post, index) of postPages" :key="index">
      <a :href="post.route.path">{{ post.meta.name }}</a>
    </li>
  </ul>
</template>
