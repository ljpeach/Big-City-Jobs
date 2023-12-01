import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function LoginSignup(props) {
  // Log In Related Setup
  const [logInFormState, setLogInFormState] = useState({ email: '', password: '' });
  const [login, { logInError }] = useMutation(LOGIN);

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
  const [addUser, { addUserError }] = useMutation(ADD_USER);

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

  return (
    <>
      <div className="container my-1">

        <h2>Login</h2>
        <form onSubmit={handleLogInFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email address:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleLogInChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleLogInChange}
            />
          </div>
          {logInError ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>

        <h2>Signup</h2>
        <form onSubmit={handleSignUpFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="First"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleSignUpChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Last Name:</label>
            <input
              placeholder="Last"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleSignUpChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleSignUpChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleSignUpChange}
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginSignup;