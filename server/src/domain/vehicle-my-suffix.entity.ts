/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleTypeEntity } from './vehicle-type-my-suffix.entity';
import { LocationEntity } from './location-my-suffix.entity';

/**
 * Vehicle
 */
@Entity('vehicle')
export class VehicleEntity extends BaseEntity {
    @Column({ name: 'description', nullable: true })
    description: string;

    @Column({ name: 'plate_number', nullable: true })
    plateNumber: string;

    @Column({ name: 'model', nullable: true })
    model: string;

    @Column({ type: 'blob', name: 'photo', nullable: true })
    photo: any;

    @Column({ name: 'photo_content_type', nullable: true })
    photoContentType: string;

    @ManyToOne(type => VehicleTypeEntity)
    vehicleType: VehicleTypeEntity;

    @ManyToOne(type => LocationEntity)
    location: LocationEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
