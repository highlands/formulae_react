// @flow

import { Record } from 'immutable'
import SectionType from './SectionType'

class FormType extends Record({
  sections: []
}) {
  sections: Array<SectionType>
}

