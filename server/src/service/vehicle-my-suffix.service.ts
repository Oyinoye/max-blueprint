import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleDTO } from '../service/dto/vehicle-my-suffix.dto';
import { VehicleMapper } from '../service/mapper/vehicle-my-suffix.mapper';
import { VehicleRepository } from '../repository/vehicle-my-suffix.repository';

const relationshipNames = [];
relationshipNames.push('vehicleType');
relationshipNames.push('location');

@Injectable()
export class VehicleService {
    logger = new Logger('VehicleService');

    constructor(@InjectRepository(VehicleRepository) private vehicleEntityRepository: VehicleRepository) {}

    async findById(id: number): Promise<VehicleDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.vehicleEntityRepository.findOne(id, options);
        return VehicleMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<VehicleDTO>): Promise<VehicleDTO | undefined> {
        const result = await this.vehicleEntityRepository.findOne(options);
        return VehicleMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<VehicleDTO>): Promise<[VehicleDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.vehicleEntityRepository.findAndCount(options);
        const vehicleEntityDTO: VehicleDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(vehicleEntity => vehicleEntityDTO.push(VehicleMapper.fromEntityToDTO(vehicleEntity)));
            resultList[0] = vehicleEntityDTO;
        }
        return resultList;
    }

    async save(vehicleEntityDTO: VehicleDTO, creator?: string): Promise<VehicleDTO | undefined> {
        const entity = VehicleMapper.fromDTOtoEntity(vehicleEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.vehicleEntityRepository.save(entity);
        return VehicleMapper.fromEntityToDTO(result);
    }

    async update(vehicleEntityDTO: VehicleDTO, updater?: string): Promise<VehicleDTO | undefined> {
        const entity = VehicleMapper.fromDTOtoEntity(vehicleEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.vehicleEntityRepository.save(entity);
        return VehicleMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.vehicleEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
