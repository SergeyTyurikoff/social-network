import {z} from 'zod'
import {validateResponse} from "./validateResponse.ts";

export const PostSchema = z.object({
    id: z.string(),
    text: z.string(),
    authorId: z.string(),
    createdAt: z.number(),
})

export type Post = z.infer<typeof PostSchema>
export const PostList = z.array(PostSchema)

export type PostList = z.infer<typeof PostList>

export const FetchPostListSchema = z.object({
    list: PostList,
})

type FetchPostListResponse = z.infer<typeof FetchPostListSchema>

export function fetchPostList(): Promise<FetchPostListResponse> {
    return fetch("/api/posts")
        .then(response => response.json()
        .then(data => FetchPostListSchema.parse(data)))
}

export function createPost(text: string): Promise<void> {
    return fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text,
        }),
    })
        .then(validateResponse)
        .then(() => undefined)
}