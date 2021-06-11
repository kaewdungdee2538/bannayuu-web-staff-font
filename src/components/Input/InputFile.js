import 'date-fns';
import FormLabel from '@material-ui/core/FormLabel';
import CustomInput from "components/CustomInput/CustomInput.js";
function InputFile(props) {
    const {
        title,
        value,
        setValue
    } = props;
    //------------------
    return (
        <div>
            <FormLabel style={{ color: "#AAAAAA" }}>{title}</FormLabel>
            <CustomInput
                labelText=""
                id="file-select"
                formControlProps={{
                    fullWidth: true,
                }}
                inputProps={{
                    type: "file",
                    accept: "image/png, image/jpeg",

                    value: value,
                    onChange: event=>setValue(event.target.files.item(0))
                }}
            />
        </div>
    );
}

export default InputFile;