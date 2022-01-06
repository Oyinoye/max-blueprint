import { VehicleEntity } from '../../domain/vehicle-my-suffix.entity';
import { VehicleDTO } from '../dto/vehicle-my-suffix.dto';

/**
 * A Vehicle mapper object.
 */
export class VehicleMapper {
    static fromDTOtoEntity(entityDTO: VehicleDTO): VehicleEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new VehicleEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: VehicleEntity): VehicleDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new VehicleDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
