import { type RouteRecordRaw } from 'vue-router'

export enum Category {
  Developing = 'Developing',
  Personal = 'Personal',
}

export interface IPost {
  name: string
  date: Date
  category: Category
  tags: string[]
}

export class Post {
  constructor(public route: RouteRecordRaw, public meta: IPost) {}

  public static fromRouteRecord(route: RouteRecordRaw): Post | never {
    const post = (route.meta?.model as any).Post

    const date = new Date(post.date)
    if (isNaN(date.getDate()))
      throw new TypeError(`Invalid date field: "${post.date}"`)

    const category = post.category as Category
    if (!Object.values(Category).includes(category))
      throw new TypeError(`Invalid category field: "${post.date}"`)

    if (category === undefined)
      throw new TypeError('Category field is not defined')

    const tags = Array.isArray(post.tags) ? post.tags as string[] : []
    const name: string = post.name || route.name || 'Unknown'

    return new Post(route, { name, date, category, tags })
  }
}
