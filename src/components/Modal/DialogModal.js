import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Card, CardHeader, CardContent } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    // height: '88%',
    bgcolor: 'background.paper',
    border: '1px solid #b3b3b3',
    borderRadius: '13px',
    boxShadow: 24
    // p: 4
};

TransitionsModal.propTypes = {
    title: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default function TransitionsModal({ title, subheader, open, setOpen, children }) {
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    {/* <Box sx={style}> */}
                    <Card sx={style}>
                        <CardHeader
                            action={
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    onClick={handleClose}
                                    // sx={{ position: 'absolute', top: '13px', right: '13px' }}
                                >
                                  <ClearIcon sx={{ fontSize: 35 }} />
                                </IconButton>
                            }
                            title={title}
                            subheader={subheader}
                            sx={{ borderBottom: '1px solid #b3b3b3', boxShadow: '5px 3px 12px #b3b3b3cc' }}
                        />
                        <CardContent
                            sx={{
                                maxHeight: '80vh',
                                overflowY: 'auto',
                               
                            }}
                        >
                            {children}
                        </CardContent>
                    </Card>
                    {/* </Box> */}
                </Fade>
            </Modal>
        </div>
    );
}
