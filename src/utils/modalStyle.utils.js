import { makeStyles } from '@material-ui/core/styles';
export const modalStyle = makeStyles(() => ({
    paper: {
        minWidth: '600px',
        minHeight: '650px',
    }, headModalAdd: {
        backgroundColor: '#388e3c',
        color: '#fff'
    }, headModalEdit: {
        backgroundColor: '#1a237e',
        color: '#fff'
    }, btnCancel: {
        backgroundColor: '#ffc400',
        color: '#000',
        '&:hover': {
            backgroundColor: '#b28900',
        },
    }, btnSave: {
        backgroundColor: '#388e3c',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#1b5e20',
        },
    }
}));