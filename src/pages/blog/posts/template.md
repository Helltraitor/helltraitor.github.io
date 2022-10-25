---
title: Markdown template
---

# Markdown template
Any Post in blog **must** include two parts:
- Title on top of the markdown file (Used by frontmatter)
- Route Post model description

Here is an example of markdown file (this template file):
```
---
title: Markdown template
---

# Header
Content

<route lang="yaml">
meta:
  model:
    Post:
      name: Markdown template
      date: 2022-10-26
      category: Other
      language: English
      tags:
        - helltraitor.github.io
        - markdown
        - typescript
        - vite
        - vue
</route>
```

In future, structure of the Post Markdown file may change
Pending features:
- [ ] Tags and related to this posts
- [ ] Category and tag filtering
- [ ] Chapters (linked markdown)
- [ ] Several languages for one markdown file
- [ ] Full highlight via highlight-js for markdown-it

<route lang="yaml">
meta:
  model:
    Post:
      name: Markdown template
      date: 2022-10-26
      category: Other
      language: English
      tags:
        - helltraitor.github.io
        - markdown
        - typescript
        - vite
        - vue
</route>
