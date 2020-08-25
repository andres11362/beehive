import React, { Component, createRef } from 'react';
import { Container, Typography, Button, Box} from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import './Register.scss';
import { login } from '../api/endpoints';
import axios from 'axios';
import qs from 'querystring';
import { Redirect, Link } from 'react-router-dom';

class singUp extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuth: props.isAuth,
        }
        this.formRef = createRef();
        this.fetchRegister = this.fetchRegister.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isAuth !== this.props.isAuth) {
            this.setState({isAuth: nextProps.isAuth});
        }
    }

    fetchRegister(event) {
        event.preventDefault()
        const body = {
            email: this.state.email,
            password: this.state.password
        };

        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post(login, qs.stringify(body), config)
             .then(response => {
                this.props.getValueAuth(true);
                this.props.getUser(response.data.user);
              })
             .catch(error => { 
                console.log(error);
                alert(error.message);
                console.log('Usuario o contraseñan no coinciden.');
            });
    }

    handleEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }

    handlePassword = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }

    
    render() {
        const { email, password, isAuth } = this.state;

        if (isAuth) {
            return <Redirect to='/'/>
        }

        return(
            <Container maxWidth="sm">
                <Typography variant="h6" color="inherit" style={{ textAlign: 'center', color: '#F28705',  marginTop: '1em', marginBottom: '1em' }}>
                    Ingreso
                </Typography>
                <ValidatorForm
                    ref={this.formRef}
                    onSubmit={this.fetchRegister}
                    onError={errors => console.log(errors)}
                    style={{ marginBottom: '1em' }}
                >
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
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#F25C05', color: '#FFF' }}>Acceso</Button>
                </ValidatorForm>
                <Box style={{ marginTop: '20px' }} component="span" m={1}>
                    <Link style={{ textDecoration: 'none', color: '#f29f05', fontSize: '20px' }} to="/register">Registrarse</Link>
                </Box>
            </Container>
        )
    }
}

export default singUp;