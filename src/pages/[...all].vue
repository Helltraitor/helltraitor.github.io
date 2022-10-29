<script setup lang="ts">
const location = window.location.toString()
const githubIssueLocation = 'https://github.com/Helltraitor/helltraitor.github.io/issues/new'
</script>

<template>
  <div
    m-a
    text-center
  >
    <div>
      <p
        m-2
        text-4xl
      >
        NOT FOUND
      </p>

      <p m-2>
        Location is not exist:
        <a
          underline
          :href="location"
        >{{ location }}
        </a>
      </p>

      <p>
        If this location <b>MUST</b> exist, you can
        <a
          underline
          :href="githubIssueLocation"
        >
          report issue
        </a>
      </p>
    </div>
  </div>
</template>
