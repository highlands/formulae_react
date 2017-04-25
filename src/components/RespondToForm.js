// @flow

import React from 'react'
import Section from './RespondToForm/Section'
import { Record } from 'immutable'
import { SectionType, FormType } from '../types'

type Props = {
  form: FormType,
  increment: Function,
  loadExampleForm: Function
}

function generateSections(sections: Array<SectionType>) : Array<Section>{
  if(sections === undefined){
    return []
  } else {
    return sections.map((section, i) => <Section key={i} section={section} />)
  }
}

export default function RespondToForm(props: Props) {
  const { form, increment, loadExampleForm } = props

  const sections = generateSections(form.sections)

  return <div>
    {sections}
    <br />
    <button onClick={increment}>+</button>
    {form.get('count')}
    <button onClick={loadExampleForm}>Load Example Form</button>
  </div>
}
