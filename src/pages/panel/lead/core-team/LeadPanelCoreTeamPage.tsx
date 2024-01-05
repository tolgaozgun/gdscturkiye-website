import { Button, Divider, Flex, Text } from '@mantine/core';
import { IconGridDots, IconList } from '@tabler/icons-react';
import useAxiosSecure from '../../../../hooks/auth/useAxiosSecure';
import { useState } from 'react';
import useGetCoreTeamByCurrentLead from '../../../../hooks/core-team/useGetCoreTeamByCurrentLead';
import { CoreTeam } from '../../../../types/TeamTypes';
import { CoreTeamMemberModel, LeadModel } from '../../../../types';
import { PageContainer } from '../../../../components/PageContainer';
import LeadGrid from '../../../../components/grid/LeadGrid';
import CoreTeamMemberGrid from '../../../../components/grid/CoreTeamMemberGrid';
import CoreTeamMemberTable from '../../../../components/table/CoreTeamMemberTable';
import LeadTable from '../../../../components/table/LeadTable';



const LeadPanelCoreTeamPage = () => {
	const axiosSecure = useAxiosSecure();

	const [useGrid, setUseGrid] = useState<boolean>(true);

	const handleSelectGrid = () => {
		setUseGrid(true);
	}

	const handleSelectList = () => {
		setUseGrid(false);
	}

	let {
		data: coreTeamData,
		isLoading: coreTeamLoading,
	} = useGetCoreTeamByCurrentLead(axiosSecure);

	let coreTeam: CoreTeam = {} as CoreTeam;
	if (coreTeamData && coreTeamData?.data){
		coreTeam = coreTeamData?.data!
	}

	let members: CoreTeamMemberModel[] = coreTeam.coreTeamMembers;

	let lead: LeadModel[] = [coreTeam.lead];

	let content = <></>;
	
	if (useGrid) {
		content = (
		<Flex direction="column" p="xs" gap="md">
			<Text>Lead</Text>
			<LeadGrid data={lead} isLoading={coreTeamLoading} />
			<Divider />
			<Text>Core Team</Text>
			<CoreTeamMemberGrid data={members} isLoading={coreTeamLoading} />
		</Flex>
		);
	} else {
		content = (
			<Flex direction="column" pt="xs" pl="xs" gap="md">
				<Text>Lead</Text>
				<LeadTable data={lead} isLoading={coreTeamLoading} />
				<Divider />
				<Text>Core Team</Text>
				<CoreTeamMemberTable data={members} isLoading={coreTeamLoading} />
			</Flex>
		);
	}

	return (
		<PageContainer title="Core Team">
			<Button.Group defaultValue="grid">
				<Button disabled={useGrid} leftIcon={<IconGridDots size="1rem" />} value="grid" onClick={handleSelectGrid} variant="default">
					Grid
				</Button>
				<Button disabled={!useGrid} leftIcon={<IconList size="1rem" />} value="list" onClick={handleSelectList} variant="default">
					List
				</Button>
			</Button.Group>
				{content}
		</PageContainer>
	);
};

export default LeadPanelCoreTeamPage;
