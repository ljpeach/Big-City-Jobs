import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query currentUser {
    user {
      _id
      email
      firstName
      lastName
    }
  }
  `;

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
  }
}`;

export const QUERY_JOBS = gql`
query allJobs{
  jobs {
    _id
    location {
      name
    }
  }
}`;