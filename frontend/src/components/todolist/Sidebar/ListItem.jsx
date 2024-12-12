import PropTypes from 'prop-types';
import { Trash2 } from 'lucide-react';
import styled from 'styled-components';

const ListItem = ({ list, isActive, onClick, onDelete }) => (
 <ItemContainer $isActive={isActive} onClick={onClick}>
  <ListName>{list.title}</ListName>
  <DeleteButton onClick={(e) => { e.stopPropagation(); onDelete(list.list_id); }}>
   <Trash2 size={16} />
  </DeleteButton>
 </ItemContainer>
);

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ListItem;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.$isActive ? '#4CAF50' : 'rgba(255,255,255,0.2)'};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  border: ${props => props.$isActive ? '2px solid white' : '2px solid transparent'};
  box-shadow: ${props => props.$isActive ? '0 4px 6px rgba(0,0,0,0.2)' : 'none'};

  &:hover {
    background: ${props => props.$isActive ? '#4CAF50' : 'rgba(255,255,255,0.3)'};
  }
`;

const ListName = styled.span`
  color: white;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
`;
