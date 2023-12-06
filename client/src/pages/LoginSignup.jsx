import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function LoginSignup(props) {
  // Log In Related Setup
  const [logInFormState, setLogInFormState] = useState({ email: '', password: '' });
  const [login, { error: logInError }] = useMutation(LOGIN);

  const handleLogInFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: logInFormState.email, password: logInFormState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log('error', e);
      console.log(logInError);
    }
  };

  const handleLogInChange = (event) => {
    const { name, value } = event.target;
    setLogInFormState({
      ...logInFormState,
      [name]: value,
    });
  };

  // Sign Up Related Setup
  const [signUpFormState, setSignUpFormState] = useState({ email: '', password: '' });
  const [addUser, { error: addUserError }] = useMutation(ADD_USER);

  const handleSignUpFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: signUpFormState.email,
        password: signUpFormState.password,
        firstName: signUpFormState.firstName,
        lastName: signUpFormState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    console.log(token);
    Auth.login(token);
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormState({
      ...signUpFormState,
      [name]: value,
    });
  };

  const handleSignupError = (e) => {
    if (e.includes('is shorter than the minimum allowed length (5).')) {
      return 'Your password must be at least 5 characters long.';
    } else if (e.includes('E11000 duplicate key error collection')) {
      return 'There is already an account with that email.';
    } else if (e.includes('User validation failed')) {
      return 'You must fill out all forms.';
    } else {
      return 'Sorry, there was a problem.';
    }
  }

  return (
    <>
      <div className="container my-3">
        <form class="form-control mb-2" onSubmit={handleLogInFormSubmit}>
          <h2>Log In</h2>
          <div class="mb-2">
            <label for="login-email" class="form-label">Email address</label>
            <input
              className="form-control"
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="login-email"
              onChange={handleLogInChange}
            />
          </div>
          <div class="mb-2">
            <label for="login-pwd" class="form-label">Password</label>
            <input
              class="form-control"
              placeholder="*****"
              name="password"
              type="password"
              id="login-pwd"
              onChange={handleLogInChange}
            />
          </div>
          {logInError ? (
            <div id="login-error" className="mb-2 py-1 px-3 bg-danger text-white text-center rounded">
              Sorry, you entered your credentials incorrectly. Please try again.
            </div>
          ) : null}
          <button type="submit" class="btn btn-outline-secondary">Log In</button>
        </form>

        <form class="form-control mb-2" onSubmit={handleSignUpFormSubmit}>
          <h2>Sign Up</h2>
          <div class="mb-2">
            <label for="first-name" class="form-label">First Name</label>
            <input
              className="form-control"
              placeholder="First Name"
              name="firstName"
              type="text"
              id="first-name"
              onChange={handleSignUpChange}
            />
          </div>
          <div class="mb-2">
            <label for="last-name" class="form-label">Last Name</label>
            <input
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              type="text"
              id="last-name"
              onChange={handleSignUpChange}
            />
          </div>
          <div class="mb-2">
            <label for="signup-email" class="form-label">Email address</label>
            <input
              className="form-control"
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="signup-email"
              onChange={handleSignUpChange}
            />
          </div>
          <div class="mb-2">
            <label for="signup-pwd" class="form-label">Password</label>
            <input
              class="form-control"
              placeholder="*****"
              name="password"
              type="password"
              id="signup-pwd"
              onChange={handleSignUpChange}
            />
          </div>
          {addUserError ? (
            <div id="signup-error" className="mb-2 py-1 px-3 bg-danger text-white text-center rounded">
              {addUserError ? handleSignupError(addUserError.message) : null}
            </div>
          ) : null}
          <button type="submit" class="btn btn-outline-secondary">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default LoginSignup;