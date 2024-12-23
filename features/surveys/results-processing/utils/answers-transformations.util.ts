import { Answers, WeakAnswers } from "@/types/answers";

export const getWeakAnswers = (answers: Answers): WeakAnswers =>
  Object.fromEntries(
    Object.entries(answers).map(([key, { value }]) => [key, value]),
  );
