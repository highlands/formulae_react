// @flow
import { Map } from "immutable";

const mapOfTypes = new Map({
  string: "Single Line Text",
  text: "Paragraph Text",
  select: "Dropdown List",
  radio: "Multiple Choices",
  boolean: "Yes/No",
  address: "Address",
  content: "Content",
  multiselect: "Multi Select",
  checkboxes: "Checkboxes"
});

export default function getFriendlyQuestionType(questionType: string) {
  return mapOfTypes.get(questionType);
}
