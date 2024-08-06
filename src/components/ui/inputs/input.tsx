import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

type InputProps = TextFieldProps;

const Input: FC<InputProps> = (props) => {
    return (
        <TextField
        {...props}
        fullWidth // Garanta que a propriedade fullWidth seja aplicada se necessário
        variant="outlined" // Defina o variant se necessário, ou deixe-o dinâmico via props
        margin="dense" // Margem padrão, pode ser ajustado conforme necessário
        className="justify-self-center" // Classes adicionais, se necessário
        />
    );
};

export default Input;
