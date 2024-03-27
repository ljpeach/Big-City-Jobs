import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query currentUser {
  user {
    _id
    email
    firstName
    lastName
    savedJobs {
      _id
      name
      location {
        _id
        name
      }
      employer {
        _id
        name
        website
      }
      details
      available
      applyLink
      pay
      postedDate
    }
  }
}`;

export const QUERY_LOCATION = gql`
query selectLocation($locationId: ID!) {
  location(locationId: $locationId) {
    _id
    name
    jobPostings {
      _id
      name
    }
  }
}`;

export const QUERY_FAVS = gql`
query UserFaved {
  userFaved {
    _id
  }
}`;

export const QUERY_LOCATIONS = gql`
query allLocations{
  locations {
    _id
    name
    jobPostings {
      _id
      name
    }
  }
}`;

export const QUERY_JOB = gql`
query selectJob($jobId: ID!) {
  job(jobId: $jobId) {
    _id
    name
    location {
      _id
      name
    }
    employer {
      _id
      name
      website
    }
    details
    available
    applyLink
    pay
    postedDate
  }
}`;

export const QUERY_JOBS = gql`
query allJobs{
  jobs {
    _id
    name
    location {
      _id
      name
    }
    details
    available
    applyLink
    pay
    postedDate
    employer {
      _id
      name
      website
    }
  }
}`;

export const QUERY_JOBS_PAG = gql`
query JobsPages($page: Int, $pageLimit: Int) {
  jobsPages(page: $page, pageLimit: $pageLimit) {
    count
    jobs {
      _id
      applyLink
      available
      details
      employer {
        _id
        name
      }
      location {
        _id
        name
      }
      name
      pay
      postedDate
    }
  }
}`;

export const QUERY_EMPLOYER = gql`
query selectEmployer($employerId: ID!) {
  employer(employerId: $employerId) {
    _id
    description
    website
    name
    jobPostings {
      _id
      name
    }
  }
}`;

export const QUERY_EMPLOYERS = gql`
query allEmployers {
  employers {
    _id
    description
    website
    name
  }
}`;

export const QUERY_EMPLOYER_JOBS = gql`
query EmployerJobs($employerId: ID!) {
  employerJobs(employerId: $employerId) {
    _id
    name
    location {
      _id
      name
    }
    details
    available
    applyLink
    pay
    postedDate
    employer {
      _id
      name
      website
    }
  }
}`

export const QUERY_EMPLOYER_JOBS_PAGES = gql`
query EmployerJobsPages($employerId: ID!, $page: Int, $pageLimit: Int) {
  employerJobsPages(employerId: $employerId, page: $page, pageLimit: $pageLimit) {
    count
    jobs {
      _id
      applyLink
      available
      details
      employer {
        _id
        name
      }
      location {
        _id
        name
      }
      name
      pay
      postedDate
    }
  }
}`