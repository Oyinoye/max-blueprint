import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleMySuffix from './vehicle-my-suffix';
import VehicleMySuffixDetail from './vehicle-my-suffix-detail';
import VehicleMySuffixUpdate from './vehicle-my-suffix-update';
import VehicleMySuffixDeleteDialog from './vehicle-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleMySuffix} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleMySuffixDeleteDialog} />
  </>
);

export default Routes;
