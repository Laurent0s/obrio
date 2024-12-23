import {
  fetchAllSurveys,
  fetchSurvey,
} from "@/features/surveys/engine/services/fetching.service";
import { QuestionView } from "@/features/surveys/question-screens";
import { Navigation } from "@/features/navigation";
import classes from "@/styles/rootLayout.module.scss";
import { ShowButton } from "@/app/api/surveys/[surveyId]/questions/[questionId]/navigation/nav";

export async function generateStaticParams() {
  const surveys = await fetchAllSurveys();

  const params = [];

  for (const survey of surveys) {
    for (const question of survey.questions) {
      params.push({
        surveyId: survey.id,
        questionId: question.id,
      });
    }
  }

  return params;
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ surveyId: string; questionId: string }>;
}) {
  const { surveyId, questionId } = await params;

  const { questions } = await fetchSurvey(surveyId);
  const question = questions.find(({ id }) => id === questionId);

  const showBtn = await ShowButton(questionId);
  if (!question) {
    throw new Error(`Question with id ${questionId} is not found`);
  }

  return (
    <>
      <header>
        <Navigation
          className={classes["root-layout__navigation"]}
          showBtn={showBtn}
        />
      </header>
      <main className={classes["root-layout__main"]}>
        <QuestionView surveyId={surveyId} question={question} />
      </main>
    </>
  );
}
