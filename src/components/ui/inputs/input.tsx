import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

type InputProps = TextFieldProps;

const Input: FC<InputProps> = (props) => {
    return (
        <TextField
        {...props}
        fullWidth 
        variant="outlined" 
        margin="dense" 
        className="justify-self-center"
        />
    );
};

export default Input;
