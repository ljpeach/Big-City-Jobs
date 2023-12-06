import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EMPLOYER, QUERY_EMPLOYER_JOBS } from '../utils/queries';
import JobList from '../components/JobList';

export default function EmployerPage() {
    const { employerId } = useParams();
    const employerResult = useQuery(QUERY_EMPLOYER, { variables: { employerId } });
    const jobResult = useQuery(QUERY_EMPLOYER_JOBS, { variables: { employerId } });
    const employer = employerResult.data?.employer;
    const jobs = jobResult.data?.employerJobs;
    return employerResult.loading || jobResult.loading ? (<div>loading</div>) : (
        <div className='d-flex flex-md-row flex-column-reverse'>
            <section id='employerJobs' className='col-12 col-md-9 p-2'>
                {jobs.length ? (
                    <JobList
                        jobPostings={jobs}
                        title={`Jobs Posted by ${employer.name}`}
                        showTitle={true}
                        showEmployer={false}
                    />
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