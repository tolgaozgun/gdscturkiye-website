import { Center, SelectItem } from '@mantine/core';
import useGetUniversities from '../../../../hooks/university/useGetUniversities';
import LoadingPage from '../../../LoadingPage';
import { University } from '../../../../types/UniversityTypes';
import CreateLeadForm from '../../../../components/forms/auth/CreateLeadForm';

const CreateLeadPage = () => {

	const {
		data: allUniversities,
		isLoading: isUniversitiesLoading,
		// isError: isUniversitiesError,
	} = useGetUniversities();

	if (isUniversitiesLoading || !allUniversities) {
		return <LoadingPage />;
	}

	const universitiesList: Array<University> = allUniversities?.data!;
	const universityData: Array<SelectItem> = universitiesList!
		.map((university) => {
			return {
				value: String(university.universityId),
				label: university.name,
				description: university.city.name + ', ' + university.country.name,
			};
		});

	return (
		<Center miw={400}>
			<CreateLeadForm universityData={universityData} />
		</Center>
	);
};

export default CreateLeadPage;
