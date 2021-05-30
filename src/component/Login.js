
import React, { useState, useEffect } from 'react'
import FacebookLogin from 'react-facebook-login'
import { useHistory } from 'react-router'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ROUTES from '../routes/Static'
import { useSelector, useDispatch } from 'react-redux';
import { actionType } from '../redux/action/index';




function Login(props) {
    const [isLogin, setIsLogin] = useState('')


    const history = useHistory()
    const responseFacebook = (response) => {
        if (!!response['accessToken']) {
            setIsLogin(response['accessToken'])
            localStorage.setItem('loginData', JSON.stringify(response));
            localStorage.setItem('isLogin',response['accessToken']);
            history.push(ROUTES.dashboard);
        } else {
            alert('please fill creadentials');
        }
    }

    return (
        <>
            <div className="login_wrapper">
                <div className="reg_outer">
                    <h2>Login</h2>
                    <p>Please signup with Facebook for Spacex DashBoard</p>
                    <FacebookLogin className="Login_btn"
                        appId="4056865221019381"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook} />
                </div>
            </div>
        </>
    )
}

export default Login
