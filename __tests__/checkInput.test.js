import { checkInput } from '../src/validation';


describe('Input validation testl', () => {
    test('Validate username', () => {
        const rightUser = 'helloworld';
        expect(checkInput(rightUser)).toBeTruthy();
        const wrongUser = 'hello-world';
        expect(checkInput(wrongUser)).toBeFalsy();
    });

    test('Validate email', () => {
        const rightEmail = 'hello@world.com';
        expect(checkInput(rightEmail, true)).toBeTruthy();
        const wrongEmail = 'helloworld.com';
        expect(checkInput(wrongEmail, true)).toBeFalsy();
    })

});
