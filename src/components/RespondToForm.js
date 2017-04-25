// @flow

import React from 'react'
import Section from './RespondToForm/Section'

type SectionType = {
  title: string
}

type FormType = {
  sections: Array<SectionType>
}

export default function RespondToForm(props: { form: FormType }) {
  const { form } = props

  const sections = generateSections(form.sections)

  return <div>
    {sections}
  </div>
}

function generateSections(sections){
  if(sections === undefined){
    return []
  } else {
    return sections.map((section, i) => <Section key={i} section={section} />)
  }
}
