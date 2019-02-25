import React from 'react';
import { Layout } from 'td-ui';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

/**
 * 路由
 */
@withRouter
export default class Content extends React.PureComponent {
  render() {
    return (
      <Layout.Content className="file-sim-front-content">
      <Route exact path="/" render={() => <Redirect to="/homepage" />} />
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
      </Layout.Content>
    );
  }
}
