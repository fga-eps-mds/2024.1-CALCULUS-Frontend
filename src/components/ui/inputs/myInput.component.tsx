import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

type InputProps = TextFieldProps & {
  register: any;
  error?: boolean;
  width?: string;
  helperText?: string;
  bgcolor?: string;
  placeholder?: string;
  value?: string;
};

const MyInput: FC<InputProps> = ({
  value,
  placeholder,
  bgcolor,
  width,
  register,
  error,
  helperText,
  ...props
}) => {
  return (
    <TextField
      {...register}
      {...props}
      value={value}
      variant="outlined"
      placeholder={placeholder}
      sx={{ bgcolor: bgcolor, width: width }}
      margin="normal"
      className="justify-self-center"
      error={error}
      helperText={helperText}
    />
  );
};

export default MyInput;
