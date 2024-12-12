import styled from 'styled-components';
import PropTypes from 'prop-types';

const BackButton = ({ onClick }) => (
 <StyledBackButton onClick={onClick}>
  <BackIcon>&#8592;</BackIcon>
 </StyledBackButton>
);

BackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

const StyledBackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const BackIcon = styled.span`
  display: inline-block;
  transform: translateY(2px);
`;

export default BackButton;