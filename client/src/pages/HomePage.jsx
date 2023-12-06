import Auth from '../utils/auth';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_JOBS_PAG } from '../utils/queries';
import { useSearchParams } from 'react-router-dom';
import JobList from '../components/JobListPaginated';

export default function HomePage() {

    // const { loading, data, error } = useQuery(QUERY_JOBS);
    const [qString, setQString] = useSearchParams();

    let currPage = parseInt(qString.get('page')) || 0;
    const pageLim = 5;
    const { loading, data, error } = useQuery(QUERY_JOBS_PAG, { variables: { page: currPage, pageLimit: pageLim } });


    const jobs = data?.jobsPages.jobs || [];
    const count = Math.ceil(parseInt(data?.jobsPages.count) / pageLim);
    console.log(count);
    return loading ? (<div>loading</div>) : (
        <div className='d-flex flex-row'>
            <section id='jobs' className='col-9 p-3'>
                <h3>Posted Jobs</h3>
                {jobs.length ? (
                    <>
                        <JobList
                            jobPostings={jobs}
                            showTitle={false}
                            showEmployer={true}
                        />
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><button class="page-link" onClick={() => { setQString({ page: 0 }); }}>First</button></li>
                                <li class="page-item"><button class="page-link" onClick={() => { setQString({ page: currPage > 1 ? currPage - 1 : 0 }); }}>Previous</button></li>
                                <li class="page-item"><button class="page-link active">{currPage + 1}</button></li>
                                <li class="page-item"><button class="page-link" onClick={() => { setQString({ page: currPage + 1 }); }}>Next</button></li>
                                <li class="page-item"><button class="page-link" onClick={() => { setQString({ page: count - 1 }); }}>Last</button></li>
                            </ul>
                        </nav>
                    </>
                ) : (
                    <p>No one has posted any jobs.</p>
                )}
            </section>

        </div >
    );
}