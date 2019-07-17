import React, { useState } from 'react';
import { 
    Snackbar,
    SnackbarContent,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
    danger: {
        backgroundColor: 'red',
    },
    message: {
        display: 'inline-block',
        marginLeft: '20px',
    },
    messageWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    success: {
        backgroundColor: 'green',
    },
}));


/**
 * @description Creates a customized snackbar depending on props
 * @param {object} props - React props
 * @param {string} props.variant - Successfull or dangerous snackbar
 * @param {function} props.outerOpen - communicate close to outer component 
 * @param {string} props.messsage - Message to display
 */
const Snack = (props) => {
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    let icon;
    switch (props.variant) {
        case 'danger': {
            icon = (
                <HighlightOff 
                    key="Error"
                    aria-label="Error"
                />
            );
            break;
        }
        case 'success': {
            icon = (
                <Check
                    key="success" 
                    aria-label="success"
                />
            );
            break;
        }
        default: {
            icon = null;
        }
    }

    const content = (
        <SnackbarContent
            className={classes[props.variant]}
            message={
                <span className={classes.messageWrapper}>
                    {icon}
                    <p className={classes.message}>{props.message}</p>
                </span>
            }
            action={[
                <IconButton
                    key="close" 
                    aria-label="close" 
                    color="inherit"
                    onClick={() => {
                        setOpen(false)
                        if (props.outerOpen) props.outerOpen(null)
                    }}
                >
                    <Clear />
                </IconButton>
            ]}
        />
    );
    if (props.alertLike) {
        return content;
    } else {
        return (
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={() => {
                setOpen(false)
                if (props.outerOpen) props.outerOpen(null)
            }}
            >
                {content}
            </Snackbar>
        );
    }
}

export default Snack;