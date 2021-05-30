import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DashBoard from '../component/DashBoard';
import Login from '../component/Login';
import ROUTES from './Static'
import { ProtectedRoutes, PublicRoutes } from './ProtectedRoutes'
import NotFound from '../component/NotFound';



import React from 'react'

function RoutesComponent() {
    return (
        <>
            <Router>
                <Switch>
                    <PublicRoutes exact path={ROUTES.login} component={Login} />
                    <ProtectedRoutes exact path={ROUTES.dashboard} component={DashBoard} />
                    <Route exact path={ROUTES.notFound} component={NotFound} />
                </Switch>
            </Router>
        </>
    )
}

export default RoutesComponent
