import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(() => ({
    mainArea:{
      padding: 10,
      borderRadius:"5px",
      border:"1px solid #babdbe"
    },
    dropArea: {
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      padding: 10,
      cursor:"pointer",
      backgroundColor:"#eceff1",
      borderRadius:"5px",
      border:"2px dashed #babdbe"
    },
    textDrop:{
      fontSize:"16px",
      textAlign:"center",
      cursor:"pointer",
      color:"#666"
    },
    iconDrop:{
      fontSize:"30px",
      textAlign:"center",
      cursor:"pointer",
      color:"#666"
    }
  }));