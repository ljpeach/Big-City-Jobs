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
    console.log(employer);
    return employerResult.loading || jobResult.loading ? (<div>loading</div>) : (
        <div className='d-flex flex-row'>
            <section id='employerJobs' className='col-9 p-3'>
                <h3>Posted Jobs</h3>
                {jobs.length ? (
                    <JobList
                        jobPostings={jobs}
                        showTitle={false}
                        showEmployer={false}
                    />
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