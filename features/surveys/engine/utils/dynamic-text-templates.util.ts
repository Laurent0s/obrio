import { Answers } from "@/types/answers";

export enum DynamicTextTemplate {
  ANSWER = "ANSWER",
  ANSWER_CONDITIONAL_TEXT = "ANSWER_CONDITIONAL_TEXT",
}

const dynamicTextTemplatePatterns: Record<DynamicTextTemplate, RegExp> =
  Object.freeze({
    [DynamicTextTemplate.ANSWER]: /\{answers\.([^\s]*?)}/g,
    [DynamicTextTemplate.ANSWER_CONDITIONAL_TEXT]:
      /\{answers\.([^\s]*?)\s&\s(.*?)}/g,
  });

export const makeAnswerTemplate = (key: string) => `{answers.${key}}`;

export const makeAnswerConditionalTextTemplate = (key: string, text: string) =>
  `{answer.${key} & ${text}}`;

const getAnswerTemplates = (text: string) =>
  [
    ...text.matchAll(dynamicTextTemplatePatterns[DynamicTextTemplate.ANSWER]),
  ].map((match) => ({
    property: match[1],
    fullMatch: match[0],
  }));

const getAnswerConditionalTextTemplates = (text: string) =>
  [
    ...text.matchAll(
      dynamicTextTemplatePatterns[DynamicTextTemplate.ANSWER_CONDITIONAL_TEXT],
    ),
  ].map((match) => ({
    property: match[1],
    conditionText: match[2],
    fullMatch: match[0],
  }));

const replaceAnswerTemplates = (text: string, answers: Answers) => {
  const templates = getAnswerTemplates(text);

  for (const template of templates) {
    const value = answers[template.property]?.label ?? "";
    text = text.replace(template.fullMatch, value);
  }

  return text;
};

const replaceAnswerConditionalTextTemplates = (
  text: string,
  answers: Answers,
) => {
  const templates = getAnswerConditionalTextTemplates(text);

  for (const template of templates) {
    const value = answers[template.property]?.value
      ? template.conditionText
      : "";
    text = text.replace(template.fullMatch, value);
  }

  return text;
};

const enrichText = (text: string, answers: Answers) => {
  text = replaceAnswerTemplates(text, answers);
  text = replaceAnswerConditionalTextTemplates(text, answers);

  return text;
};

export const enrichDeep = (value: unknown, answers: Answers): unknown => {
  if (typeof value === "string") {
    return enrichText(value, answers);
  }

  if (typeof value !== "object" || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => enrichDeep(item, answers));
  }

  const enrichedObject: Record<string, unknown> = {};

  for (const key in value) {
    if (!value.hasOwnProperty(key)) {
      continue;
    }

    enrichedObject[key] = enrichDeep(
      (value as Record<string, unknown>)[key],
      answers,
    );
  }

  return enrichedObject;
};
