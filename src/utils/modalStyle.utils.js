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
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        '&:hover': {
            backgroundColor: '#b28900',
        },
    }, btnSave: {
        backgroundColor: '#388e3c',
        color: '#fff',
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        '&:hover': {
            backgroundColor: '#1b5e20',
        },
    }, btnEnable: {
        backgroundColor: '#2196f3',
        color: '#fff',
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        '&:hover': {
            backgroundColor: '#1976d2',
        },
    }, btnAdd: {
        backgroundColor: '#3ea90a',
        color: '#fff',
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        '&:hover': {
            backgroundColor: '#327d0e',
        },
    }, btnSelect: {
        backgroundColor: '#2196f3',
        color: '#fff',
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        '&:hover': {
            backgroundColor: '#1976d2',
        },
    }, btnImportExcel: {
        padding:"10px",
        fontWeight:"600",
        backgroundColor: '#311b92',
        color: '#fff',
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        '&:hover': {
            backgroundColor: '#000063',
        },
    },btnUpload:{
        padding:"10px",
        fontWeight:"600",
        fontSize:"18px",
        backgroundColor: '#130af7',
        color: '#fff',
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        '&:hover': {
            backgroundColor: '#0000aa',
        },
    },btnNextPage:{
        padding:"10px",
        fontWeight:"600",
        fontSize:"18px",
        backgroundColor: '#29b6f6',
        color: '#fff',
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        '&:hover': {
            backgroundColor: '#0086c3',
        },
    }
}));