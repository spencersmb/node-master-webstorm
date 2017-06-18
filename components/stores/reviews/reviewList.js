// @flow
import Review from './review'
import React from 'react'
import { connect } from 'react-redux'

type AuthorType = {
  _id: string,
  name: string,
  email: string,
  gravatar: string,
  hearts: string[]
}

type ReviewType = {
  +_id: string,
  +store: string,
  +text: string,
  +rating: number,
  +created: string,
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
