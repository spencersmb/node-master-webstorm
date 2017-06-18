// @flow

import React from 'react'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import secureLayout from '../hocs/secureLayout'
import type { User } from '../flowTypes/User'

const pageTitle = 'Our Store'

type Props = {
  url: any,
  isAuthenticated: boolean,
  dispatch: Function,
  currentUrl?: string,
  user: User
}

class TopStores extends React.Component<void, Props, void> {
  // Define local scoped vars
  user: User

  static async getInitialProps (ctx) {
    return {}
  }

  constructor (props: Props) {
    super(props)
    this.user = this.props.user
  }

  render () {
    return <div>Top page</div>
  }
}

const mapStateToProps = ({ user }) => ({ user })

export default withRedux(initStore, mapStateToProps)(
  secureLayout(TopStores, pageTitle)
)
