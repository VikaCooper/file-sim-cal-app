import React from 'react';
import {Layout} from 'td-ui';
import {Route, Redirect, withRouter} from 'react-router-dom';
import Loadable from 'react-loadable';

/**
 * 路由
 */
@withRouter
export default class Content extends React.PureComponent {
    render() {
        return (
            <Layout.Content className="file-sim-front-content">
                <Route exact path="/" render={() => <Redirect to="/homepage"/>}/>
                <Route
                    exact
                    path="/homepage"
                    render={props => {
                        const LazyRoute = Loadable({
                            loader: () => import("../pages/homepage"),
                            loading: () => null,
                        })
                        return <LazyRoute {...props} />
                    }}
                />
                <Route
                    exact
                    path="/tooluse"
                    render={props => {
                        const LazyRoute = Loadable({
                            loader: () => import("../pages/toolUse"),
                            loading: () => null,
                        })
                        return <LazyRoute {...props} />
                    }}
                />
                <Route
                    exact
                    path="/quicklearn"
                    render={props => {
                        const LazyRoute = Loadable({
                            loader: () => import("../pages/quicklearn"),
                            loading: () => null,
                        })
                        return <LazyRoute {...props} />
                    }}
                />
                <Route
                    exact
                    path="/updatelog"
                    render={props => {
                        const LazyRoute = Loadable({
                            loader: () => import("../pages/updatelog"),
                            loading: () => null,
                        })
                        return <LazyRoute {...props} />
                    }}
                />
                <Route
                    exact
                    path="/tooldetail"
                    render={props => {
                        const LazyRoute = Loadable({
                            loader: () => import("../pages/tooldetail"),
                            loading: () => null,
                        })
                        return <LazyRoute {...props} />
                    }}
                />
                <Route
                    exact
                    path="/loggin"
                    render={props => {
                        const LazyRoute = Loadable({
                            loader: () => import("../pages/loggin"),
                            loading: () => null,
                        })
                        return <LazyRoute {...props} />
                    }}
                />
                <Route
                    exact
                    path="/resultPage"
                    render={props => {
                        const LazyRoute = Loadable({
                            loader: () => import("../pages/resultPage"),
                            loading: () => null,
                        })
                        return <LazyRoute {...props} />
                    }}
                />
            </Layout.Content>
        );
    }
}
