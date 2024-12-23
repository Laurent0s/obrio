import path from "path";
import { promises as fs } from "fs";
import { Survey } from "@/types/survey";
import { SurveyProcessingError } from "../survey-processing.error";

const dataDirectory = path.join(process.cwd(), "data", "surveys");

export const fetchSurvey = async (id: string): Promise<Survey> => {
  const filePath = path.join(dataDirectory, `${id}.json`);

  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (e) {
    throw new SurveyProcessingError({
      code: 404,
      message: "Cannot load survey data",
      originalError: e,
    });
  }
};

export const fetchAllSurveys = async (): Promise<Survey[]> => {
  try {
    const files = await fs.readdir(dataDirectory);

    const surveysPromises = files.map(async (file) => {
      const surveyId = path.basename(file, path.extname(file));
      return await fetchSurvey(surveyId);
    });

    return await Promise.all(surveysPromises);
  } catch (e) {
    throw new SurveyProcessingError({
      code: 500,
      message: "Cannot scan survey data directory or load surveys",
      originalError: e,
    });
  }
};
