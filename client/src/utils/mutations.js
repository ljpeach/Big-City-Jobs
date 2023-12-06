import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($email: String!, $password: String!){
    login(email:$email, password: $password){
        token
        user {
            _id
        }
    }
}`;

export const ADD_USER = gql`
mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    user {
      email
      firstName
      lastName
      password
      _id
    }
    token
  }
}`;

export const FAVORITE_JOB = gql`
mutation Mutation($jobId: ID!) {
  favoriteJob(jobId: $jobId) {
    email
    savedJobs {
      _id
    }
  }
}`;

export const REMOVE_JOB = gql`
mutation Mutation($jobId: ID!) {
  removeJob(jobId: $jobId) {
    email
    savedJobs {
      _id
    }
  }
}`;