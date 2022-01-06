/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * Different type of Locations
 */
@Entity('vehicle_type')
export class VehicleTypeEntity extends BaseEntity {
    @Column({ name: 'code', nullable: true })
    code: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
