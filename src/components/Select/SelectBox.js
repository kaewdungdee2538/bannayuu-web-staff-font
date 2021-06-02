import { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { styles } from './SelectBox-style';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);
function SelectBox(props) {
    const {
        title,
        setValue,
        value,
        items
    } = props;
    //----------------Create Style
    const classes = useStyles();
    //----------------Set Age
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    //---------------Create selectbox element
    let itemsSelectElem = null;
    if (items.length > 0) {
       
        itemsSelectElem = items.map(item=>{
            return <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
        })
    }
    return (
        <FormControl className={classes.formControlSelectBox}>
            <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={value}
                onChange={handleChange}
            >

                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {itemsSelectElem}
            </Select>
        </FormControl>
    );
}

export default SelectBox;