import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '../../../services/api/authApi';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import BackButton from '../BackButton';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      setIsAuthenticated(true);
      setMessage('Login successful!');
      setMessageType('success');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setMessage(err.message || 'Error registering user');
      setMessageType('error');
    }
  };

  const handleBack = () => {
    navigate('/');
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
   <LoginContainer>
    <LoginBox>
     <BackButton onClick={handleBack} />
     <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          message={message}
          messageType={messageType}
          handleLogin={handleLogin}
        />
    </LoginBox>
   </LoginContainer>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #f7f8fa;
`;

const LoginBox = styled.div`
  position: relative;
  width: 400px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 30px;
  animation: shrinkAndAppear 0.5s ease-out;

  @keyframes shrinkAndAppear {
    from {
      transform: scale(1.2);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  &:hover {
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  }
`;