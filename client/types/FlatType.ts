import type { UserType } from "./UserType";

export type FlatType = {
    id: number,
    name: string,
    description: string,
    users: UserType[],
}

export type FlatInviteType = {
    inivited_by: string,
    flat_share: number,
    code: string,
    created_at: string
}