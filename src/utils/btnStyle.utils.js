import { makeStyles } from '@material-ui/core/styles';
export const buttonStyle = makeStyles(() => ({
    btnAdd: {
        background: 'linear-gradient(60deg, #66bb6a, #43a047)',
        color: '#fff',
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        fontSize:"17px",
        width:"100%",
        height:"120px",
        '&:hover': {
            background: 'linear-gradient(60deg, #66bb6a, #1f5221)',
        },
    },btnEdit: {
        background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
        color: '#fff',
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        fontSize:"17px",
        width:"100%",
        height:"120px",
        '&:hover': {
            background: 'linear-gradient(60deg, #ffa726, #d05600)',
        },
    }
}));