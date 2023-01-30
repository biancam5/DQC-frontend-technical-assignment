export type SurveyResult = {
  questions: Question[];
  survey_title: string;
  created_at: string;
};
type Question = {
  question_text: string;
  type: "number" | "text";
  responses: (number | string)[]; 
};
 