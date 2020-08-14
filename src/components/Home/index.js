import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Countdown from 'react-countdown';

const home = () => { 

    const [dateStart, setDateStart] = useState(1);
    const [dateCount, setDateCount] = useState(1);

    const onCountDate = (t) => {
        console.log("countDate");
        console.log(t);
    }

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

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a complete state
          return (
            <CardContent>
                <Typography className={classes.pos} style={{ color: '#FFF' }}>
                    Por el momento no tienes una visita en curso
                </Typography>
            </CardContent>
          );
        } else {
          // Render a countdown
          return (
            <CardContent>
                <Typography className={classes.pos} style={{ color: '#FFF', fontSize: "1.5rem" }}>
                    {hours}:{minutes}:{seconds}
                </Typography>
            </CardContent>
          );
        }
      };

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" color="inherit" style={{ textAlign: 'left', color: '#F28705',  marginTop: '1em', marginBottom: '1em' }}>
                ¡Bienvenido Andrés!
            </Typography>
            <Card className={classes.root} style={{ backgroundColor: '#F2B705', marginBottom: '2em' }}>
                <CardContent>
                    <Typography className={classes.pos} style={{ color: '#FFF' }}>
                        Lugares autorizados
                    </Typography>
                </CardContent>
            </Card>
            <Card className={classes.root} style={{ backgroundColor: '#F29F05', marginBottom: '2em' }}>
                <CardContent>
                    <Typography className={classes.pos} style={{ color: '#FFF' }}>
                        Tus visitas anteriores
                    </Typography>   
                </CardContent>
            </Card>
            <Card className={classes.root} style={{ backgroundColor: '#F29F05', marginBottom: '2em' }}>
                <Countdown date={dateStart} renderer={renderer} onTick={onCountDate} />
            </Card>
            <Card className={classes.root} style={{ backgroundColor: '#F27405' }}>
                <CardContent>
                    <Typography className={classes.pos} style={{ color: '#FFF' }}>
                        Situacion coronavirus
                    </Typography>
                </CardContent>
            </Card> 
        </Container>
    );
} 

export default home;