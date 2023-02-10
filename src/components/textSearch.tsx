import React, { useState } from 'react';
import { TextField, Stack, DefaultButton } from '@fluentui/react';

//Feature:  only text-responses search bar 

interface Question {
  question_text: string;
  type: string;
  responses: (number | string)[];
}

interface Props {
  questions: Question[];
}

const TextSearch: React.FC<Props> = ({ questions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = () => {
    const textResponses: string[] = [];
    questions.forEach(question => {
      if (question.type === 'text') {
        question.responses.forEach((response: any) => {
          textResponses.push(response);
        });
      }
    });

    const results = textResponses.filter(response =>
      response.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <Stack styles={{ root: { width: '300px' } }}>
      <TextField
        label="Search Text Responses"
        value={searchTerm}
        onChange={(event, newValue) => setSearchTerm(newValue as string)}
      />
      <DefaultButton text="Search" onClick={handleSearch} styles={{
      root: { height: '30px', fontSize: '12px', backgroundColor: 'pink' },
    }}/>
      {searchResults.map((result, index) => (
        <p key={index}>{result}</p>
      ))}
    </Stack>
  );
};

export default TextSearch;
