import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { store } from '../api/endpoints';
import { useParams, Link } from 'react-router-dom';
import { GoogleApyKey } from '../constants/maps';
import { GoogleMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps"

const Store = (props)  => {

  const [data, setData] = useState([]);
  let { id } = useParams();

  const [stationsData, setStationsData] = useState({ features: [] });
  
    const classes = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(store, {params: {id}});
            setData(response.data);
            setStationsData()
        }
        fetchData();
    }, []);


    const MapComponent = withScriptjs(withGoogleMap((props) => 
      <GoogleMap defaultZoom={ 17 } defaultCenter={{ lat: data.latitud, lng: data.longitud }}>
          {props.isMarkerShown && <Marker position={{ lat: data.latitud, lng: data.longitud }} />}
      </GoogleMap>
    ));

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image={data.url_imagen}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.descripcion}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.direccion}
          </Typography>
        </CardContent>
        <MapComponent 
          isMarkerShown 
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </CardActionArea>
      <CardActions>
        <Link to={`/register-visit/${data.id}`}>
          <Button size="small" color="primary">
            Registrar Entrada
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default Store;