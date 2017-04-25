// @flow

import { FormType } from './types'

const init = new FormType()

type Action =
  'INCREMENT' |
  'TOGGLE_TODO'

export default function reducer(form:FormType = init, action:{ type: Action }) {
  switch(action.type) {
    case 'INCREMENT':
      return form.set('count', form.get('count') + 1)
    case 'TOGGLE_TODO':
      return form
    default:
      return form
  }
}
