import React, { useState, useContext } from 'react';
import {
    Button,
    Paper,
    makeStyles,
    Typography,
    Divider,
    CircularProgress,
} from '@material-ui/core';
import Inputs from './signupInputs';
import Calender from './calender';
import MapWrapper from './map';
import { checkInput } from '../validation';
import { fireContext } from '../firebaseContext';
import Snack from '../snack';

const useStyles = makeStyles(theme => ({
    signupWrapper: {
        margin: '50px auto',
        maxWidth: '700px',
    },
    title: {
        margin: '20px 20px',
    },
    button: {
        margin: '20px 20px',
    },
    lastRow: {
        display: 'flex',
        alignItems: 'center',
    },
    loading: {
        marginLeft: 'auto',
    }
}));

/**
 * @param {object} profile - unvalidated user profile
 * @param {function} setProfile - Empty profile details on error
 * @param {object} errorForm - Keep existing input errors
 * @param {function} setErrorForm - Signal input that is wrong
 * @description Checks user input for errors and signals if thats
 * the case with errorForm
 * @returns {boolean}
 */
const validate = (profile, setProfile, errorForm, setErrorForm) => {
    console.log(profile.userName);
    if (!checkInput(profile.userName)) {
        setErrorForm({...errorForm, userName: true } );
        setProfile({...profile, userName: ''});
        return false;
    }
    if (!checkInput(profile.email, true)) {
        setErrorForm({ ...errorForm, email: true });
        setProfile({...profile, email: ''});
        return false;
    }
    return true;
}

/**
 * @description Component displays either a signup form
 * or a profile which can be altered depending on props.profile
 * @param {object} props - React props
 * @param {object} props.profile - Already fetched profile no signup
 */
const Signup = (props) => {
    const { db, geo } = useContext(fireContext);
    //authenticated firebase instance 
    //access to firestore per db
    //and geo for creating geolocations
    const initState = (props.profile) ? props.profile : ({
        userName: '',
        email: '',
        birthday: new Date('2000-05-04T06:00:00'),
        location: {
            lat: null,
            lng: null,
        },
    });
    const classes = useStyles();
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(initState);
    const [errorForm, setErrorForm] = useState({
        userName: false,
        email: false,
        location: false
    });
    return (
        <div className={classes.signupWrapper}>
            <Paper>
                <Typography
                    variant="h6"
                    className={classes.title}
                >
                    { (props.edit) ? 'Profile' : 'Signup' } 
                </Typography>
                <Divider />
                <form type="submit">
                    <Inputs 
                        errorForm={errorForm}
                        setErrorForm={setErrorForm}
                        profile={profile}
                        setProfile={setProfile}
                    />
                    <MapWrapper
                        profile={profile}
                        setProfile={setProfile}
                    />
                    <div className={classes.lastRow}>
                        <Calender
                            profile={profile}
                            setProfile={setProfile}
                        />
                        <Button
                            id="signup-button"
                            type="submit"
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                setLoading(true);
                                if (validate(profile, setProfile, errorForm, setErrorForm)) {
                                    if (props.backend) {
                                        const storedProfile = { ...profile, 
                                            location: new geo(profile.location.lat, profile.location.lng),
                                            birthday: profile.birthday.getTime(),
                                            };
                                        try {
                                            if (props.profile) {
                                                db.collection('user').doc(props.profile.id).set(storedProfile);
                                            } else {
                                                db.collection('user').doc().set(storedProfile);
                                            }
                                            setSuccess(true);
                                            setProfile({
                                                userName: '',
                                                email: '',
                                                birthday: new Date('2000-05-04T06:00:00'),
                                                location: {
                                                    lat: null,
                                                    lng: null,
                                                }
                                            });
                                        } catch (e) {
                                            setSuccess(false);
                                            setProfile({
                                                userName: '',
                                                email: '',
                                                birthday: new Date('2000-05-04T06:00:00'),
                                                location: {
                                                    lat: null,
                                                    lng: null,
                                                }
                                            });
                                        }
                                    } else {
                                        localStorage.setItem('spatialVisionInterview', JSON.stringify(profile));
                                        setSuccess(true);
                                        setProfile({
                                            userName: '',
                                            email: '',
                                            birthday: new Date('2000-05-04T06:00:00'),
                                            location: {
                                                lat: null,
                                                lng: null,
                                            }
                                        });
                                    }
                                }
                                setLoading(false);
                            }}
                        >
                            {(props.edit) ? 'Save' : 'Signup'}
                        </Button>
                        {(loading) ?
                            <CircularProgress className={classes.loading} />
                            :
                            null
                        }
                    </div>
                </form>
                {(success === true) ? 
                    <Snack
                        variant="success"
                        message={(props.profile) ? "You saved your information!" : "You signed up!"}
                        outerOpen={setSuccess}
                    />
                    : null
                }
                {(success === false) ? 
                    <Snack
                        variant="danger"
                        message="There was an error."
                        outerOpen={setSuccess}
                    />
                    : null
                }
            </Paper>
        </div>
    );
};

export default Signup;