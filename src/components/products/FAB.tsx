
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { FC } from 'react';

interface IProps {
  handleOpenModal: (openModal: boolean) => { payload: boolean; type: any;}
}

const FloatingActionButton: FC<IProps> = ({ handleOpenModal }) => {

  return (
    <Box sx={{ '& > :not(style)': { m: 1 }, position: "fixed", bottom: 25, right: 25 }}>
      <Fab data-testid="FAB" color="secondary" aria-label="add" onClick={() => handleOpenModal(true)}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default FloatingActionButton;