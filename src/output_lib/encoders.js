// @flow

import {
  QuestionType,
  FormType,
  FormSubmissionType,
  FormQuestionSubmissionType
} from "./types";

type ApiQuestionSubmission = {
  question_id: number,
  string: ?string,
  text: ?string,
  boolean: ?boolean
};

type ApiFormSubmission = {
  form_id: number,
  question_submissions: Array<ApiQuestionSubmission>
};

type ApiQuestion = {
  key: string,
  label: string,
  content: string,
  question_type: string,
  validate_as: string,
  order: number
};

type ApiSection = {
  form_id: ?number,
  name: ?string,
  order: ?number,
  content: ?string
};

type ApiForm = {
  application_id: ?number,
  completion_content: ?string,
  sections: Array<ApiSection>
};

function encodeFormQuestionSubmission(
  questionSubmission: FormQuestionSubmissionType
): ApiQuestionSubmission {
  return {
    question_id: questionSubmission.questionId,
    string: questionSubmission.string,
    text: questionSubmission.text,
    boolean: questionSubmission.boolean
  };
}

function encodeFormSubmission(
  formSubmission: FormSubmissionType
): ApiFormSubmission {
  return {
    form_id: formSubmission.formId,
    question_submissions: formSubmission.questionSubmissions.map(submission =>
      submission.map(encodeFormQuestionSubmission))
  };
}

function encodeQuestion(question: QuestionType): ApiQuestion {
  return {
    key: question.key,
    label: question.label,
    content: question.content,
    required: question.required,
    placeholder: question.placeholder,
    question_type: question.type,
    validate_as: question.validateAs,
    order: question.order
  };
}

function encodeSection(section: QuestionType): ApiSection {
  return {
    form_id: undefined,
    name: section.name,
    order: section.order,
    questions: section.questions.map(encodeQuestion).toArray(),
    content: section.content
  };
}

function encodeForm(form: FormType): ApiForm {
  return {
    application_id: 1,
    completion_content: form.completionContent,
    sections: form.sections.toArray().map(encodeSection)
  };
}

export { encodeForm, encodeFormSubmission };
