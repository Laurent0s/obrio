export class SurveyProcessingError extends Error {
  code: number;
  originalError?: unknown;

  constructor({
    code,
    message,
    originalError,
  }: {
    code: number;
    message: string;
    originalError?: unknown;
  }) {
    super(message);
    this.code = code;
    this.originalError = originalError;

    Object.setPrototypeOf(this, SurveyProcessingError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SurveyProcessingError);
    }
  }
}
