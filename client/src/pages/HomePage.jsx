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
                <h3 className="text-center">Posted Jobs</h3>
                {jobs.length ? (
                    <JobList
                        jobPostings={jobs}
                        showTitle={false}
                        showEmployer={true}
                    />
                ) : (
                    <p>No one has posted any jobs.</p>
                )}
            </section>
            
        </div >
    );
}