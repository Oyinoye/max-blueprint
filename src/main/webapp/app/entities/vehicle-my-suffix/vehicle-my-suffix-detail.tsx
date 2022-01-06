import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vehicle-my-suffix.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVehicleMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMySuffixDetail = (props: IVehicleMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { vehicleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vehicleDetailsHeading">
          <Translate contentKey="maxApp.vehicle.detail.title">Vehicle</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.id}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="maxApp.vehicle.description">Description</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.description}</dd>
          <dt>
            <span id="plateNumber">
              <Translate contentKey="maxApp.vehicle.plateNumber">Plate Number</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.plateNumber}</dd>
          <dt>
            <span id="model">
              <Translate contentKey="maxApp.vehicle.model">Model</Translate>
            </span>
          </dt>
          <dd>{vehicleEntity.model}</dd>
          <dt>
            <span id="photo">
              <Translate contentKey="maxApp.vehicle.photo">Photo</Translate>
            </span>
          </dt>
          <dd>
            {vehicleEntity.photo ? (
              <div>
                {vehicleEntity.photoContentType ? (
                  <a onClick={openFile(vehicleEntity.photoContentType, vehicleEntity.photo)}>
                    <img src={`data:${vehicleEntity.photoContentType};base64,${vehicleEntity.photo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {vehicleEntity.photoContentType}, {byteSize(vehicleEntity.photo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="maxApp.vehicle.vehicleType">Vehicle Type</Translate>
          </dt>
          <dd>{vehicleEntity.vehicleType ? vehicleEntity.vehicleType.code : ''}</dd>
          <dt>
            <Translate contentKey="maxApp.vehicle.location">Location</Translate>
          </dt>
          <dd>{vehicleEntity.location ? vehicleEntity.location.code : ''}</dd>
        </dl>
        <Button tag={Link} to="/vehicle-my-suffix" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vehicle-my-suffix/${vehicleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ vehicle }: IRootState) => ({
  vehicleEntity: vehicle.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMySuffixDetail);
