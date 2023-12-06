import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import JobList from '../components/JobList';

export default function ProfilePage() {
	const { loading, data, error } = useQuery(QUERY_USER);

	const jobs = data?.user.savedJobs;

	return loading ? (<div>loading</div>) : (
		<div className='d-flex flex-row'>
			<section id='jobs' className='col-12 col-md-9 p-2 mx-auto'>
				{jobs.length ? (
					<JobList
						jobPostings={jobs}
						title="Your Saved Jobs"
						showTitle={true}
						showEmployer={true}
					/>
				) : (
					<h3 className="text-center">No one has posted any jobs.</h3>
				)}
			</section>
		</div >
	);
}