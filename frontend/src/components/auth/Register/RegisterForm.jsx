import styled from 'styled-components';
import PropTypes from 'prop-types';

const RegisterForm = ({ username, setUsername, password, setPassword, confirmPassword, setConfirmPassword, message, handleRegister }) => (
 <RegisterFormContainer onSubmit={handleRegister}>
  <RegisterTitle>Register</RegisterTitle>
  {message && <ErrorMessage>{message}</ErrorMessage>}
  <RegisterInput
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
  <RegisterInput
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  <RegisterInput
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />
  <RegisterButton type="submit">Register</RegisterButton>
 </RegisterFormContainer>
);

RegisterForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  message: PropTypes.string,
  handleRegister: PropTypes.func.isRequired,
};

const RegisterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RegisterTitle = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 600;
`;

const RegisterInput = styled.input`
  width: 80%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    background-color: #fff;
  }

  &::placeholder {
    color: #999;
    font-style: italic;
  }
`;

const RegisterButton = styled.button`
  width: 50%;
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

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  margin-bottom: 15px;
  font-weight: 500;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export default RegisterForm;