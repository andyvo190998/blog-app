import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [errorState, setErrorState] = useState('');

  const handleOnChange = (e) => {
    setInputs((previous) => ({ ...previous, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/blog-app/');
    } catch (error) {
      console.error(error);
      setErrorState(error.response.data);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/blog-app/');
    }
  }, [currentUser]);
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          onChange={handleOnChange}
          name="username"
          required
          type="text"
          placeholder="username"
        />
        <input
          onChange={handleOnChange}
          name="password"
          required
          type="password"
          placeholder="password"
        />
        <button onClick={handleOnSubmit} required type="submit">
          Login
        </button>
        <p>{errorState}</p>
        <span>
          Don't you have an account?{' '}
          <Link to="/blog-app/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
