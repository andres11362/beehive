import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, makeStyles } from '@material-ui/core';
// import data from './data.json';
import axios from 'axios';
import { stores } from '../api/endpoints';
import { Link } from 'react-router-dom';

const ActivePlaces = () => { 

    const [data, setData] = useState([]);

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
            const response = await axios.get(stores);
            setData(response.data);
        }
        fetchData();
    }, []);

    const Places = data.map( (data) => {
        return (
            <Link key={data.id} style={{ textDecoration: 'none' }} to={`/place/${data.id}`}>
                <Card className={classes.root} key={data.id} style={{ backgroundImage: `url(${data.url_imagen})`, marginBottom: '2em' }}>
                    <CardContent style={{ backgroundColor: 'rgb(242, 135, 36, 0.5)' }}>
                        <Typography className={classes.pos} style={{ color: '#FFF', opacity: 1}}>
                            { data.nombre }
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        )
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" color="inherit" style={{ textAlign: 'left', color: '#F28705',  marginTop: '1em', marginBottom: '1em' }}>
                Lugares activos
            </Typography>
            { Places }
        </Container>
    )
}

export default ActivePlaces;