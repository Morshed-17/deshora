import { Schema, Types } from "mongoose"

export interface TCategory {
    title: string
    slug: string
    description: string
    children?: Types.ObjectId[];
    parent?: Types.ObjectId | null
    isDeleted: boolean
    isNested: boolean
}
