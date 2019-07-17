/**
 * Checks input for regex
 * @param {string} input - User input to check
 * @param {boolean} email - if input should be an email
 * @returns {boolean}
 */
export const checkInput = (input, email=false) => {
    const rex = (email) ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ : /\w{4,20}/
    const match = input.match(rex);
    if (match) {
            return match[0] === input;
    } else {
        return false;
    }
};