import * as React from 'react';
import Button from '@mui/material/Button';

const CrudButton = (props) => {
  
  return (
    <Button 
      variant="contained"
      onClick={props.onClick}
      size={props.size}
    >{props.name}</Button>
  );
}

export default CrudButton;