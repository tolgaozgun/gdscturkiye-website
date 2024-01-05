import { Alert, Button, Center, Divider } from '@mantine/core';
import { IconExclamationMark, IconGridDots, IconList } from '@tabler/icons-react';
import LeadTable from '../../../components/table/LeadTable';
import useAxiosSecure from '../../../hooks/auth/useAxiosSecure';
import FacilitatorTable from '../../../components/table/FacilitatorTable';
import { useState } from 'react';
import LeadGrid from '../../../components/grid/LeadGrid';
import FacilitatorGrid from '../../../components/grid/FacilitatorGrid';
import { FacilitatorModel } from '../../../types';
import { PageContainer } from '../../../components/PageContainer';
import { BuddyTeam } from '../../../types/BuddyTeamTypes';
import useGetAllBuddyTeams from '../../../hooks/buddy-team/useGetAllBuddyTeams';
import { useTranslation } from 'react-i18next';



const LeadPanelAllBuddyTeamsPage = () => {
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
	} = useGetAllBuddyTeams(axiosSecure);

	let buddyTeams: BuddyTeam[] = [] as BuddyTeam[];
	if (buddyTeamData && buddyTeamData?.data){
		buddyTeams = buddyTeamData?.data!
		buddyTeamExists = true;
	}

	// let leads: LeadModel[] = buddyTeams.leads;

	// let facilitator: FacilitatorModel[] = [buddyTeams.facilitator];

	let content = 
	<Alert mt="md" variant='outline' color="red" title={t("pages:panel:lead:buddyTeams:errorTitle")} icon={<IconExclamationMark/>}>
		{t("pages:panel:lead:buddyTeams:noBuddyTeamFound")}
	</Alert>;

	if (buddyTeamExists) {
		if (useGrid) {
			<Center mt="md">
				{buddyTeams.map((buddyTeam) => {
					let facilitators: FacilitatorModel[] = [buddyTeam.facilitator];
					return (
						<>
							<FacilitatorGrid data={facilitators} isLoading={buddyTeamLoading} />
							<LeadGrid data={buddyTeam.leads} isLoading={buddyTeamLoading} />
							<Divider />
						</>
					)
				})}
			</Center>;
		} else {
			content = (
				<Center mt="md">
				{buddyTeams.map((buddyTeam) => {
					let facilitators: FacilitatorModel[] = [buddyTeam.facilitator];
					return (
						<>
							<FacilitatorTable data={facilitators} isLoading={buddyTeamLoading} />
							<LeadTable data={buddyTeam.leads} isLoading={buddyTeamLoading} />
							<Divider />
						</>
					)
				})}
				</Center>
			);
		}
	}


	return (
		<PageContainer 
			title={t("pages:panel:lead:buddyTeams:buddyTeamTitle")}>
			{ buddyTeamExists &&
			<Button.Group defaultValue="grid">
				<Button disabled={useGrid} leftIcon={<IconGridDots size="1rem" />} value="grid" onClick={handleSelectGrid} variant="default">
					{t("pages:panel:lead:buddyTeams:gridButton")}
				</Button>
				<Button disabled={!useGrid} leftIcon={<IconList size="1rem" />} value="list" onClick={handleSelectList} variant="default">
					{t("pages:panel:lead:buddyTeams:listButton")}
				</Button>
			</Button.Group>
			}
			{content}
		</PageContainer>
	);
};

export default LeadPanelAllBuddyTeamsPage;
