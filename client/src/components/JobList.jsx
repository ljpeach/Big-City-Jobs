import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FAVORITE_JOB } from "../utils/mutations";
import Auth from '../utils/auth';

const JobList = ({
  jobPostings,
  title,
  showTitle = true,
  showEmployer = true,
}) => {
  if (!jobPostings.length) {
    return <h3>No Jobs Yet</h3>;
  }

  const [favJob, res] = useMutation(FAVORITE_JOB);

  console.log(jobPostings);
  console.log(res);

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {jobPostings &&
        jobPostings.map((job) => (
          <div key={job._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showEmployer ? (
                <Link
                  className="text-light"
                  to={`/employer/${job.employer._id}`}
                >
                  {job.employer.name}
                </Link>
              ) : (
                <></>
              )}
              <span style={{ fontSize: '1rem' }}>
                This job was posted on {new Date(parseInt(jobPostings[0].postedDate)).toString()}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{job.details}</p>
            </div>
            <div>
              <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/jobs/${job._id}`}
              >
                View details and apply for this job.
              </Link>
              {Auth.loggedIn() && <button onClick={() => { favJob({ variables: { jobId: job._id } }) }}>Add job to favorites</button>}
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobList;
