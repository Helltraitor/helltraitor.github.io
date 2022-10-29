import { type RouteRecordRaw } from 'vue-router'

export enum Category {
  Developing = 'Developing',
  Other = 'Other',
  Personal = 'Personal',
}

export interface IPost {
  id: string
  name: string
  created: Date
  updated: Date
  category: Category
  language: string
  tags: string[]
}

export class Post {
  constructor(public route: RouteRecordRaw, public meta: IPost) {}

  public static fromRouteRecord(route: RouteRecordRaw): Post | never {
    const post = (route.meta?.model as any).Post

    /* ID */
    const id: string = post.id
    if (typeof id !== 'string')
      throw new TypeError('Unable to get post id')

    /* NAME */
    let name: string

    if (typeof post.name === 'string')
      name = post.name
    else if (typeof route.name === 'string')
      name = route.name
    else
      throw new TypeError('Unable to get post name from meta and title')

    /* CREATED */
    const created = new Date(post.created)
    if (isNaN(created.getDate()))
      throw new TypeError(`Invalid created date field: "${post.created}"`)

    /* UPDATED */
    const updated = new Date(post.updated)
    if (isNaN(updated.getDate()))
      throw new TypeError(`Invalid updated date field: "${post.updated}"`)

    /* CATEGORY */
    const category = post.category as Category
    if (!Object.values(Category).includes(category))
      throw new TypeError(`Invalid category field: "${post.date}"`)

    if (category === undefined)
      throw new TypeError('Category field is not defined')

    /* LANGUAGE */
    const language: string = post.language
    if (typeof id !== 'string')
      throw new TypeError('Unable to get post language')

    /* TAGS */
    const tags = (Array.isArray(post.tags) ? post.tags as string[] : [])
      .filter((entity) => {
        return typeof entity === 'string'
      })

    /* BUILDING */
    return new Post(
      route,
      {
        id,
        name,
        created,
        updated,
        category,
        language,
        tags,
      },
    )
  }
}
