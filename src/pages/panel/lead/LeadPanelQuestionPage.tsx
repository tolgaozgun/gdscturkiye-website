import React, { useState } from 'react';
import { Avatar, Card, Text, Group, Button, Textarea, Select, Box, ActionIcon } from '@mantine/core';

import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { Question } from '../../../types/QuestionTypes';

// Sample data for a single question
const questionData = {
  id: 1,
  author: { name: 'Jane Doe', image: 'path_to_author_image' },
  postedDate: '2023-01-05',
  title: 'What is the best way to learn React?',
  description: 'Looking for resources and strategies to effectively learn React.',
  replies: [
    {
      id: 1,
      author: { name: 'John Smith', image: 'path_to_reply_author_image' },
      content: 'I found interactive tutorials to be the most effective.',
      postedDate: '2023-01-06',
      votes: 10,
    },
    {
      id: 2,
      author: { name: 'John Smith', image: 'path_to_reply_author_image' },
      content: 'I found interactive tutorials to be the most effective.',
      postedDate: '2023-01-03',
      votes: 9,
    },
    {
      id: 3,
      author: { name: 'John Smith', image: 'path_to_reply_author_image' },
      content: 'I found interactive tutorials to be the most effective.',
      postedDate: '2023-01-02',
      votes: 14,
    },
    // ... more replies
  ],
};

const LeadPanelQuestionPage = (question: Question) => {
    
  const [replies, setReplies] = useState(questionData.replies);
  const [newReply, setNewReply] = useState('');
  const [sortMethod, setSortMethod] = useState('date'); // 'date' or 'vote'

  const handleVote = (replyId: number, vote: number) => {
    // Add logic to update the vote count for the reply
    // For now, just updating the state
    const updatedReplies = replies.map((reply) => {
      if (reply.id === replyId) {
        return { ...reply, votes: reply.votes + vote };
      }
      return reply;
    });
    setReplies(updatedReplies);
  };

  const postReply = () => {
    // Add logic to post the reply
    // For now, just adding a dummy reply to the state
    const newReplyData = {
      id: replies.length + 1,
      author: { name: 'New User', image: 'path_to_new_user_image' },
      content: newReply,
      postedDate: new Date().toISOString().slice(0, 10),
      votes: 0,
    };
    setReplies([...replies, newReplyData]);
    setNewReply('');
  };

  const sortedReplies = [...replies].sort((a, b) => {
    if (sortMethod === 'vote') {
      return b.votes - a.votes;
    }
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });

  return (
    <div>
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group>
        <Avatar src={questionData.author.image} alt={questionData.author.name} />
        <div>
          <Text weight={700}>{questionData.title}</Text>
          <Text size="sm">{questionData.description}</Text>
          <Text size="xs" color="dimmed">Posted by {questionData.author.name} on {questionData.postedDate}</Text>
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
              <Avatar src={reply.author.image} alt={reply.author.name} />
              <div>
                <Text weight={500}>{reply.author.name}</Text>
                <Text size="sm" color="dimmed">Replied on {reply.postedDate}</Text>
                <Text mt="sm">{reply.content}</Text>
              </div>
            </Group>
            <Box>
              <ActionIcon onClick={() => handleVote(reply.id, 1)}>
                <IconArrowUp size={16} />
              </ActionIcon>
              <Text align="center" size="sm">{reply.votes}</Text>
              <ActionIcon onClick={() => handleVote(reply.id, -1)}>
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
