import styled from 'styled-components';
import { Check, X, Edit2 } from 'lucide-react';
import PropTypes from 'prop-types';

const TaskHeader = ({ isEditingTitle, editedTitle, setEditedTitle, handleTitleEditSave, handleTitleEditCancel, handleTitleEditBegin, selectedList }) => {
  return (
   <HeaderContainer>
    {isEditingTitle ? (
     <EditTitleContainer>
      <EditTitleInput
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleEditSave();
              if (e.key === 'Escape') handleTitleEditCancel();
            }}
            autoFocus
          />
      <ActionButtons>
       <SaveButton onClick={handleTitleEditSave}>
        <Check size={18} />
       </SaveButton>
       <CancelButton onClick={handleTitleEditCancel}>
        <X size={18} />
       </CancelButton>
      </ActionButtons>
     </EditTitleContainer>
      ) : (
       <TitleContainer>
        <h2>
         {selectedList ? `${selectedList.title} Tasks` : 'Select a List to View Tasks'}
        </h2>
        {selectedList && (
        <EditTitleButton onClick={handleTitleEditBegin}>
         <Edit2 size={16} />
        </EditTitleButton>
  )}
       </TitleContainer>

      )}
   </HeaderContainer>
  );
};

TaskHeader.propTypes = {
  isEditingTitle: PropTypes.bool.isRequired,
  editedTitle: PropTypes.string.isRequired,
  setEditedTitle: PropTypes.func.isRequired,
  handleTitleEditSave: PropTypes.func.isRequired,
  handleTitleEditCancel: PropTypes.func.isRequired,
  handleTitleEditBegin: PropTypes.func.isRequired,
  selectedList: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
};

const HeaderContainer = styled.div`
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 15px;

  h2 {
    margin: 0;
    color: #333;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #F44336;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const EditTitleButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const EditTitleInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

export default TaskHeader;