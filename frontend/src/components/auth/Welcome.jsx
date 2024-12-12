import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const Welcome = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
   <WelcomeContainer>
    <WelcomeBox $isTransitioning={isTransitioning}>
     <WelcomeContent>
      <LoginTitle>TodoList</LoginTitle>
      <WelcomeSubtitle>One Task at a Time</WelcomeSubtitle>
      <WelcomeButtons>
       <LoginButton onClick={() => handleNavigation('/login')}>Login</LoginButton>
       <RegisterButton onClick={() => handleNavigation('/register')}>Register</RegisterButton>
      </WelcomeButtons>
     </WelcomeContent>
    </WelcomeBox>
   </WelcomeContainer>
  );
};

export default Welcome;

const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Poppins', sans-serif;
  background-color: #f7f8fa;
`;

const WelcomeBox = styled.div`
  width: ${props => props.$isTransitioning ? '400px' : '500px'};
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
  transition: all 0.3s ease;
  opacity: ${props => props.$isTransitioning ? 0 : 1};
  transform: ${props => props.$isTransitioning ? 'scale(0.8)' : 'scale(1)'};

  &:hover {
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  }
`;
const WelcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LoginTitle = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 600;
`;

const WelcomeSubtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
`;

const WelcomeButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 45%;
  padding: 14px;
  background: linear-gradient(135deg, #4caf50, #81c784);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #45a049, #66bb6a);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const RegisterButton = styled.button`
  width: 45%;
  padding: 14px;
  background: linear-gradient(135deg, #4caf50, #81c784);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #45a049, #66bb6a);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;
