import PropTypes from 'prop-types';
import { Plus } from 'lucide-react';
import styled from 'styled-components';

const AddList = ({ newListName, setNewListName, handleAddList }) => (
 <AddContainer>
  <NewListInput
      type="text"
      value={newListName}
      onChange={(e) => setNewListName(e.target.value)}
      placeholder="New list name"
    />
  <AddButton onClick={handleAddList}>
   <Plus size={20} />
  </AddButton>
 </AddContainer>
);

AddList.propTypes = {
  newListName: PropTypes.string.isRequired,
  setNewListName: PropTypes.func.isRequired,
  handleAddList: PropTypes.func.isRequired,
};

export default AddList;

const AddContainer = styled.div`
  display: flex;
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
`;

const NewListInput = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 8px;
  border: none;
  border-radius: 4px;
`;

const AddButton = styled.button`
  background: #4CAF50;
  border: none;
  color: white;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
`;
