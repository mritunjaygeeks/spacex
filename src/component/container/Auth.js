

/**
 * @author Mritunjay kumar pandey
 * @description  This method checks to see if the user is authenticated or not
 * @return {Boolean} status validity of form
 */

export const isAuthenticated = () => {
    const isAuthenticated = localStorage.getItem('isLogin');
    if (!!isAuthenticated) {
        return true;
    } else {
        return false;
    }
};


/**
 * @author Mritunjay kumar pandey
 * @description  This method logs out the customer
 * @return {Boolean} result
 */

export const Logout = (history) => {
    localStorage.removeItem('loginData')
    localStorage.removeItem('isLogin')
    history.push('/');

};