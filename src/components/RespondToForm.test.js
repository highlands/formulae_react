import React from 'react'
import ReactDOM from 'react-dom'
import RespondToForm from './RespondToForm'
import Section from './RespondToForm/Section'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RespondToForm form={{}}/>, div)
})

it('renders each section', () => {
  const div = document.createElement('div')
  const form = {
    sections: [
      { title: "First" },
      { title: "Second" },
    ]
  }

  const subject = shallow(<RespondToForm form={form} />)

  expect(subject.find(Section).length).toBe(2)
})
