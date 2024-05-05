import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthLayout from '../../components/Auth/AuthLayout'
import Login from './Login';
import Logout from './Logout';
import Register from './Register';


const Auth = (props)  => {
        return (
            <AuthLayout isLoading={props.loading}>
            <div>
                <Route path='/auth' exact={true} name='login' component={() => (<Redirect to='/auth/login' />)} />
                <Route path='/auth/login' exact={true} name='login' component={Login} />
                <Route path='/auth/logout' exact={true} name='login' component={Logout} />
                <Route path='/auth/register' exact={true} name='login' component={Register} />
              </div>
            </AuthLayout>
        )
}

export default Auth