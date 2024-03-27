import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_JOBS_PAG } from '../utils/queries';
import { useSearchParams } from 'react-router-dom';
import JobList from '../components/JobList';
import PageNav from '../components/PageNav';

export default function HomePage() {
    const [qString, setQString] = useSearchParams();

    let currPage = parseInt(qString.get('page')) || 0;
    const pageLim = 5;
    const { loading, data, error } = useQuery(QUERY_JOBS_PAG, { variables: { page: currPage, pageLimit: pageLim } });


    const jobs = data?.jobsPages.jobs || [];
    const count = Math.ceil(parseInt(data?.jobsPages.count) / pageLim);
    return loading ? (<div>loading</div>) : (
        <div className='d-flex flex-row justify-content-center'>
            <section id='jobs' className='col-12 col-md-9 p-3'>
                <h3>Posted Jobs</h3>
                {jobs.length ? (
                    <>
                        <JobList
                            jobPostings={jobs}
                            showTitle={false}
                            showEmployer={true}
                        />
                        <PageNav
                            count={count}
                            currPage={currPage}
                            setter={setQString}
                        />
                    </>
                ) : (
                    <p>No one has posted any jobs.</p>
                )}
            </section>

        </div >
    );
}