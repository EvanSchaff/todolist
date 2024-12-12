import PropTypes from 'prop-types';
import { LogOut } from 'lucide-react';
import styled from 'styled-components';

const SidebarHeader = ({ handleSignOut }) => (
 <HeaderContainer>
  <h2>My Lists</h2>
  <SignOutButton onClick={handleSignOut}>
   <LogOut size={16} />
  </SignOutButton>
 </HeaderContainer>
);

SidebarHeader.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
};

export default SidebarHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #4CAF50;
  color: white;
`;

const SignOutButton = styled.button`
  background: none;
  border: 2px solid white;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
