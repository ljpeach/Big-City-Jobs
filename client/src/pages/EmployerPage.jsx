import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EMPLOYER } from '../utils/queries';

export default function EmployerPage() {
    const { employerId } = useParams();
    const { loading, data, error } = useQuery(QUERY_EMPLOYER, { variables: { employerId } });
    console.log(loading, data, error);
    const employer = data?.employer;
    return loading ? (<div>loading</div>) : (
        <div>
            <section id='employerJobs'>
                <h3>Posted Jobs</h3>
                {employer.jobPostings.length ? (
                    <ul>
                        {employer.jobPostings.map((job) => (<li>
                            job.name
                        </li>
                        ))}
                    </ul>
                ) : (
                    <p>This employer has not posted any jobs.</p>
                )}
            </section>
            <section id='employerInfo'>
                <h3>{employer.name}</h3>
            </section>
        </div>
    );
}