import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
export default function Label(props) {
    const { title, value } = props
    return (
        <FormControl disabled style={{ width: "100%" }} >
            <InputLabel>{title}</InputLabel>
            <Input value={value} />
        </FormControl>
    )
}