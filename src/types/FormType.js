// @flow

import { Record, List } from 'immutable'
import SectionType from './SectionType'

export default class FormType extends Record({
  sections: List(),
  count: 0
}) {
  sections: List<SectionType>
  count: number
}

