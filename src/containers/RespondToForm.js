import { connect } from 'react-redux'
import * as components from '../components'
import { increment, loadExampleForm } from '../actions'

export const RespondToForm = connect(
  function mapStateToProps(state) {
    return {
      form: state
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      increment: () => dispatch(increment()),
      loadExampleForm: () => dispatch(loadExampleForm())
    }
  }
)(components.RespondToForm)
