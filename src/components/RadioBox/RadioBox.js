import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
function RadioBox(props) {
    const { title, value, setCheck, items } = props;
    const handleChange = (event) => {
        setCheck(event.target.value);
    };
    //------------Create Item Elemment
    let radioItemsElem = null;
    if (items.length > 0) {
        radioItemsElem = items.map(item => {
            return <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.text} />
        })
    }
    return (
        <Card>
            <CardBody>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{title}</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        {radioItemsElem}
                    </RadioGroup>
                </FormControl>
            </CardBody>
        </Card>
    );
}

export default RadioBox;