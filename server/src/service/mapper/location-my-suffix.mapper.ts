import { LocationEntity } from '../../domain/location-my-suffix.entity';
import { LocationDTO } from '../dto/location-my-suffix.dto';

/**
 * A Location mapper object.
 */
export class LocationMapper {
    static fromDTOtoEntity(entityDTO: LocationDTO): LocationEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new LocationEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: LocationEntity): LocationDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new LocationDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
