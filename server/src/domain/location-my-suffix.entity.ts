/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * This defines different Location
 */
@Entity('location')
export class LocationEntity extends BaseEntity {
    @Column({ name: 'code', nullable: true })
    code: string;

    @Column({ name: 'description', nullable: true })
    description: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
