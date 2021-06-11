// import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green, grey, red,yellow } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    }, normalStatus: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        padding: '5px 15px',
        color: '#fff',
        backgroundColor: green[500]
    }, expireStatus: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        padding: '5px 15px',
        color: '#fff',
        backgroundColor: red[500]
    }, disableStatus: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        padding: '5px 15px',
        color: '#fff',
        backgroundColor: grey[500]
    }, notopenStatus: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        padding: '5px 15px',
        color: '#000',
        backgroundColor: yellow[500]
    }
}));

function AvatarForm(props) {
    const classes = useStyles();
    const { text, status } = props;
    const getStyle = (item) => {
        switch (item) {
            case "NORMAL":
                return classes.normalStatus;
            case "EXPIRE":
                return classes.expireStatus;
            case "NOTOPEN":
                return classes.notopenStatus;
            default:
                return classes.disableStatus;
        }
    }
    console.log(getStyle(status))
    return (
        <div className={getStyle(status)}>
            {text}
        </div>
    )
}

export default AvatarForm;