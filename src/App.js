import React, { useState } from 'react';
import Login from './login/login'
import Signup from './profile/signup';
import Profile from './profileWrapper';
import { Checkbox, Typography } from '@material-ui/core';

/**
 * @description Wrapper for home page functionality
 * @param {object} props - React props
 */
const App = (props) => {
    const [login, setLogin] = useState({
        login: false,
        data: null,
    });
    const [backend, setBackend] = useState(false);
    //if user data was fetched
    if (login.login) {
        return (
            <Profile 
                backend={backend} 
                profile={login.data} 
            />
        );
    } else {
        return (
            <div>
                <Login 
                    backend={backend} 
                    setLogin={setLogin} 
                />
                <Signup 
                    backend={backend} 
                    setLogin={setLogin} 
                />
                <span style={{ margin: 'auto' }}>
                    <Checkbox
                        checked={backend}
                        onChange={() => setBackend(!backend)}
                        value="backend"
                        inputProps={{
                            'aria-label': 'primary checkbox'
                        }}
                    />
                    <Typography component="span">
                        Use backend
                    </Typography>
                </span>
            </div>
        );
    }
};

export default App;