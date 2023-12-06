import React from 'react';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FAVORITE_JOB } from "../utils/mutations";
import Auth from '../utils/auth';
import dayjs from 'dayjs';

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
            <div className="card-header bg-primary text-light p-2 m-0 d-flex justify-content-between">
              <div className=''>
                <h4>
                  {job.name}
                </h4>
                <div style={{ fontSize: '1rem' }}>
                  This job was posted on {dayjs(new Date(parseInt(jobPostings[0].postedDate))).format('DD/MM/YYYY [at] h:mm A')}
                  {showEmployer ? (<span> by <span>
                    <Link
                      className="text-light"
                      to={`/employer/${job.employer._id}`}
                    >
                      {job.employer.name}
                    </Link>
                  </span>
                  </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className=''>
                <p>Located in {job.location.name}</p>
              </div>
            </div>
            <div className="card-body bg-light p-2">
              <p>{job.details}</p>
            </div>
            <div className='d-flex justify-content-between'>
              <div id='extra-data' className='d-flex flex-row align-item-center'>
                {job.available ?
                  (<p className='mb-0 mx-1 align-self-center text-success'>Available</p>) :
                  (<p className='mb-0 mx-1 align-self-center text-danger'>No Longer Available</p>)
                }
                <p className='mb-0 mx-1 align-self-center'>Pay Rate: {job.pay}</p>
              </div>
              <div id='links-and-actions'>
                <Link
                  className="btn btn-primary btn-block btn-squared m-2"
                  to={`/jobs/${job._id}`}
                >
                  View details and apply for this job.
                </Link>
                {Auth.loggedIn() && <button className="btn btn-primary btn-block btn-squared m-2" onClick={() => { favJob({ variables: { jobId: job._id } }) }}>Add job to favorites</button>}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobList;
