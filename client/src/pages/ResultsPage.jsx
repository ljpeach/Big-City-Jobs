import React from 'react';
import JobList from '../JobList';

const ResultsPage = () => {
 
  const jobPostings = [
    // Sample job posting data
    {
      _id: '1',
      employer: 'Company A',
      postedDate: '2023-01-01',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      _id: '2',
      employer: 'Company B',
      postedDate: '2023-02-15',
      details: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
    // Add more job postings as needed
  ];

  return (
    <div className="results-page">
      <h2>Job Search Results</h2>
      <JobList
        jobPostings={jobPostings}
        title="Latest Job Postings"
        showTitle={true}
        showEmployer={true}
      />
    </div>
  );
};

export default ResultsPage;
