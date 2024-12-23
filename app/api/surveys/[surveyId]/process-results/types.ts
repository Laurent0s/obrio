import { Result } from "@/types/answers";

export interface SurveyProcessResultsResponse {
  message: string;
  data: Result[];
  status: "success" | "failed";
}
