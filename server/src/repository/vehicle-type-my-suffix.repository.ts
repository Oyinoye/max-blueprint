import { EntityRepository, Repository } from 'typeorm';
import { VehicleTypeEntity } from '../domain/vehicle-type-my-suffix.entity';

@EntityRepository(VehicleTypeEntity)
export class VehicleTypeRepository extends Repository<VehicleTypeEntity> {}
