import React, { Component, createRef } from 'react';
import { Container, Typography, Button, FormControl, MenuItem } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import './Register.scss';

class registerVisit extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            hour: '',
            time: '',
            description: '',
        }
        this.formRef = createRef();
        this.fetchRegister = this.fetchRegister.bind(this);
    }

    componentDidMount() {
    }

    fetchRegister() {
        console.log(this.state);
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
    
    render() {
        const { date, hour, time, description } = this.state;

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