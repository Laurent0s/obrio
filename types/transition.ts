export interface Transition {
  from: string;
  to: string;
  conditions?: Condition[];
}

export interface Condition {
  questionId: string;
  operator: Operator;
  value: unknown;
}

export enum Operator {
  EQUALS = "EQUALS",
}
