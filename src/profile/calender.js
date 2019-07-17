import React from 'react';
import DateFnUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    calender: {
        margin: '10px 20px',
    }
}));

/**
 * @description Displays a calendar to set profile's birthday 
 * @param {object} props - React props
 * @param {object} props.profile profile of parent component
 * @param {function} props.setProfile
 */
const Calender = (props) => {
    const classes = useStyles();
    return (
        <MuiPickersUtilsProvider utils={DateFnUtils}>
            <KeyboardDatePicker
                className={classes.calender}
                id="calender"
                label="Your Birthday"
                value={props.profile.birthday}
                onChange={(e) => 
                    props.setProfile({ ...props.profile, birthday: e })
                }
                KeyboardButtonProps={{
                    'aria-label': 'change data',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}

export default Calender;