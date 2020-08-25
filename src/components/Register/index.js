import React, { Component, createRef } from 'react';
import { Container, Typography, Button, MenuItem, Snackbar } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import './Register.scss';
import axios from 'axios';
import { registerUser } from '../api/endpoints';
import { Redirect } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';

class register extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            documentType: '',
            document: '',
            email: '',
            password: '',
            isAuth: props.isAuth,
            open: false,
        }
        this.formRef = createRef();
        this.fetchRegister = this.fetchRegister.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isAuth !== this.props.isAuth) {
            this.setState({isAuth: nextProps.isAuth});
        }
    }

    fetchRegister() {
        const body = this.state
        axios.post(registerUser, body)
        .then(response => {
            this.handleOpen();
            this.props.getUser(response.data[0]);
            setTimeout(() => { 
                this.props.getValueAuth(true);
            }, 5000)
        }).catch(error => {
            console.log(error);
        })
    }

    handleEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }

    handleName = (event) => {
        const name = event.target.value;
        this.setState({ name });
    }

    handleDocumentType = (event) => {
        const documentType = event.target.value;
        this.setState({ documentType });
    }

    handleDocument = (event) => {
        const document = event.target.value;
        this.setState({ document });
    }

    handlePassword = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }

    handleOpen() {
        this.setState({open: true})
    };

    handleClose() {
        this.setState({open: false})
    };

    
    render() {
        const { email, name, document, documentType, password, isAuth, open } = this.state;

        const Alert = (props) => {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }

        return(
            <Container maxWidth="sm">
                <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Usuario registrado correctamente
                    </Alert>
                </Snackbar>
                <Typography variant="h6" color="inherit" style={{ textAlign: 'center', color: '#F28705',  marginTop: '1em', marginBottom: '1em' }}>
                    Registro
                </Typography>
                <ValidatorForm
                    ref={this.formRef}
                    onSubmit={this.fetchRegister}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        label="Nombre"
                        onChange={this.handleName}
                        name="nombre"
                        value={name}
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        variant="outlined"
                        style= {{ marginBottom: '1em' }}
                    />
                    <SelectValidator 
                        label="Tipo de documento"
                        name="documentType"
                        value={documentType}
                        onChange={this.handleDocumentType}
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        style= {{ marginBottom: '1em', minWidth: '14em' }}
                        variant="outlined"
                    >
                        <MenuItem aria-label="None" value="" />
                        <MenuItem value="CC">C.C</MenuItem>
                        <MenuItem value="TI">T.I</MenuItem>
                        <MenuItem value="CE">C.E</MenuItem>
                    </SelectValidator>
                    <TextValidator
                        label="Documento"
                        onChange={this.handleDocument}
                        name="document"
                        value={document}
                        validators={['required', 'isNumber']}
                        errorMessages={['Este campo es requerido', 'Documento no valido']}
                        style= {{ marginBottom: '1em' }}
                        variant="outlined"
                    />
                    <TextValidator
                        label="Email"
                        onChange={this.handleEmail}
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['Este campo es requerido', 'Correo no es valido']}
                        style= {{ marginBottom: '1em' }}
                        variant="outlined"
                    />
                    <TextValidator
                        label="Contraseña"
                        onChange={this.handlePassword}
                        name="password"
                        value={password}
                        type="password"
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        style= {{ marginBottom: '1em' }}
                        variant="outlined"
                    />
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#F25C05', color: '#FFF' }}>Siguiente</Button>
                </ValidatorForm>
            </Container>
        )
    }
}

export default register;