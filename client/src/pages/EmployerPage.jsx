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
    return employerResult.loading || pagesRes.loading ? (<div>loading</div>) : (
        <div className='d-flex flex-md-row flex-column-reverse'>
            <section id='employerJobs' className='col-12 col-md-9 p-2'>
                <h3>Posted Jobs</h3>
                {jobs.length ? (
                    <>
                        <JobList
                            jobPostings={jobs}
                            title={`Jobs Posted by ${employer.name}`}
                            showTitle={true}
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
            <section id='employerInfo' className='col-12 col-md-3 p-2'>
                <div className="card">
                    <div class="card-header bg-prop-primary text-white">
                        <h3 className="card-title">{employer.name}</h3>
                    </div>
                    <div class="card-body">
                        <p>{employer.description}</p>
                        <Link to={employer.website}>Company Website</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}