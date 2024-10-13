import type { UserType } from "./UserType";

export type FlatType = {
    id: number,
    name: string,
    description: string,
    users: UserType[],
}