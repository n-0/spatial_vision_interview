import React from 'react';
import {
    TextField,
    makeStyles,
} from '@material-ui/core';
import Snack from '../snack';

const useStyles = makeStyles(theme => ({
    textInputWrapper: {
        margin: '15px 20px',
        display: 'block',
    },
}));

/**
 * @description Displays text inputs where user can enter login data
 * @param {object} props - React props
 * @param {object} props.userLogin - To read already entered info
 * @param {object} props.setUserLogin - To write entered info
 * @param {object} props.errorForm - To signal errors by user input
 * @param {function} props.setErrorForm - To clear errors
 */
const Inputs = (props) => {
    const classes = useStyles();
    return (
        <>
            <TextField
                id="login-username"
                className={classes.textInputWrapper}
                label="User Name"
                variant="outlined"
                value={props.userLogin.userName}
                onChange={(event) => {
                    if (props.userName) {
                        props.setErrorForm({ ...props.errorForm, userName: false })
                    }
                    //props.setUserLogin(Object.assign({}, props.userLogin, { userName: event.target.value.replace(' ', '')})); For testing
                    props.setUserLogin({ ...props.userLogin, userName: event.target.value.replace(' ', '') })
                }}
            />
            {(props.errorForm.userName) ? 
                <Snack
                    variant="danger"
                    message="Please enter 4-20 alphanumeric characters"
                />
                : null
            }
            <TextField
                id="login-email"
                className={classes.textInputWrapper}
                label="Email"
                variant="outlined"
                value={props.userLogin.email}
                onChange={(event) => {
                    if (props.errorForm.email) {
                        props.setErrorForm({ ...props.errorForm, email: false });
                    }
                    props.setUserLogin({ ...props.userLogin, email: event.target.value.replace(' ', '') }) 
                }}
            />
            {(props.errorForm.email) ? 
                <Snack
                    variant="danger"
                    message="Please enter a valid email address"
                />
                : null
            }
        </>
    );
};

export default Inputs;