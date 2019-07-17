import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { makeStyles, CircularProgress, useTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    mapWrapper: {
        height: '500px',
        width: '500px',
        [theme.breakpoints.down('sm')]: {
            height: '300px',
            width: '300px',
        },
        margin: '10px 20px',
    },
}));

/**
 * @param {function} setProfile - set location in profile
 * @param {function} profile - profile of parent component
 * @description Finds current location 
 */
const getCurrentLocation = (setProfile, profile) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
            setProfile({...profile, location })
        });
    } else {
        const location = {
            lat: -37.816533,
            lng: 144.956551, 
        };
        setProfile({...profile, location })
    }
};

/**
 * @param {object} props - React props
 * @param {object} props.profile - profile of parent component
 * @param {function} props.setProfile - for setting location of profile
 * @description Displays a map where location can be set
 */
const MapContainer = (props) => {
    const theme = useTheme()
    const classes = useStyles(theme);
    if (!props.profile.location.lat) {
        getCurrentLocation(props.setProfile, props.profile);
        return (
            <CircularProgress />
        );
    }
    return (
        <div className={classes.mapWrapper}>
            <Map
                id="google-maps"
                containerStyle={{
                    position: 'relative'
                }}
                google={props.google}
                zoom={14}
                initialCenter={props.profile.location}
                onClick={(_, __, coords) => {
                    const lat = coords.latLng.lat()
                    const lng = coords.latLng.lng();
                    props.setProfile({...props.profile, location: { lat, lng }});
                }}
            >
                <Marker
                    id="location-marker" 
                    position={props.profile.location}
                />
            </Map>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAkLRION0b2ZvXkmx79uH9u278ok5MrmsU'
})(MapContainer);