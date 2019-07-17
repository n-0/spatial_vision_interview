import React, { useState, useContext } from 'react';
import {
    Button,
    Paper,
    Typography,
    Divider,
    makeStyles,
    CircularProgress,
} from '@material-ui/core'
import Inputs from './loginInputs';
import { checkInput } from '../validation';
import { fireContext } from '../firebaseContext';
import Snack from '../snack';

const useStyles = makeStyles(theme => ({
    loginWrapper: {
        margin: '30px auto',
        maxWidth: '700px',
    },
    title: {
        margin: '20px 20px',
    },
    button: {
        margin: '20px 20px',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
    },
    loading: {
        marginLeft: 'auto',
    },
}));

/**
 * @description Validates user and signal errors
 * @param {object} userLogin - Entered user data
 * @param {function} setUserLogin - Clear error fields
 * @param {object} errorForm - To persist existing errors
 * @param {function} setErrorForm - To write error
 * @returns {boolean}
 */
const validate = (userLogin, setUserLogin, errorForm, setErrorForm) => {
    if (!checkInput(userLogin.userName)) {
        setErrorForm({ ...errorForm, userName: true });
        return false;
    }
    if (!checkInput(userLogin.email, true)) {
        setErrorForm({ ...errorForm, email: true });
        return false;
    }
    setUserLogin({
        userName: '',
        email: ''
    });
    return true;
}

/**
 * @description Login form for user to profile
 * @param {object} props - React.Props
 * @param {boolean} backend - Login per backend or localstorage
 * @param {object} props.setLogin - Signal parent component to load profile
 */
const Login = (props) => {
    const { db } = useContext(fireContext);
    const classes = useStyles();
    const [userLogin, setUserLogin] = useState({
        userName: '',
        email: '',
    });
    const [errorForm, setErrorForm] = useState({
        userName: false,
        email: false,
    });
    const [success, setSuccess] = useState();
    const [loading, setLoading] = useState(false);
    return (
        <div className={classes.loginWrapper}>
            <Paper>
                <Typography 
                    variant="h6"
                    className={classes.title}
                >
                    Login
                </Typography>
                <Divider />
                <form type="submit">
                    <Inputs 
                        userLogin={userLogin}
                        setUserLogin={setUserLogin}
                        errorForm={errorForm}
                        setErrorForm={setErrorForm}
                    />
                    <div className={classes.row}>
                        <Button
                            id="login-button"
                            className={classes.button}
                            color="primary"
                            variant="contained"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                if (validate(userLogin, setUserLogin, errorForm, setErrorForm)) {
                                    setLoading(true);
                                    if (props.backend) {
                                        db.collection('user')
                                            .where('userName', '==', userLogin.userName)
                                            .where('email', '==', userLogin.email)
                                            .limit(1)
                                            .get()
                                            .then(snapshot => {
                                                if (snapshot.empty) {
                                                    setSuccess(false);
                                                    return;
                                                }
                                                snapshot.forEach(doc => {
                                                    const profile = doc.data();
                                                    profile.id = doc.id
                                                    profile.birthday = new Date(profile.birthday);
                                                    profile.location = {
                                                        lat: profile.location.latitude,
                                                        lng: profile.location.longitude,
                                                    };
                                                    props.setLogin({
                                                        login: true,
                                                        data: profile,
                                                    });
                                                });
                                            });
                                    } else {
                                        const data = JSON.parse(localStorage.getItem('spatialVisionInterview'));
                                        if (data.userName === userLogin.userName && data.email === userLogin.email) {
                                            props.setLogin({
                                                login: true,
                                                data,
                                            });
                                        } else {
                                            setSuccess(false);
                                        }
                                    }
                                    setLoading(false);
                                }
                            }}
                        >
                            Login
                        </Button>
                        {(loading) ?
                            <CircularProgress className={classes.loading} />
                            :
                            null
                        }
                    </div>
                </form>
            </Paper>
            {(success === false) ? 
                <Snack
                    variant="danger"
                    message="There was an error."
                    outerOpen={setSuccess}
                />
                : null
            }
        </div>
    );
};

export default Login;
