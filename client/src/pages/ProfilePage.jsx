import React from 'react';

export default function ProfilePage() {
    return (
        <div>
            <h1>First and Last Name</h1>
            <p>User description</p>
            <p>Location: User location</p>
        </div>,
        
    <div>
    {showTitle && <h3>{title}</h3>}
    {jobPostings &&
      jobPostings.map((job) => (
        <div key={job._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {/* Add a check to see if the job is saved by the user */}
            {userSavedJobs.includes(job._id) && (
              <span className="text-warning">Saved by you!</span>
            )}
            {showEmployer ? (
              <Link className="text-light" to={`/employers/${job.employer}`}>
                {job.employer} <br />
                <span style={{ fontSize: '1rem' }}>
                  posted this job on {job.postedDate}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  This job was posted on {job.postedDate}
                </span>
              </>
            )}
          </h4>
          <div className="card-body bg-light p-2">
            <p>{job.details}</p>
          </div>
          <Link
            className="btn btn-primary btn-block btn-squared"
            to={`/jobs/${job._id}`}
          >
            View details and apply for this job.
          </Link>
        </div>
      ))}
  </div>
);
}