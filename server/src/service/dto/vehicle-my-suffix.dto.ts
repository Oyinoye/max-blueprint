/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { VehicleTypeDTO } from './vehicle-type-my-suffix.dto';
import { LocationDTO } from './location-my-suffix.dto';

/**
 * A VehicleDTO object.
 */
export class VehicleDTO extends BaseDTO {
    @ApiModelProperty({ description: 'description field', required: false })
    description: string;

    @ApiModelProperty({ description: 'plateNumber field', required: false })
    plateNumber: string;

    @ApiModelProperty({ description: 'model field', required: false })
    model: string;

    @ApiModelProperty({ description: 'photo field', required: false })
    photo: any;

    photoContentType: string;

    @ApiModelProperty({ type: VehicleTypeDTO, description: 'vehicleType relationship' })
    vehicleType: VehicleTypeDTO;

    @ApiModelProperty({ type: LocationDTO, description: 'location relationship' })
    location: LocationDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
