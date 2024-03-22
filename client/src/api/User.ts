import { z } from 'zod'
import {validateResponse} from "./validateResponse.ts";

export const UserSchema = z.object({
    id: z.string(),
    username: z.string(),
})
export type User = z.infer<typeof UserSchema>

export const loginSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8),
})
export type Login = z.infer<typeof loginSchema>

export const registerUserSchema = z.object({
    email: z.string().email(),
    username: z.string().min(5),
    password: z.string().min(8),
})
export type RegisterUser = z.infer<typeof registerUserSchema>

export function fetchUser(id: string): Promise<User> {
    return fetch(`/api/users/${id}`)
        .then(resp => resp.json())
        .then(data => UserSchema.parse(data))
}

export function registerUser(data: RegisterUser): Promise<void> {
    return fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(() => undefined)
}

export function login(data: Login): Promise<void> {
    return fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(validateResponse)
        .then(() => undefined)
}

export function logout(): Promise<void> {
    return fetch('/api/logout/')
        .then(validateResponse)
        .then(() => undefined)
}

export function fetchMe(): Promise<User> {
    return fetch("/api/users/me")
        .then(validateResponse)
        .then(response => response.json())
        .then(data => UserSchema.parse(data))
}