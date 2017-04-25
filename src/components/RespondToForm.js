// @flow

import React from "react";
import Section from "./RespondToForm/Section";
import { List } from "immutable";
import { SectionType, FormType } from "../types";

type Props = {
  form: FormType,
  increment: Function,
  loadExampleForm: Function
};

function generateSections(sections: List<SectionType>): Array<Section> {
  if (sections === undefined) {
    return [];
  } else {
    return sections
      .sortBy(section => section.order)
      .map((section, i) => <Section key={i} section={section} />)
      .toJS();
  }
}

export default function RespondToForm(props: Props) {
  const { form, increment, loadExampleForm } = props;

  const sections = generateSections(form.get("sections"));

  return (
    <div>
      {sections}
      <br />
      <button onClick={increment}>+</button>
      {form.get("count")}
      <button onClick={loadExampleForm}>Load Example Form</button>
    </div>
  );
}
