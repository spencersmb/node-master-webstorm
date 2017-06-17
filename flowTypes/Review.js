// @flow
import type {User} from './User.js'
export type Review = {
  +_id: string,
  +store: string,
  +text: string,
  +rating: number,
  +created: string,
  +author: User
}
