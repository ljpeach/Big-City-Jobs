import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EMPLOYER } from '../utils/queries';

export default function EmployerPage() {
    const employerId = useParams(employerId);
    const { loading, data } = useQuery(QUERY_EMPLOYER, { variables: { employerId } });
    console.log(data);
    const employer = data.employer;
    return (
        <div>
            <section id='employerInfo'>
                <h3>{employer.name}</h3>

            </section>
        </div>
    );
}