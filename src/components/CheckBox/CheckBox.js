import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
function CheckBox(props) {
    const { setCheck, check, title } = props;
    const handleChange = (event) => {
        setCheck(event.target.checked);
      };
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={check}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                />
            }
            label={title}
        />
    )
}

export default CheckBox;