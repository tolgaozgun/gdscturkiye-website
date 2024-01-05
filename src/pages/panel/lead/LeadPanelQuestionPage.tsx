import React, { useState } from 'react';
import { Avatar, Card, Text, Group, Button, Textarea, Select, Box, ActionIcon } from '@mantine/core';

import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { Question, QuestionReply } from '../../../types/QuestionTypes';
import moment from 'moment';

const LeadPanelQuestionPage = (question: Question) => {
    
  const [replies, setReplies] = useState<Array<QuestionReply>>(question.replies);
  const [newReply, setNewReply] = useState('');
  const [sortMethod, setSortMethod] = useState('date'); // 'date' or 'vote'

  const handleVote = (replyId: number, vote: number) => {
    // Add logic to update the vote count for the reply
    // For now, just updating the state
    const updatedReplies = replies.map((reply: QuestionReply) => {
      if (reply.replyId === replyId) {
        return { ...reply, votes: reply.votes + vote };
      }
      return reply;
    });
    setReplies(updatedReplies);
  };

  const postReply = () => {
    // Add logic to post the reply
    // For now, just adding a dummy reply to the state
    // const newReplyData: QuestionReply = {
    //   id: replies.length + 1,
    //   author: { name: 'New User', image: 'path_to_new_user_image' },
    //   content: newReply,
    //   postedDate: new Date().toISOString().slice(0, 10),
    //   votes: 0,
    // };
    // setReplies([...replies, newReplyData]);
    // setNewReply('');
  };

  const sortedReplies = [...replies].sort((a, b) => {
    if (sortMethod === 'vote') {
      return b.votes - a.votes;
    }
    return new Date(b.answeredDate).getTime() - new Date(a.answeredDate).getTime();
  });

  return (
    <div>
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group>
        <Avatar src={question.askedBy.profileImage} alt={question.askedBy.name} />
        <div>
          <Text weight={700}>{question.title}</Text>
          <Text size="sm">{question.question}</Text>
          # Moment the date relatively not exact time, use ago
          <Text size="sm" color="dimmed">Posted by {question.askedBy.name} {question.askedBy.surname} {moment(question.askedDate).fromNow()}</Text>
        </div>
      </Group>
    </Card>

      <Select
        label="Sort replies by"
        placeholder="Choose sort method"
        value={sortMethod}
        onChange={setSortMethod}
        data={[
          { value: 'date', label: 'Date' },
          { value: 'vote', label: 'Votes' },
        ]}
        mt="md"
      />


    {sortedReplies.map((reply) => (
        <Card key={reply.id} shadow="sm" p="lg" radius="md" mt="md" withBorder>
          <Group position="apart">
            <Group>
              <Avatar src={reply.answeredBy.profileImage} alt={reply.answeredBy.name} />
              <div>
                <Text weight={500}>{reply.answeredBy.name} {reply.answeredBy.surname}</Text>
                <Text size="sm" color="dimmed">Replied on {moment(reply.answeredDate).fromNow()}</Text>
                <Text mt="sm">{reply.reply}</Text>
              </div>
            </Group>
            <Box>
              <ActionIcon onClick={() => handleVote(reply.replyId, 1)}>
                <IconArrowUp size={16} />
              </ActionIcon>
              <Text align="center" size="sm">{reply.votes}</Text>
              <ActionIcon onClick={() => handleVote(reply.replyId, -1)}>
                <IconArrowDown size={16} />
              </ActionIcon>
            </Box>
          </Group>
        </Card>
      ))}

      <Textarea
        placeholder="Write your reply..."
        value={newReply}
        onChange={(event) => setNewReply(event.currentTarget.value)}
        mt="md"
      />
      <Button onClick={postReply} mt="sm">Post Reply</Button>
    </div>
  );
};

export default LeadPanelQuestionPage;
