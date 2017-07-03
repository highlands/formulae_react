// @flow

import React from "react";
import Section from "./RespondToForm/Section";

type SectionType = {
  title: string
};

type FormType = {
  sections: Array<SectionType>
};

export default function RespondToForm(props: { form: FormType }) {
  const { form } = props;

  if (form === undefined) {
    return <p>No Form yet</p>;
  }
  const sections = generateSections(form.sections);

  return (
    <div>
      {sections}
    </div>
  );
}

function generateSections(sections) {
  debugger;
  if (sections === undefined) {
    return "ss";
  } else {
    return sections.map((section, i) => <Section key={i} section={section} />);
  }
}
