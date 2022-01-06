import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleTypeMySuffix from './vehicle-type-my-suffix';
import VehicleTypeMySuffixDetail from './vehicle-type-my-suffix-detail';
import VehicleTypeMySuffixUpdate from './vehicle-type-my-suffix-update';
import VehicleTypeMySuffixDeleteDialog from './vehicle-type-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleTypeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleTypeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleTypeMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleTypeMySuffix} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleTypeMySuffixDeleteDialog} />
  </>
);

export default Routes;
