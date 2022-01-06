import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { setFileData, openFile, byteSize, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVehicleTypeMySuffix } from 'app/shared/model/vehicle-type-my-suffix.model';
import { getEntities as getVehicleTypes } from 'app/entities/vehicle-type-my-suffix/vehicle-type-my-suffix.reducer';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { getEntities as getLocations } from 'app/entities/location-my-suffix/location-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './vehicle-my-suffix.reducer';
import { IVehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVehicleMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VehicleMySuffixUpdate = (props: IVehicleMySuffixUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { vehicleEntity, vehicleTypes, locations, loading, updating } = props;

  const { photo, photoContentType } = vehicleEntity;

  const handleClose = () => {
    props.history.push('/vehicle-my-suffix' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getVehicleTypes();
    props.getLocations();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...vehicleEntity,
        ...values,
        vehicleType: vehicleTypes.find(it => it.id.toString() === values.vehicleTypeId.toString()),
        location: locations.find(it => it.id.toString() === values.locationId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="maxApp.vehicle.home.createOrEditLabel" data-cy="VehicleCreateUpdateHeading">
            <Translate contentKey="maxApp.vehicle.home.createOrEditLabel">Create or edit a Vehicle</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : vehicleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="vehicle-my-suffix-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="vehicle-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descriptionLabel" for="vehicle-my-suffix-description">
                  <Translate contentKey="maxApp.vehicle.description">Description</Translate>
                </Label>
                <AvField id="vehicle-my-suffix-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="plateNumberLabel" for="vehicle-my-suffix-plateNumber">
                  <Translate contentKey="maxApp.vehicle.plateNumber">Plate Number</Translate>
                </Label>
                <AvField id="vehicle-my-suffix-plateNumber" data-cy="plateNumber" type="text" name="plateNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="modelLabel" for="vehicle-my-suffix-model">
                  <Translate contentKey="maxApp.vehicle.model">Model</Translate>
                </Label>
                <AvField id="vehicle-my-suffix-model" data-cy="model" type="text" name="model" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="photoLabel" for="photo">
                    <Translate contentKey="maxApp.vehicle.photo">Photo</Translate>
                  </Label>
                  <br />
                  {photo ? (
                    <div>
                      {photoContentType ? (
                        <a onClick={openFile(photoContentType, photo)}>
                          <img src={`data:${photoContentType};base64,${photo}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {photoContentType}, {byteSize(photo)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('photo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_photo" data-cy="photo" type="file" onChange={onBlobChange(true, 'photo')} accept="image/*" />
                  <AvInput type="hidden" name="photo" value={photo} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-my-suffix-vehicleType">
                  <Translate contentKey="maxApp.vehicle.vehicleType">Vehicle Type</Translate>
                </Label>
                <AvInput
                  id="vehicle-my-suffix-vehicleType"
                  data-cy="vehicleType"
                  type="select"
                  className="form-control"
                  name="vehicleTypeId"
                >
                  <option value="" key="0" />
                  {vehicleTypes
                    ? vehicleTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.code}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="vehicle-my-suffix-location">
                  <Translate contentKey="maxApp.vehicle.location">Location</Translate>
                </Label>
                <AvInput id="vehicle-my-suffix-location" data-cy="location" type="select" className="form-control" name="locationId">
                  <option value="" key="0" />
                  {locations
                    ? locations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.code}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/vehicle-my-suffix" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  vehicleTypes: storeState.vehicleType.entities,
  locations: storeState.location.entities,
  vehicleEntity: storeState.vehicle.entity,
  loading: storeState.vehicle.loading,
  updating: storeState.vehicle.updating,
  updateSuccess: storeState.vehicle.updateSuccess,
});

const mapDispatchToProps = {
  getVehicleTypes,
  getLocations,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMySuffixUpdate);
