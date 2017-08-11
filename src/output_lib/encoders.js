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
  id: ?string,
  label: string,
  order: number,
  //metadata: ?Object,
  maximum_chosen: ?number,
  uuid: ?string
};

type ApiQuestionDependencyChoice = {
  id: ?string,
  choice_id: string,
  uuid: ?string
};

type ApiQuestionDependency = {
  id: ?string,
  and: boolean,
  display: boolean,
  question_dependency_choices: Array<ApiQuestionDependencyChoice>,
  uuid: ?string
};

type ApiQuestion = {
  id: ?string,
  key: string,
  label: string,
  content: string,
  question_type: string,
  validate_as: string,
  order: number,
  question_dependency: ?ApiQuestionDependency,
  _destroy: ?boolean,
  choices: Array<ApiChoice>,
  uuid: ?string
};

type ApiSection = {
  id: ?string,
  name: ?string,
  order: ?number,
  content: ?string,
  _destroy: ?boolean,
  uuid: ?string
};

type ApiForm = {
  id: ?string,
  application_id: string,
  completion_content: ?string,
  sections: Array<ApiSection>,
  uuid: ?string
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
  let questionDependency;
  if (
    question.questionDependency &&
    question.questionDependency.questionDependencyChoices.size > 0
  ) {
    questionDependency = encodeQuestionDependency(question.questionDependency);
  } else {
    questionDependency = undefined;
  }

  return {
    id: question.persisted ? question.id : undefined,
    key: question.key,
    label: question.label,
    content: question.content,
    required: question.required,
    placeholder: question.placeholder,
    question_type: question.type,
    validate_as: question.validateAs,
    order: question.order,
    question_dependency: questionDependency,
    _destroy: question.deleted,
    choices: question.choices.map(encodeChoice).toArray(),
    uuid: question.persisted ? undefined : question.id
  };
}

function encodeQuestionDependency(
  questionDependency: QuestionDependencyType
): ApiQuestionDependency {
  return {
    id: questionDependency.persisted ? questionDependency.id : undefined,
    and: questionDependency.and,
    display: questionDependency.display,
    question_dependency_choices: encodeQuestionDependencyChoices(
      questionDependency.questionDependencyChoices
    ),
    uuid: questionDependency.persisted ? undefined : questionDependency.id
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
    id: questionDependencyChoice.persisted
      ? questionDependencyChoice.id
      : undefined,
    choice_id: questionDependencyChoice.choiceId,
    _destroy: questionDependencyChoice.deleted,
    uuid: questionDependencyChoice.persisted
      ? undefined
      : questionDependencyChoice.id
  };
}

function encodeChoice(choice: ChoiceType): ApiChoice {
  return {
    id: choice.persisted ? choice.id : undefined,
    label: choice.label,
    _destroy: choice.deleted,
    metadata: choice.metadata.toJS(),
    maximum_chosen: choice.maximumChosen,
    order: choice.order,
    uuid: choice.persisted ? undefined : choice.id
  };
}

function encodeSection(section: QuestionType): ApiSection {
  return {
    id: section.persisted ? section.id : undefined,
    name: section.name,
    order: section.order,
    questions: section.questions.map(encodeQuestion).toArray(),
    content: section.content,
    _destroy: section.deleted,
    uuid: section.persisted ? undefined : section.id
  };
}

function encodeForm(form: FormType): ApiForm {
  return {
    id: form.persisted ? form.id : undefined,
    application_id: form.applicationId,
    completion_content: form.completionContent,
    sections: form.sections.toArray().map(encodeSection),
    uuid: form.persisted ? undefined : form.id
  };
}

export { encodeForm, encodeFormSubmission };
