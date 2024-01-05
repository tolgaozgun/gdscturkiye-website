import { Avatar, Badge, Card, Group, Space, Text } from '@mantine/core';
import { Question } from '../../types/QuestionTypes';
import { MouseEventHandler } from 'react';

interface QuestionCardProps {
  question: Question;
  clickAction?: MouseEventHandler<HTMLDivElement>;
}

const QuestionCard = ({ question, clickAction }: QuestionCardProps) => {


  return (
    <Card key={question.questionId} shadow="sm" p="lg" radius="md" withBorder onClick={clickAction}>
      <Group position="apart">
        <Group>
          <Avatar src={question.askedBy.profileImage} alt={question.askedBy.name} />
          <div>
            <Text weight={500}>{question.askedBy.name + " " + question.askedBy.surname}</Text>
            <Text size="sm" color="dimmed">{question.askedDate.getTime()}</Text>
          </div>
        </Group>
        <Badge color="pink" variant="light">
          {question.category.name}
        </Badge>
      </Group>

      <Text weight={700} mt="md">
        {question.title}
      </Text>
      <Text size="sm" mt="sm">
        {question.question}
      </Text>

      <Space h="md" />
      <Text size="sm" color="dimmed">Replies: {question.replies.length}</Text>
    </Card>
  );
}

export default QuestionCard