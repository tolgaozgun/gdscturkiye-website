import { Question } from '../../../types/QuestionTypes';
import QuestionList from '../../../components/QuestionList';
import useAxiosSecure from '../../../hooks/auth/useAxiosSecure';
import useGetAllQuestions from '../../../hooks/question/useGetAllQuestions';
import { IconExclamationMark } from '@tabler/icons-react';
import { Alert, Center } from '@mantine/core';
import LoadingPage from '../../LoadingPage';

const LeadPanelQuestionListPage = () => {
    const axiosSecure = useAxiosSecure();
    const { 
		data: questionsData,
		isLoading: questionsLoading,
		error: error 
	} = useGetAllQuestions(axiosSecure);

	

	let questions: Question[] = []

	let attendanceExists = false;

	if (questionsData && questionsData?.data && questionsData!.data!.length > 0){
		questions = questionsData?.data!
		attendanceExists = true;
	}

	if (questionsLoading || !questionsData) { 
		return <LoadingPage />
	}
		

    let content;
    if (error) {
        content = (
            <Alert mt="md" variant='outline' color="red" title="Error" icon={<IconExclamationMark />}>
                {error.message}
            </Alert>
        );
    } else if (questions.length > 0) {
        content = <QuestionList questions={questions} />;
    } else {
        content = <Center mt="md">No questions found.</Center>;
    }

    return (
        <div>
            {content}
        </div>
    );
};

export default LeadPanelQuestionListPage;
