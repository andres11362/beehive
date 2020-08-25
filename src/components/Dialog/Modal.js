import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = ({ open, hide, title, text }) => open ? ReactDOM.createPortal(
    <Fragment>
        <div>
            <Dialog
            open={open}
            onClose={hide}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{ title }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hide} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </Fragment>, document.body
): null;

export default Modal;
