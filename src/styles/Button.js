import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';

const ButOk = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[400],
    '&:hover': {
        backgroundColor: green[700],
    },
}));

const ButKo = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[400],
    '&:hover': {
        backgroundColor: red[700],
    },
}));
export { ButOk, ButKo };