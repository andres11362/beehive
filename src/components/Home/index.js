import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import Countdown from 'react-countdown';
import useModal from '../Dialog/useModal';
import Modal from '../Dialog/Modal';
import { Link } from 'react-router-dom';
import { lastRegisterUsers } from '../api/endpoints';
import Axios from 'axios';
import moment from 'moment';
import 'moment/locale/fr';

const dateStart = Date.now() + 90000;

const Home = (props) => { 

    const {open, handleOpen, handleClose} = useModal();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [active, setActive] = useState(props.active);
    const [lastRegisterUser, setLastRegisterUser] = useState({});
    const [user, setUser] = useState(props.user);
    const [restTime, setRestTime] = useState(false);

    const convertMinutes = (t) => {
        return Math.abs(Math.round((t / 1000 ) / 60));
    }

    const onCountDate = (t) => {
        // const minutesRest = convertMinutes(t.total);
        if (t.total <= 60000) {
            setTitle('¡Hola!'); 
            setText('Faltan menos de un 1 minuto para que termine tu tiempo');
            handleOpen();
        }

        if (t.total <= 5000) {
            setTitle('Se acabo'); 
            setText('¡Tu tiempo termino, debes salir de inmediato!');
            handleOpen();
        }
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
          return (
            <CardContent>
                <Typography className={classes.pos} style={{ color: '#FFF' }}>
                    Por el momento no tienes una visita en curso
                </Typography>
            </CardContent>
          );
        } else {
          return (
            <CardContent>
                <Typography className={classes.pos} style={{ color: '#FFF', fontSize: "1.5rem" }}>
                    {hours}:{minutes}:{seconds}
                </Typography>
            </CardContent>
          );
        }
      };

      const StatusDate = () => {
         const lp = lastRegisterUser;
         if(lp.status === 'Pendiente') {
            if(!restTime) {
                return(
                    <CardContent>
                        <Typography className={classes.pos} style={{ color: '#FFF' }}>
                            Tienes una visita pendiente para el dia: { moment(lp.hora_entrada).format('DD-MM-YYYY')}
                        </Typography>
                    </CardContent>
                )
            } else {
                if(!active) {
                    return(
                        <Link style={{ textDecoration: 'none' }} to="/active-visit">
                            <CardContent>
                                <Typography className={classes.pos} style={{ color: '#FFF' }}>
                                    Ya puedes acceder al  por favor valida la entrada.
                                </Typography>
                            </CardContent>
                        </Link>
                    )
                } else {
                    return(
                        <Link style={{ textDecoration: 'none' }} to="/active-visit">
                            <CardContent>
                                <Typography className={classes.pos} style={{ color: '#FFF' }}>
                                    <Countdown date={dateStart} renderer={renderer} onTick={onCountDate} />
                                </Typography>
                            </CardContent>
                        </Link>
                    ) 
                }
            }
         } else if (lp.status === 'Finalizado') {
            return( 
                <CardContent>
                    <Typography className={classes.pos} style={{ color: '#FFF' }}>
                        No tienes visitas pendientes o en curso en este momento
                    </Typography>
                </CardContent>
            )
         } else {
             return(
                <CardContent>
                    <Typography className={classes.pos} style={{ color: '#FFF' }}>
                       No has hecho visitas registra una.
                    </Typography>
                </CardContent>
            )
         }
      };

    useEffect(() => {
        const fetchData = async () => {
            await Axios.get(lastRegisterUsers,{
                params: {
                    id: props.user.id,
                }
            }).then((response) => {
                setLastRegisterUser(response.data);
                const hour = moment(response.data.hora_entrada).format();
                const isAfter = moment(hour).isBefore(moment().format(), 'minute');
                if (isAfter) {
                    setRestTime(true);
                }
            }).catch(error => {
                console.log(error);
            });
        }
        fetchData();
    }, []);

    return (
        <div>
            <Modal open={open} hide={handleClose} title={title} text={text} />
            <Container maxWidth="sm">
                <Typography variant="h6" color="inherit" style={{ textAlign: 'left', color: '#F28705',  marginTop: '1em', marginBottom: '1em' }}>
                    ¡Bienvenido {props.user.name}!
                </Typography>
                <Link style={{ textDecoration: 'none' }} to="/active-places">
                    <Card className={classes.root} style={{ backgroundColor: '#F2B705', marginBottom: '2em' }}>
                        <CardContent>
                            <Typography className={classes.pos} style={{ color: '#FFF' }}>
                                Lugares autorizados
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/visited-places">
                    <Card className={classes.root} style={{ backgroundColor: '#F29F05', marginBottom: '2em' }}>
                        <CardContent>
                            <Typography className={classes.pos} style={{ color: '#FFF' }}>
                                Tus visitas anteriores
                            </Typography>   
                        </CardContent>
                    </Card>
                    </Link>
                <Card className={classes.root} style={{ backgroundColor: '#F29F05', marginBottom: '2em' }}>
                     <StatusDate />
                </Card>
                <a style={{ textDecoration: 'none' }} href="https://covid19.minsalud.gov.co/">
                    <Card className={classes.root} style={{ backgroundColor: '#F27405' }}>
                        <CardContent>
                            <Typography className={classes.pos} style={{ color: '#FFF' }}>
                                Situacion coronavirus
                            </Typography>
                        </CardContent>
                    </Card> 
                </a>
            </Container>
            <Modal></Modal>
        </div>

    );
} 

export default Home;