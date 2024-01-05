import { Alert, Button, Center } from '@mantine/core';
import { IconExclamationMark, IconGridDots, IconList } from '@tabler/icons-react';
import LeadTable from '../../../components/table/LeadTable';
import useAxiosSecure from '../../../hooks/auth/useAxiosSecure';
import FacilitatorTable from '../../../components/table/FacilitatorTable';
import { useState } from 'react';
import LeadGrid from '../../../components/grid/LeadGrid';
import FacilitatorGrid from '../../../components/grid/FacilitatorGrid';
import { FacilitatorModel, LeadModel } from '../../../types';
import { PageContainer } from '../../../components/PageContainer';
import useGetBuddyTeamByCurrentLead from '../../../hooks/buddy-team/useGetBuddyTeamByCurrentUser';
import { BuddyTeam } from '../../../types/BuddyTeamTypes';
import { useTranslation } from 'react-i18next';


const LeadPanelBuddyTeamPage = () => {

	const { t } = useTranslation();

	const axiosSecure = useAxiosSecure();

	const [useGrid, setUseGrid] = useState<boolean>(true);
	

	const handleSelectGrid = () => {
		setUseGrid(true);
	}

	const handleSelectList = () => {
		setUseGrid(false);
	}

	let buddyTeamExists = false;

	let {
		data: buddyTeamData,
		isLoading: buddyTeamLoading,
	} = useGetBuddyTeamByCurrentLead(axiosSecure);

	let buddyTeam: BuddyTeam = {} as BuddyTeam;
	if (buddyTeamData && buddyTeamData?.data){
		buddyTeam = buddyTeamData?.data!
		buddyTeamExists = true;
	}

	let leads: LeadModel[] = buddyTeam.leads;

	let facilitator: FacilitatorModel[] = [buddyTeam.facilitator];

	let content = 
	<Alert 
		variant='outline' 
		color="red" 
		title={t("pages:panel:lead:buddyTeam:errorAlertTitle")}
		icon={<IconExclamationMark/>}
	>
		{t("pages:panel:lead:buddyTeam:errorAlertMessage")}
	</Alert>;

	if (buddyTeamExists) {
		if (useGrid) {
			<Center mt="md">
				<FacilitatorGrid data={facilitator} isLoading={buddyTeamLoading} />
				<LeadGrid data={leads} isLoading={buddyTeamLoading} />
			</Center>;
		} else {
			content = (
				<Center mt="md">
					<FacilitatorTable data={facilitator} isLoading={buddyTeamLoading} />
					<LeadTable data={leads} isLoading={buddyTeamLoading} />
				</Center>
			);
		}
	}


	return (
		<PageContainer title={t("pages:panel:lead:buddyTeam:pageContainerTitle")}>
			{ buddyTeamExists &&
			<Button.Group defaultValue="grid">
				<Button disabled={useGrid} leftIcon={<IconGridDots size="1rem" />} value="grid" onClick={handleSelectGrid} variant="default">
					{t("pages:panel:lead:buddyTeam:buttonGridLabel")}
				</Button>
				<Button disabled={!useGrid} leftIcon={<IconList size="1rem" />} value="list" onClick={handleSelectList} variant="default">
					{t("pages:panel:lead:buddyTeam:buttonListLabel")}
				</Button>
			</Button.Group>
			}
			{content}
		</PageContainer>
	);
};

export default LeadPanelBuddyTeamPage;
