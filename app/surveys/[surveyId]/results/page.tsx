"use client";

import { useEffect, useState, use } from "react";
import { Result } from "@/types/answers";
import { useAppSelector } from "@/store/store";
import { selectCurrentSurveyAnswers } from "@/store/slices/selectors";
import { Loader, Title } from "@/components";
import { fetchProcessedResults } from "@/features/surveys/results-processing/services/fetching.service";
import { ResultsTable } from "@/features/surveys/results-processing/components";

import classes from "./page.module.scss";

export default function ResultsPage({
  params,
}: {
  params: Promise<{ surveyId: string }>;
}) {
  const [results, setResults] = useState<Result[] | null>(null);

  const { surveyId } = use(params);
  const answers = useAppSelector(selectCurrentSurveyAnswers);

  useEffect(() => {
    if (!answers) {
      throw new Error("answers should be defined");
    }

    const fetchResults = async () => {
      const { data } = await fetchProcessedResults(surveyId, answers);
      setResults(data);
    };

    fetchResults();
  }, [surveyId, answers]);

  if (!results) {
    return <Loader />;
  }

  return (
    <section className={classes["complete-page"]}>
      <Title level={1} className={classes["complete-page__title"]}>
        Congratulations! Your answers:
      </Title>
      <ResultsTable data={results} />
    </section>
  );
}
