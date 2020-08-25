import React, { Component, createRef } from 'react';
import { Container, Typography, Button, FormControl, MenuItem, Snackbar } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import './Register.scss';
import { registerAccess } from '../api/endpoints';
import moment from 'moment';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';

class registerVisit extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            hour: '',
            time: '',
            description: '',
            user_id: props.user.id,
            place_id: this.props.match.params.id,
            open: false,
        }
        this.formRef = createRef();
        this.fetchRegister = this.fetchRegister.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
    }

    fetchRegister() {

        const date_start = moment(this.state.date+" "+this.state.hour).format('YYYY-MM-DD hh:mm:ss');
        const date_end = moment(date_start).add(this.state.time, 'hours').format('YYYY-MM-DD hh:mm:ss');

        const body = {
            user_id: this.state.user_id,
            place_id: this.state.place_id,
            date_start,
            date_end,
            status: 'Pendiente',
        }

        axios.post(registerAccess, body)
        .then(response => {
            this.handleOpen();
            setTimeout(() => { 
                this.props.history.push('/');
            }, 5000)
        }).catch(error => {
            console.log(error);
        })

    }

    handleDate = (event) => {
        const date = event.target.value;
        this.setState({ date });
    }

    handleHour = (event) => {
        const hour = event.target.value;
        this.setState({ hour });
    }

    handleTime = (event) => {
        const time = event.target.value;
        this.setState({ time });
    }

    handleDescription = (event) => {
        const description = event.target.value;
        this.setState({ description });
    }
    
    handleOpen() {
        this.setState({open: true})
    };

    handleClose() {
        this.setState({open: false})
    };

    
    render() {
        const { date, hour, time, description, open } = this.state;


        const Alert = (props) => {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }

        return(
            <Container maxWidth="sm">
                <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Visita registrada correctamente
                    </Alert>
                </Snackbar>
                <Typography variant="h6" color="inherit" style={{ textAlign: 'center', color: '#F28705',  marginTop: '1em', marginBottom: '1em' }}>
                    Registar visita
                </Typography>
                <ValidatorForm
                    ref={this.formRef}
                    onSubmit={this.fetchRegister}
                    onError={errors => console.log(errors)}
                >
                    <TextValidator
                        label="Fecha"
                        type="date"
                        onChange={this.handleDate}
                        name="date"
                        value={date}
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        variant="outlined"
                        style= {{ marginBottom: '1em', minWidth: '13em' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextValidator
                        label="Hora"
                        onChange={this.handleHour}
                        type="time"
                        name="hour"
                        value={hour}
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        style= {{ marginBottom: '1em', minWidth: '13em' }}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue="09:00"
                        inputProps={{
                            step: 200, // 5 min
                        }}
                    />
                    <SelectValidator 
                        label="Tiempo de acceso"
                        name="time"
                        value={time}
                        onChange={this.handleTime}
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        style= {{ marginBottom: '1em', minWidth: '13em' }}
                        variant="outlined"
                    >
                        <MenuItem aria-label="None" value="" />
                        <MenuItem value={1}>1 Hora</MenuItem>
                        <MenuItem value={2}>2 Horas</MenuItem>
                        <MenuItem value={3}>3 Horas</MenuItem>
                    </SelectValidator>
                    <TextValidator
                        label="Detalles"
                        onChange={this.handleDescription}
                        name="description"
                        value={description}
                        validators={['required']}
                        errorMessages={['Este campo es requerido']}
                        style= {{ marginBottom: '1em' }}
                        variant="outlined"
                        type="textArea"
                    />
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#F25C05', color: '#FFF' }}>Registrar visita</Button>
                </ValidatorForm>
            </Container>
        )
    }
}

export default registerVisit;