import React from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EMPLOYER, QUERY_EMPLOYER_JOBS, QUERY_EMPLOYER_JOBS_PAGES } from '../utils/queries';
import JobList from '../components/JobList';

export default function EmployerPage() {
    const { employerId } = useParams();
    const employerResult = useQuery(QUERY_EMPLOYER, { variables: { employerId } });
    // const jobResult = useQuery(QUERY_EMPLOYER_JOBS, { variables: { employerId } });

    const [qString, setQString] = useSearchParams();

    let currPage = parseInt(qString.get('page')) || 0;
    const pageLim = 5;
    const pagesRes = useQuery(QUERY_EMPLOYER_JOBS_PAGES, { variables: { employerId, page: currPage, pageLimit: pageLim } });

    const jobs = pagesRes.data?.employerJobsPages.jobs || [];
    const count = Math.ceil(parseInt(pagesRes.data?.employerJobsPages.count) / pageLim);

    const employer = employerResult.data?.employer;
    // const jobs = jobResult.data?.employerJobs;
    return employerResult.loading || pagesRes.loading ? (<div>loading</div>) : (
        <div className='d-flex flex-row'>
            <section id='employerJobs' className='col-9 p-3'>
                <h3>Posted Jobs</h3>
                {jobs.length ? (
                    <>
                        <JobList
                            jobPostings={jobs}
                            showTitle={false}
                            showEmployer={false}
                        />
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item"><button class="page-link" onClick={() => { setQString({ page: 0 }); }}>First</button></li>
                                <li class="page-item"><button class="page-link" onClick={() => { setQString({ page: currPage > 1 ? currPage - 1 : 0 }); }}>Previous</button></li>
                                <li class="page-item"><button class="page-link active">{currPage + 1}</button></li>
                                <li class="page-item"><button class="page-link" onClick={() => { setQString({ page: currPage < count - 1 ? currPage + 1 : count - 1 }); }}>Next</button></li>
                                <li class="page-item"><button class="page-link" onClick={() => { setQString({ page: count - 1 }); }}>Last</button></li>
                            </ul>
                        </nav>
                    </>
                ) : (
                    <p>This employer has not posted any jobs.</p>
                )}
            </section>
            <section id='employerInfo' className='col-3 p-3 border-start'>
                <h3>{employer.name}</h3>
                <Link to={employer.website}>Company Website</Link>
                <p>{employer.description}</p>
            </section>
        </div >
    );
}