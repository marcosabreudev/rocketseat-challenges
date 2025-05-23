// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password_hash: string
      created_at: string
    }

    meals: {
      id: string
      name: string
      description?: string
      date_time: string
      diet_part: boolean
      user_id: string
    }
  }
}
