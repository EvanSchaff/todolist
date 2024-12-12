import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegisterForm from './RegisterForm';
import BackButton from '../BackButton';
import { registerUser } from '../../../services/api/authApi';


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      await registerUser(username, password);
      setMessage('Registration successful! You can now login.');
    } catch (err) {
      console.log(err);
      setMessage(err.message || 'Error registering user');
    }
  };

  return (
   <RegisterContainer>
    <RegisterBox>
     <BackButton onClick={handleBackClick} />
     <RegisterForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          message={message}
          handleRegister={handleRegister}
        />
    </RegisterBox>
   </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #f7f8fa;
`;

const RegisterBox = styled.div`
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

export default Register;