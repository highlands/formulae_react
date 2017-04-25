// @flow

import React from 'react'
import { SectionType } from '../../types'

type Props = {
  section: SectionType
}

export default function Section(props:Props) {
  const { section } = props

  return <h2>{section.get('title')}</h2>
}
