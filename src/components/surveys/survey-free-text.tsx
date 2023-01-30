import {
  CheckboxVisibility,
  DetailsList,
  IColumn,
  IGroup,
  Stack,
} from "@fluentui/react";
import { FunctionComponent } from "react";
import { SurveyResult } from "../../types/survey";

type SurveyFreeTextProps = {
  data: SurveyResult;
};

export const SurveyFreeText: FunctionComponent<SurveyFreeTextProps> = ({
  data,
}) => {
  const textQuestions = data.questions.filter(
    (question) => question.type ===  "text"  //   || "number"  This line is commented because I didnt know If add or not the responses  that  are type number, because It will show numbers as a response in the UI . and the exercise says "display  the  free response TEXT" 
  );
  const items = textQuestions.map((question) => question.responses).flat(1);
  let previousEnd = 0;
  const groups: IGroup[] = textQuestions.map((question, i) => {
    const group: IGroup = {
      key: i.toString(),
      name: question.question_text,
      startIndex: previousEnd,
      count: question.responses.length,
    };
    previousEnd += question.responses.length;
    return group;
  });
  const _onRenderColumn = (item?: any) => { 
    return <div data-is-focusable={true}>{item}</div>;
  };
  return (
    <Stack data-testid="FreeTextTable">
      <DetailsList
        checkboxVisibility={CheckboxVisibility.hidden}
        items={items}
        groups={groups}
        columns={[{ key: "Free text", name: "Text answers", minWidth: 200 }]}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        checkButtonAriaLabel="select row"
        checkButtonGroupAriaLabel="select section"
        groupProps={{
          isAllGroupsCollapsed: true,
          showEmptyGroups: true,
        }}
        onRenderItemColumn={_onRenderColumn}
        compact={true}
      />
    </Stack>
  );
};
