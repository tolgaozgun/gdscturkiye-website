import { Stack } from '@mantine/core';
import { Question } from '../types/QuestionTypes';
import QuestionCard from './cards/QuestionCard';

interface QuestionListProps {
    questions: Question[];
}

const QuestionList = ({questions}: QuestionListProps) => {
  return (
    <Stack>
      {questions.map((question: Question) => (
        <QuestionCard question={question} />
      ))}
    </Stack>
  );
};

export default QuestionList;
