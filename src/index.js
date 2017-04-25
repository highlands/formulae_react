import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import { RespondToForm } from './containers'
import './index.css'

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <RespondToForm />
  </Provider>,
  document.getElementById('root')
)
