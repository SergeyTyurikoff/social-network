import { z } from 'zod'
export const PostSchema = z.object({
    id: z.string(),
    text: z.string(),
    authorId: z.string(),
    createdAt: z.number(),
})

export type Post = z.infer<typeof PostSchema>
export const PostList = z.array(PostSchema)

export type PostList = z.infer<typeof PostList>

/*
export interface Post {
    /!**
     * Идентификатор поста
     *!/
    id: string;
    text: string;
    authorId: string;
    createdAt: number;
}

export type PostList = Post[];

function isPost(data: unknown): data is Post {
    return (
        typeof data === 'object' &&
        data !== null &&
        "id" in data &&
        typeof data.id === "string" &&
        "text" in data &&
        typeof data.text === "string" &&
        "authorId" in data &&
        typeof data.authorId === "string" &&
        "createdAt" in data &&
        typeof data.createdAt === "number"
    );
}*/
