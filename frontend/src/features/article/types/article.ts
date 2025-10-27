import { User } from "@/types/user"

export type Article = {
  id: number
  title: string
  content: string
  published: boolean
  created_at: string
  user?: User
}
