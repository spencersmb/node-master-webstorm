// @flow
import Review from './review'
import React from 'react'
import { connect } from 'react-redux'

// interface ReviewType {
//   +_id: String,
//   +store: String,
//   +text: String,
//   +rating: Number
// }
type AuthorType = {
  _id: String,
  name: String,
  email: String,
  gravatar: String,
  hearts: String[]
}

type ReviewType = {
  +_id: String,
  +store: String,
  +text: String,
  +rating: number,
  +created: String,
  +author: AuthorType
}

type Props = {
  reviews: ReviewType[]
}

const reviewList = ({ reviews }: Props) => {
  const renderStores = (): React.Element<*>[] | React.Element<*> => {
    if (reviews) {
      return reviews.map(review => {
        return <Review key={review._id} {...review} />
      })
    }
    return <div>There are no reviews yet. </div>
  }

  return (
    <div className='reviews'>
      {renderStores()}
    </div>
  )
}

export default connect()(reviewList)
