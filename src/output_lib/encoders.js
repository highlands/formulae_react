// @flow

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
  question_id: number,
  string: ?string,
  text: ?string,
  boolean: ?boolean,
  composite: ?Object
};

type ApiFormSubmission = {
  form_id: number,
  question_submissions: Array<ApiQuestionSubmission>
};

type ApiChoice = {
  id: ?number,
  label: string,
  metadata: ?Object,
  maximum_chosen: ?number
};

type ApiQuestionDependencyChoice = {
  id: ?number,
  choice_id: number | string
};

type ApiQuestionDependency = {
  id: ?number,
  and: boolean,
  display: boolean,
  question_dependency_choices: Array<ApiQuestionDependencyChoice>
};

type ApiQuestion = {
  id: ?number,
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
  id: ?number,
  name: ?string,
  order: ?number,
  content: ?string,
  _destroy: ?boolean
};

type ApiForm = {
  id: ?number,
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
    id: typeof question.id === "number" ? question.id : undefined,
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
    id: typeof questionDependency.id === "number"
      ? questionDependency.id
      : undefined,
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
    id: typeof questionDependencyChoice.id === "number"
      ? questionDependencyChoice.id
      : undefined,
    choice_id: questionDependencyChoice.choiceId,
    _destroy: questionDependencyChoice.deleted
  };
}

function encodeChoices(choices: List<ChoiceType>): Array<ApiChoice> {
  return choices.map(encodeChoice).toJS();
}

function encodeChoice(choice: ChoiceType): ApiChoice {
  return {
    id: typeof choice.id === "number" ? choice.id : undefined,
    label: choice.label,
    _destroy: choice.deleted,
    metadata: choice.metadata,
    maximum_chosen: choice.maximumChosen
  };
}

function encodeSection(section: QuestionType): ApiSection {
  return {
    id: typeof section.id === "number" ? section.id : undefined,
    name: section.name,
    order: section.order,
    questions: section.questions.map(encodeQuestion).toArray(),
    content: section.content,
    _destroy: section.deleted
  };
}

function encodeForm(form: FormType): ApiForm {
  return {
    id: typeof form.id === "number" ? form.id : undefined,
    application_id: 1,
    completion_content: form.completionContent,
    sections: form.sections.toArray().map(encodeSection)
  };
}

export { encodeForm, encodeFormSubmission };
