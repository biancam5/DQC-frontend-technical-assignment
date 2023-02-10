import { FontIcon, initializeIcons, Stack, Text } from "@fluentui/react";
import { SurveyFreeText } from "./components/surveys/survey-free-text";
import TextSearch from "./components/search/textSearch";
import data from "./data/survey_results.json";
import { SurveyResult } from "./types/survey";
initializeIcons();

function App() {
  const allNumberResponses = data.questions
    .filter((q) => q.type === "number")
    .map((q) => q.responses as number[])
    .flat(1);

  const total = allNumberResponses.reduce((sum: number, curr: number) => {
    return (sum += curr);
  }, 0);
  const happinessScore = Math.round(
    ((total / allNumberResponses.length - 1) / 4) * 100
  );
  const formattedDate = new Date(data.created_at);

  return (
    <Stack style={{ margin: 20  }}>
      <h1 style={{ display: "flex",alignItems:"center" }}>
        <FontIcon iconName="ClipboardList" style={{ marginRight: "5px",padding: 0 }}/>
         <p>{data.survey_title}</p> 
      </h1>
     
      <p>
        This survey was started on {formattedDate.getDate()}.
        {formattedDate.getMonth() + 1}.{formattedDate.getFullYear()} Overall,{" "}
        {data.questions.length} people participated in the survey.
      </p>

      <h1 data-testid="happinessScore">
        <FontIcon iconName="ChatBot" style={{ marginRight: "5px" }} />
        {happinessScore} / 100
      </h1>
      <Stack> 
        <TextSearch questions={ data.questions}/>
        <SurveyFreeText data={data as SurveyResult} />
       
      </Stack>
    </Stack>
  );
}

export default App;
