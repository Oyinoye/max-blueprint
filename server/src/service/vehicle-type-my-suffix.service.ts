import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleTypeDTO } from '../service/dto/vehicle-type-my-suffix.dto';
import { VehicleTypeMapper } from '../service/mapper/vehicle-type-my-suffix.mapper';
import { VehicleTypeRepository } from '../repository/vehicle-type-my-suffix.repository';

const relationshipNames = [];

@Injectable()
export class VehicleTypeService {
    logger = new Logger('VehicleTypeService');

    constructor(@InjectRepository(VehicleTypeRepository) private vehicleTypeEntityRepository: VehicleTypeRepository) {}

    async findById(id: number): Promise<VehicleTypeDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.vehicleTypeEntityRepository.findOne(id, options);
        return VehicleTypeMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<VehicleTypeDTO>): Promise<VehicleTypeDTO | undefined> {
        const result = await this.vehicleTypeEntityRepository.findOne(options);
        return VehicleTypeMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<VehicleTypeDTO>): Promise<[VehicleTypeDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.vehicleTypeEntityRepository.findAndCount(options);
        const vehicleTypeEntityDTO: VehicleTypeDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(vehicleTypeEntity =>
                vehicleTypeEntityDTO.push(VehicleTypeMapper.fromEntityToDTO(vehicleTypeEntity)),
            );
            resultList[0] = vehicleTypeEntityDTO;
        }
        return resultList;
    }

    async save(vehicleTypeEntityDTO: VehicleTypeDTO, creator?: string): Promise<VehicleTypeDTO | undefined> {
        const entity = VehicleTypeMapper.fromDTOtoEntity(vehicleTypeEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.vehicleTypeEntityRepository.save(entity);
        return VehicleTypeMapper.fromEntityToDTO(result);
    }

    async update(vehicleTypeEntityDTO: VehicleTypeDTO, updater?: string): Promise<VehicleTypeDTO | undefined> {
        const entity = VehicleTypeMapper.fromDTOtoEntity(vehicleTypeEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.vehicleTypeEntityRepository.save(entity);
        return VehicleTypeMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.vehicleTypeEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
