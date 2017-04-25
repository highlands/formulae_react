// @flow

import { Record } from 'immutable'

export default class SectionType extends Record({
  title: '',
  order: 0
}) {
  title: string
  order: number
}

