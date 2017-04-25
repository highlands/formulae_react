import React from 'react'
import ReactDOM from 'react-dom'
import Section from './Section'
import { SectionType } from '../../types'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Section section={new SectionType()} />, div)
})

it('renders the title in an h2', () => {
  const div = document.createElement('div')
  const section = new SectionType({ title: "Second" })

  const subject = shallow(<Section section={section} increment={() => {}} />)

  expect(subject.text()).toMatch(/Second/)
})
