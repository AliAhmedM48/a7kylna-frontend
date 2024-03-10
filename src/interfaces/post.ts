import { User } from "./user"

export type Post = {
    _id?: string
    title: string
    content: string
    owner: User
    createdAt?: string
    updatedAt?: string
    image?: string
}
