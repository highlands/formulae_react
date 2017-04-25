import { connect } from 'react-redux'
import * as components from './components'
import { increment } from './actions'

export const RespondToForm = connect(
  function mapStateToProps(state) {
    return {
      form: state
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      increment
    }
  }
)(components.RespondToForm)
