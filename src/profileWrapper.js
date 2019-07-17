import React from 'react';
import Signup from './profile/signup';

/**
 * @descripton A wrapper around signup to edit 
 * and already created profile
 * @param {object} props - Fetched profile from store
 */
const Profile = (props) => {
    return (
        <Signup
            edit={true}
            profile={props.profile}
        />
    );
}

export default Profile;
