import React from 'react';
import LoginForm from '../src/login/loginInputs';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Login Form', () => {
    test('Write and read info', () => {
        let userLogin = {
            userName: '',
            email: '',
        };
        let errorForm = {
            userName: false,
            email: false,
        };
        const setUserLogin = obj => {
            userLogin = obj
        };
        const setErrorForm = obj => {
            errorForm = obj;
        };
        const wrapper = shallow(<LoginForm 
            userLogin={userLogin}
            errorForm={errorForm}
            setUserLogin={setUserLogin}
            setErrorForm={setErrorForm}
        />);
        const userNameInput = wrapper.find('#login-username');
        userNameInput.simulate('change', { target: { value: 'spatialVision' }});
        expect(userLogin.userName).toMatch('spatialVision');
    });
})