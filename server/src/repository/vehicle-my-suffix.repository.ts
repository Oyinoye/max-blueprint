import { EntityRepository, Repository } from 'typeorm';
import { VehicleEntity } from '../domain/vehicle-my-suffix.entity';

@EntityRepository(VehicleEntity)
export class VehicleRepository extends Repository<VehicleEntity> {}
