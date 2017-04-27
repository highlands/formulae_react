// @flow

import { FormType, SectionType, QuestionType } from "./types";
import { List } from "immutable";

type ApiApplication = {
  id: number,
  created_at: string,
  updated_at: string
};

type ApiSection = {
  id: number,
  form_id: number,
  name: string,
  order: number,
  content: string,
  created_at: string,
  updated_at: string
};

type ApiQuestion = {
  id: number,
  key: string,
  label: string,
  content: string,
  order: number,
  hidden: boolean,
  question_type: string,
  validate_as: string | null,
  created_at: string,
  updated_at: string,
  section_id: number
};

type ApiForm = {
  id: number,
  application: ApiApplication,
  sections: Array<ApiSection>,
  questions: Array<ApiQuestion>
};

function decodeSection(
  section: ApiSection,
  questions: List<QuestionType>
): SectionType {
  return new SectionType({
    name: section.name,
    content: section.content,
    order: section.order,
    questions: List(
      questions.filter(question => {
        return question.get("section_id") === section.id;
      })
    )
  });
}

function decodeQuestion(question: ApiQuestion): QuestionType {
  return new QuestionType({
    key: question.key,
    label: question.label,
    type: question.question_type,
    order: question.order,
    section_id: question.section_id
  });
}

function decodeFormType(data: ApiForm): FormType {
  // Decode the questions on their own
  const questions = List(data.questions.map(decodeQuestion));
  return new FormType({
    sections: List(
      data.sections.map(section => {
        return decodeSection(section, questions);
      })
    )
  });
}

export { decodeFormType };
