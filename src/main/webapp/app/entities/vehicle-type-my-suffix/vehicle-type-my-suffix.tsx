// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vehicle-type-my-suffix.reducer';
import { IVehicleTypeMySuffix } from 'app/shared/model/vehicle-type-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleTypeMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const VehicleTypeMySuffix = (props: IVehicleTypeMySuffixProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { vehicleTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="vehicle-type-my-suffix-heading" data-cy="VehicleTypeHeading">
        <Translate contentKey="maxApp.vehicleType.home.title">Vehicle Types</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="maxApp.vehicleType.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="maxApp.vehicleType.home.createLabel">Create new Vehicle Type</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vehicleTypeList && vehicleTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="maxApp.vehicleType.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.vehicleType.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.vehicleType.description">Description</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vehicleTypeList.map((vehicleType, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${vehicleType.id}`} color="link" size="sm">
                      {vehicleType.id}
                    </Button>
                  </td>
                  <td>{vehicleType.code}</td>
                  <td>{vehicleType.description}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${vehicleType.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleType.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${vehicleType.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="maxApp.vehicleType.home.notFound">No Vehicle Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ vehicleType }: IRootState) => ({
  vehicleTypeList: vehicleType.entities,
  loading: vehicleType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleTypeMySuffix);
