import { AttachFile, Description, PictureAsPdf, Theaters } from '@material-ui/icons';
import { DropzoneArea } from 'material-ui-dropzone';
import readXlsxFile from 'read-excel-file'
import { useDispatch } from 'react-redux'
import { setFetching, setSuccess } from 'actions/main/main.action'
function ExcelFormMaterialUi(props) {
    const { setItemExcel } = props;
    const dispatch = useDispatch();
    function onSelectFile(files) {
        if (files.length > 0) {
            const file = files[0]
            importExcel(file);
        }
    }
    async function importExcel(file) {
        dispatch(setFetching());
        document.body.style.cursor = 'wait';
        var file_name_string = file.name;
        var file_name_array = file_name_string.split(".");
        var file_extension = file_name_array[file_name_array.length - 1];
        if (file_extension.toLowerCase() === "xlsx") {
            const excel_values = await readXlsxFile(file)
            const items = await excel_values.map(item => {
                return item.map(value => {
                    return { value }
                })
            })
            setItemExcel(items)
            dispatch(setSuccess());
        } else {
            setItemExcel([])
        }
        document.body.style.cursor = 'default';
    }

    const handlePreviewIcon = (fileObject, classes) => {
        const { type } = fileObject.file
        const iconProps = {
            className: classes.image,
        }

        if (type.startsWith("video/")) return <Theaters {...iconProps} />
        // if (type.startsWith("audio/")) return <AudioTrack {...iconProps} />

        switch (type) {
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return <Description {...iconProps} />
            case "application/pdf":
                return <PictureAsPdf {...iconProps} />
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return <Description {...iconProps} />
            default:
                return <AttachFile {...iconProps} />
        }
    }

    return (<DropzoneArea
        acceptedFiles={[".xlsx"]}
        filesLimit={1}
        dropzoneText={"Drag and drop an excel file here or click"}
        getPreviewIcon={handlePreviewIcon}
        onChange={onSelectFile}
    />)
}

export default ExcelFormMaterialUi;