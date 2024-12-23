type ValueType = unknown;

export interface Answer {
  label: string;
  value: ValueType;
}

export type Answers = Record<string, Answer>;
export type WeakAnswers = Record<string, ValueType>;

export interface Result {
  questionId: string;
  questionText: string;
  answerText: string;
}
