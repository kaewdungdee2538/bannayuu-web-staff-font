import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputFile from "components/Input/InputFile"
import DialogContent from '@material-ui/core/DialogContent';
function CompanyEditModalDisable(props) {
    const {
        setImage,
        setRemark,
        remark,
    } = props;
    return (
        <DialogContent dividers={scroll === 'paper'} >
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <InputFile
                                    title="เลือกรูปภาพหลักฐานที่แจ้งระงับโครงการ"
                                    setValue={setImage}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="กรอกเหตุผลที่แก้ไขข้อมูล"
                                    id="comp-name-th"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        maxLength: "255",
                                        value: remark,
                                        multiline: true,
                                        rows: 4,
                                        onChange: event => setRemark(event.target.value)
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
        </DialogContent>
    )
}

export default CompanyEditModalDisable;