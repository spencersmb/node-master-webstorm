import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, reset } from 'redux-form'
import {
  signinUser,
  saveUserToRedux,
  getUserHearts
} from '../../actions/authActions'
import { toastr } from 'react-redux-toastr'
import Router from 'next/router'
import { getUserFromJWT } from '../../utils/authUtils'

class LoginFormComponent extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  async handleFormSubmit ({ email, password }) {
    try {
      const response = await this.props.signinUser({ email, password })
      const user = getUserFromJWT(response.token)
      user.hearts = response.hearts
      this.props.saveUser(user)
      toastr.success('Success:', user.name + ' Logged In!')
      Router.push(`/stores`)
    } catch (e) {
      toastr.error('Error:', e.message)
    }
  }

  render () {
    // handleSubmit is a function given to us from Redux-form
    const { handleSubmit, errorMessage, valid } = this.props
    const loginErrorText = () => {
      if (errorMessage) {
        return (
          <div className='bs-callout bs-callout-danger'>
            <h4>
              {errorMessage}
            </h4>
          </div>
        )
      }
    }

    return (
      <form className='form' onSubmit={handleSubmit(this.handleFormSubmit)}>
        <h2>Login</h2>
        <label>Email:</label>
        <Field
          className='form-control'
          name='email'
          component='input'
          type='email'
        />
        <label>Password:</label>
        <Field
          className='form-control'
          name='password'
          component='input'
          type='password'
        />
        {loginErrorText()}
        <input
          type='submit'
          className='button'
          value='Login'
          disabled={valid === false ? 'disabled' : ''}
        />
      </form>
    )
  }
}
// Login.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   actions: PropTypes.object,
//   errorMessage: PropTypes.string
// }

// const mapStateToProps = (state, ownProps) => {
//     return {
//         errorMessage: state.auth.error
//     };
// };

const mapDispatchToProps = dispatch => {
  return {
    signinUser: bindActionCreators(signinUser, dispatch),
    saveUser: bindActionCreators(saveUserToRedux, dispatch),
    getUserHearts: bindActionCreators(getUserHearts, dispatch)
  }
}

const LoginForm = reduxForm({ form: 'loginForm' })(LoginFormComponent)
export default connect(null, mapDispatchToProps)(LoginForm)
