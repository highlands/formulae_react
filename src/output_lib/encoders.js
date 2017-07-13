// @flow
const uuidV4 = require("uuid/v4");

import {
  QuestionType,
  QuestionDependencyType,
  QuestionDependencyChoiceType,
  FormType,
  FormSubmissionType,
  FormQuestionSubmissionType,
  ChoiceType
} from "./types";

import { List } from "immutable";

type ApiQuestionSubmission = {
  question_id: string,
  string: ?string,
  text: ?string,
  boolean: ?boolean,
  composite: ?Object
};

type ApiFormSubmission = {
  form_id: string,
  question_submissions: Array<ApiQuestionSubmission>
};

type ApiChoice = {
  id: string,
  label: string,
  metadata: ?Object,
  maximum_chosen: ?number
};

type ApiQuestionDependencyChoice = {
  id: string,
  choice_id: string
};

type ApiQuestionDependency = {
  id: string,
  and: boolean,
  display: boolean,
  question_dependency_choices: Array<ApiQuestionDependencyChoice>
};

type ApiQuestion = {
  id: string,
  key: string,
  label: string,
  content: string,
  question_type: string,
  validate_as: string,
  order: number,
  question_dependency: ?ApiQuestionDependency,
  _destroy: ?boolean,
  choices: Array<ApiChoice>
};

type ApiSection = {
  id: string,
  name: ?string,
  order: ?number,
  content: ?string,
  _destroy: ?boolean
};

type ApiForm = {
  id: string,
  application_id: string,
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
    boolean: questionSubmission.boolean,
    composite: questionSubmission.composite
  };
}

function encodeFormSubmission(
  formSubmission: FormSubmissionType
): ApiFormSubmission {
  return {
    form_id: formSubmission.formId,
    question_submissions: formSubmission.questionSubmissions
      .map(submission => submission.map(encodeFormQuestionSubmission))
      .toJS()
  };
}

function encodeQuestion(question: QuestionType): ApiQuestion {
  return {
    id: question.id,
    key: question.key,
    label: question.label,
    content: question.content,
    required: question.required,
    placeholder: question.placeholder,
    question_type: question.type,
    validate_as: question.validateAs,
    order: question.order,
    question_dependency: question.questionDependency
      ? encodeQuestionDependency(question.questionDependency)
      : undefined,
    _destroy: question.deleted,
    choices: question.choices.map(encodeChoice).toArray()
  };
}

function encodeQuestionDependency(
  questionDependency: QuestionDependencyType
): ApiQuestionDependency {
  return {
    id: questionDependency.id,
    and: questionDependency.and,
    display: questionDependency.boolean,
    question_dependency_choices: encodeQuestionDependencyChoices(
      questionDependency.questionDependencyChoices
    )
  };
}

function encodeQuestionDependencyChoices(
  questionDependencyChoices: List<QuestionDependencyChoiceType>
): Array<ApiQuestionDependencyChoice> {
  return questionDependencyChoices.map(encodeQuestionDependencyChoice).toJS();
}

function encodeQuestionDependencyChoice(
  questionDependencyChoice: QuestionDependencyChoiceType
): ApiQuestionDependencyChoice {
  return {
    id: questionDependencyChoice.id,
    choice_id: questionDependencyChoice.choiceId,
    _destroy: questionDependencyChoice.deleted
  };
}

function encodeChoice(choice: ChoiceType): ApiChoice {
  return {
    id: choice.id,
    label: choice.label,
    _destroy: choice.deleted,
    metadata: choice.metadata,
    maximum_chosen: choice.maximumChosen
  };
}

function encodeSection(section: QuestionType): ApiSection {
  return {
    id: section.id,
    name: section.name,
    order: section.order,
    questions: section.questions.map(encodeQuestion).toArray(),
    content: section.content,
    _destroy: section.deleted
  };
}

function encodeForm(form: FormType): ApiForm {
  return {
    id: form.id === "" ? uuidV4() : form.id,
    application_id: form.applicationId,
    completion_content: form.completionContent,
    sections: form.sections.toArray().map(encodeSection)
  };
}

export { encodeForm, encodeFormSubmission };
