import React, { useState, useEffect } from 'react';
import { Button, Container, Snackbar } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import QrReader from 'react-qr-reader'
import Alert from '@material-ui/lab/Alert';

const ActiveVisit = (props) => { 

    const history = useHistory();

    const [data, setData] = useState('No result');
    const [open, setOpen] = useState(false);

    const activateCountdown = () => {
        handleOpen();
        props.getActiveCountDown();
        history.push("/");
    }

    const  handleScan = data => {
        if (data) {
          setData(data);
          if (data === 'Autorizado') {
            setTimeout(() => { 
                activateCountdown();
            }, 5000) 
          }
        }
      }
      
    const handleError = err => {
        console.error(err)
    }

    
    const handleOpen = () =>  {
        setOpen(true)
    };

    
    const handleClose = () =>  {
        setOpen(false)
    };

    return(
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Visita activada correctamente
                    </Alert>
                </Snackbar>
            <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
                <p>{data}</p>
            </div>
        </Container>
    );
}

export default ActiveVisit;