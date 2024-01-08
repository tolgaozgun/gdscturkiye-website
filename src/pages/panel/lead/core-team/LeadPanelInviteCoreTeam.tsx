
import { Container } from '@mantine/core';
import InviteCoreTeamForm from '../../../../components/forms/panel/invitation/InviteCoreTeamForm';
import { PageContainer } from '../../../../components/PageContainer';

const LeadPanelInviteCoreTeam = () => {
	return (
		<PageContainer title="Invite to Core Team">
			<Container size="sm">
				<InviteCoreTeamForm />
			</Container>
		</PageContainer>
	);
};

export default LeadPanelInviteCoreTeam;
