import { Alert, Center } from '@mantine/core';
import useAxiosSecure from '../../../hooks/auth/useAxiosSecure';
import { PageContainer } from '../../../components/PageContainer';
import useGetCurrentLeadAttendance from '../../../hooks/attendance/useGetCurrentLeadAttendance';
import LeadAttendanceTable from '../../../components/table/LeadAttendanceTable';
import LoadingPage from '../../LoadingPage';
import { LeadAttendance } from '../../../types/AttendaceTypes';
import { IconExclamationMark } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';


const LeadPanelAttendancePage = () => {
	const { t } = useTranslation();
	
	const axiosSecure = useAxiosSecure();

	let {
		data: attendanceData,
		isLoading: attendanceLoading,
	} = useGetCurrentLeadAttendance(axiosSecure);

	let attendance: LeadAttendance[] = []

	let attendanceExists = false;

	if (attendanceData && attendanceData?.data && attendanceData!.data!.length > 0){
		attendance = attendanceData?.data!
		attendanceExists = true;
	}

	if (attendanceLoading || !attendanceData) { 
		return <LoadingPage />
	}

	let content = (
	<Alert variant='outline' color="red" title={t("pages:panel:lead:attendance:error")} icon={<IconExclamationMark/>}>
		{t("pages:panel:lead:attendance:attendanceInformationNotFound")}
	</Alert>);

	if (attendanceExists) {
		content = (
			<Center mt="md">
				<LeadAttendanceTable data={attendance} isLoading={attendanceLoading} />
			</Center>
		)
	}
	

	return (
		<PageContainer
			title={t("pages:panel:lead:attendance:attendanceListTitle")}>
			{content}
		</PageContainer>
	);
};

export default LeadPanelAttendancePage;
