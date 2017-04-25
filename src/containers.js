import { connect } from 'react-redux'
import * as components from './components'
import { addTodo, toggleTodo } from './actions'

export const RespondToForm = connect(
  function mapStateToProps(state) {
    return { form: state }
  },
  function mapDispatchToProps(dispatch) {
    return {
    }
  }
)(components.RespondToForm)
