import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, makeStyles } from '@material-ui/core';
// import data from './data.json';
import axios from 'axios';
import { registerUsers } from '../api/endpoints';

const VisitedPlaces = (props) => { 

    const [data, setData] = useState([]);
    const [user, setUser] = useState(props.user);

    const classes = makeStyles({
        root: {
            minWidth: 275,
            height: '25em',
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(registerUsers,{
                params: {
                    id: user.id,
                }
            }).then((response) => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
        fetchData();
    }, []);

    const Places = data.map((data) => {
        return (
            <Card className={classes.root} key={data.id} style={{ backgroundImage: `url(${data.place.url_imagen})`, marginBottom: '2em' }}>
                <CardContent style={{ backgroundColor: 'rgb(242, 135, 36, 0.5)' }}>
                    <Typography className={classes.pos} style={{ color: '#FFF', opacity: 1}}>
                        Lugar de acceso: { data.place.nombre}
                    </Typography>
                    <Typography className={classes.pos} style={{ color: '#FFF', opacity: 1}}>
                        Estado: { data.status }
                    </Typography>
                    <Typography className={classes.pos} style={{ color: '#FFF', opacity: 1}}>
                        Fecha de entrada: { data.hora_entrada }
                    </Typography>
                    <Typography className={classes.pos} style={{ color: '#FFF', opacity: 1}}>
                        Fecha de salida: { data.hora_ingreso }
                    </Typography>
                </CardContent>
            </Card>
        )
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" color="inherit" style={{ textAlign: 'left', color: '#F28705',  marginTop: '1em', marginBottom: '1em' }}>
                Lugares Visitados
            </Typography>
            { Places }
        </Container>
    )
}

export default VisitedPlaces;