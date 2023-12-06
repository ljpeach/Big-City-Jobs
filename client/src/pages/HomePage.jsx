import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_JOBS } from '../utils/queries';
import JobList from '../components/JobList';

export default function HomePage() {
    const {loading, data, error} = useQuery(QUERY_JOBS);
    
    const jobs = data?.jobs;
    return loading ? (<div>loading</div>) : (
        <div className='d-flex flex-row'>
            <section id='jobs' className='col-12 col-md-9 p-2 mx-auto'>
                {jobs.length ? (
                    <JobList
                        jobPostings={jobs}
                        title="Posted Jobs"
                        showTitle={true}
                        showEmployer={true}
                    />
                ) : (
                    <p>No one has posted any jobs.</p>
                )}
            </section>
            
        </div >
    );
}