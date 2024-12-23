import { Transition } from "@/types/transition";

export enum FlowControlDirective {
  EXIT_POINT = "EXIT_POINT",
  RETURN_POINT = "CONDITIONAL_TEXT",
}

export const directives: Record<FlowControlDirective, string> = {
  [FlowControlDirective.EXIT_POINT]: "@exitpoint",
  [FlowControlDirective.RETURN_POINT]: "@returnpoint",
};

export const hasDirective = (
  directive: FlowControlDirective,
  route: string,
) => {
  return route.includes(directives[directive]);
};

export const makeExitPointDirective = (route: string) => {
  return `${directives[FlowControlDirective.EXIT_POINT]}:${route}`;
};

export const makeReturnPointDirective = (value: unknown) => {
  return `${directives[FlowControlDirective.RETURN_POINT]}:${JSON.stringify(value)}`;
};

export const extractExitPointDirectiveValue = (route: string) => {
  return route.split(":")[1];
};

export const extractReturnPointDirectiveValue = (route: string) => {
  return JSON.parse(route.split(":")[1]);
};

export const clearTransitionsFromDirectives = (transitions: Transition[]) => {
  const clearedTransitions = transitions.filter(
    ({ to }) => !hasDirective(FlowControlDirective.EXIT_POINT, to),
  );

  return clearedTransitions.map(({ conditions, ...transition }) => ({
    conditions: conditions?.map(({ value, ...condition }) => ({
      value:
        typeof value === "string" &&
        hasDirective(FlowControlDirective.RETURN_POINT, value)
          ? extractReturnPointDirectiveValue(value)
          : value,
      ...condition,
    })),
    ...transition,
  }));
};
