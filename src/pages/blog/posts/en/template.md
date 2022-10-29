---
title: Markdown template
---

<route lang="yaml">
meta:
  model:
    Post:
      id: Markdown template
      name: Markdown template
      created: 2022-10-26
      updated: 2022-10-29
      category: Other
      language: English
      tags:
        - helltraitor.github.io
        - markdown
        - typescript
        - vite
        - vue
</route>

# Markdown template
Any Post in blog **must** include two parts:
- Title on top of the markdown file (used by frontmatter)
- Route Post model description (used by blog index file)

Here is an example of markdown file (this template file):
```
---
title: Markdown template
---

<route lang="yaml">
meta:
  model:
    Post:
      id: Markdown template
      name: Markdown template
      created: 2022-10-26
      updated: 2022-10-29
      category: Other
      language: English
      tags:
        - helltraitor.github.io
        - markdown
        - typescript
        - vite
        - vue
</route>

# Header
Content
```

## Dive in
The major feature is the post model that allows to manage posts in blog.
A post is contained in `route` tag (given by [Vite Vue layouts plugin](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)).
That information can be accessed from generated pages (given by [Vite Vue pages plugin](https://github.com/hannoeru/vite-plugin-pages)).

Model must contain `id`, `name`, `created`, `updated`, `category`, `language` and `tags` (this tag can be empty).
- `id` represents unique string value that can be used for searching
  this post in other language (English is my foreign language). In that
  case, id must be same for posts in different languages
- `name` represents the name that guest can see on the blog page.
  For different languages it can different too
- `created` and `updated` represents dates when post was created or updated
- `category` represents enum value that can determine category of post.
  All available categories can be found in `/src/code/models/post.ts` file
- `language` same as tag but sets once and for language, also must be set
- `tags` is the list of all tags that applied to this post.
  Tags allows to group posts by theme
```
meta:
  model:
    Post:
      id: Markdown template
      name: Markdown template
      created: 2022-10-26
      updated: 2022-10-29
      category: Other
      language: English
      tags: []
```

In future, structure of the Post Markdown file may change
Pending features:
- [ ] Tags and related to this posts
- [ ] Category and tag filtering
- [ ] Chapters (linked markdown)
- [ ] Several languages for one markdown file
- [ ] Full highlight via highlight-js for markdown-it
