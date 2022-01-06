import { EntityRepository, Repository } from 'typeorm';
import { LocationEntity } from '../domain/location-my-suffix.entity';

@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {}
