---
title: Markdown шаблон
---

<route lang="yaml">
meta:
  model:
    Post:
      id: Markdown template
      name: Markdown шаблон
      created: 2022-10-29
      updated: 2022-10-29
      category: Other
      language: Russian
      tags:
        - helltraitor.github.io
        - markdown
        - typescript
        - vite
        - vue
</route>

# Markdown шаблон
Каждый пост в блоге **обязан** содержать две части:
- Заголовок в начале markdown файла (используется frontmatter)
- Route Post описание модели (используется индекс файлом блога)

Вот пример markdown файла (с этого шаблона):
```
---
title: Markdown шаблон
---

<route lang="yaml">
meta:
  model:
    Post:
      id: Markdown template
      name: Markdown шаблон
      created: 2022-10-29
      updated: 2022-10-29
      category: Other
      language: Russian
      tags:
        - helltraitor.github.io
        - markdown
        - typescript
        - vite
        - vue
</route>

# Заголовок
Содержание
```

## Подробности
Основная особенность - Post модель, позволяющая управлять постами в блоге.
Post содержится в теге `route` (предоставляемый [плагином Vite Vue layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)).
Эта информация доступна из сгенерированных страниц (предоставляемых [плагином Vite Vue pages](https://github.com/hannoeru/vite-plugin-pages)).

Модели должны содержать `id`, `name`, `created`, `updated`, `category`, `language` и `tags` (этот может быть пустым).
- `id` представляет уникальное строковое значение, которое используется
  для нахождения этих постов на других языках (Английский мне не родной).
  В таком случае, айди должен быть одним для разных языков
- `name` представляет имя, которое гость видит на странице блога.
  Для разных языков также может отличаться
- `created` и `updated` представляет собой даты, когда пост был создан или обновлен
- `category` представляет значение перечисления, которое определяет категорию поста.
  Все доступные категории могут быть найдены в файле `/src/code/models/post.ts`
- `language` похож на тег, только устанавливается единожды и для языка, также должен быть задан
- `tags` это список всех тегов, примененных для этого поста.
  Теги позволяют группировать посты по темам
```
meta:
  model:
    Post:
      id: Markdown template
      name: Markdown шаблон
      created: 2022-10-29
      updated: 2022-10-29
      category: Other
      language: Russian
      tags: []
```

В будущем, структура Post Markdown файла может измениться
Ожидаемые обновления:
- [ ] Тэги и похожие посты
- [ ] Категории и фильтры
- [ ] Главы (связанные markdown)
- [ ] Несколько языков для одного markdown файла
- [ ] Полную подсветку кода через `highlight-js` для `markdown-it`
