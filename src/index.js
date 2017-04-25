import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import { RespondToForm } from './containers'
import './index.css'

ReactDOM.render(
  <RespondToForm />,
  document.getElementById('root')
)
