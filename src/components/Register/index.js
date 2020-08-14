import React, { Component, createRef } from 'react';
import { Container, Typography, Button, FormControl, MenuItem } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import './Register.scss';

class register extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            documentType: '',
            document: '',
            email: '',
        }
        this.formRef = createRef();
        this.fetchRegister = this.fetchRegister.bind(this);
    }

    componentDidMount() {
    }

    fetchRegister() {
        console.log(this.state);
    }

    handleEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }

    handleFirstName = (event) => {
        const firstName = event.target.value;
        this.setState({ firstName });
    }

    handleLastName = (event) => {
        const lastName = event.target.value;
        this.setState({ lastName });
    }

    handleDocumentType = (event) => {
        const documentType = event.target.value;
        this.setState({ documentType });
    }

    handleDocument = (event) => {
        const document = event.target.value;
        this.setState({ document });
    }
    
    render() {
        const { email, firstName, lastName, document, documentType } = this.state;

        return(
            <Container maxWidth="sm">
                <Typography variant="h6" color="inherit" style={{ textAlign: 'left', color: '#F28705',  marginTop: '1em', marginBottom: '1em' }}>
                    Registro
                </Typography>
                <ValidatorForm
                    ref={this.formRef}
                    onSubmit={this.fetchRegister}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        label="Nombre"
                        onChange={this.handleFirstName}
                        name="nombre"
                        value={firstName}
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        variant="outlined"
                        style= {{ marginBottom: '1em' }}
                    />
                    <TextValidator
                        label="Apellido"
                        onChange={this.handleLastName}
                        name="apellido"
                        value={lastName}
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        style= {{ marginBottom: '1em' }}
                        variant="outlined"
                    />
                    <SelectValidator 
                        label="Tipo de documento"
                        name="documentType"
                        value={documentType}
                        onChange={this.handleDocumentType}
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        style= {{ marginBottom: '1em', minWidth: '13em' }}
                        variant="outlined"
                    >
                        <MenuItem aria-label="None" value="" />
                        <MenuItem value={1}>C.C</MenuItem>
                        <MenuItem value={2}>T.I</MenuItem>
                        <MenuItem value={3}>C.E</MenuItem>
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
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#F25C05', color: '#FFF' }}>Siguiente</Button>
                </ValidatorForm>
            </Container>
        )
    }
}

export default register;