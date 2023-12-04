import React from 'react';

const EmployerProfile = ({ employer }) => {
  if (!employer) {
    return <h3>No Employer Data</h3>;
  }

  return (
    <div>
      <h2>{employer.name}</h2>
      <p>
        <strong>Website:</strong> {employer.website || 'N/A'}
      </p>
      <p>
        <strong>Description:</strong> {employer.description || 'No description available.'}
      </p>

      {employer.jobPostings && employer.jobPostings.length > 0 && (
        <div>
          <h3>Job Postings</h3>
          <ul>
            {employer.jobPostings.map((jobPostingId) => (
              <li key={jobPostingId}>
                <a href={`/jobs/${jobPostingId}`}>Job Posting ID: {jobPostingId}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployerProfile;
