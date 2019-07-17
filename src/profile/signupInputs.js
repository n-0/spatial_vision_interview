import React from 'react'
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
 * @description Returns inputs for a form where user enters profile info
 * @param {object} props - React props
 * @param {object} props.profile - To read values from profile
 * @param {function} props.setProfile - To write values to profile
 * @param {props.errorForm} - To read errors of user input
 * @param {props.setErrorForm} - To write errors of user input
 */
const Inputs = (props) => {
    const classes = useStyles();
    return (
        <>  
            <TextField
                id="signup-username"
                className={classes.textInputWrapper}
                color={(props.errorForm.userName) ? "danger" : "primary"}
                variant="outlined"
                label="User Name"
                value={props.profile.userName}
                onChange={(event) => {
                    if (props.errorForm.userName) {
                        props.setErrorForm({ ...props.errorForm, userName: false })
                    }
                    props.setProfile(
                    {...props.profile, userName: event.target.value.replace(' ', '') })
                }}
            />
            {(props.errorForm.userName) ? 
                <Snack
                    variant="danger"
                    message="Please use only 4-20 alphanumeric for the user name"
                />
                : null
            }
            <TextField
                id="signup-email"
                className={classes.textInputWrapper}
                variant="outlined"
                label="Email"
                value={props.profile.email}
                onChange={(event) => {
                    if (props.errorForm.email) {
                        props.setErrorForm({ ...props.errorForm, emai: false })
                    }
                    props.setProfile({ ...props.profile, email: event.target.value.replace(' ', '')})
                }}
            />
            {
                (props.errorForm.email) ?
                <Snack
                    message="Please provide a valid email address"
                    variant="danger"
                />
                : null
            }
        </>
    );
}

export default Inputs;