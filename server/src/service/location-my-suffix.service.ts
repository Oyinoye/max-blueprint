import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { LocationDTO } from '../service/dto/location-my-suffix.dto';
import { LocationMapper } from '../service/mapper/location-my-suffix.mapper';
import { LocationRepository } from '../repository/location-my-suffix.repository';

const relationshipNames = [];

@Injectable()
export class LocationService {
    logger = new Logger('LocationService');

    constructor(@InjectRepository(LocationRepository) private locationEntityRepository: LocationRepository) {}

    async findById(id: number): Promise<LocationDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.locationEntityRepository.findOne(id, options);
        return LocationMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<LocationDTO>): Promise<LocationDTO | undefined> {
        const result = await this.locationEntityRepository.findOne(options);
        return LocationMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<LocationDTO>): Promise<[LocationDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.locationEntityRepository.findAndCount(options);
        const locationEntityDTO: LocationDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(locationEntity =>
                locationEntityDTO.push(LocationMapper.fromEntityToDTO(locationEntity)),
            );
            resultList[0] = locationEntityDTO;
        }
        return resultList;
    }

    async save(locationEntityDTO: LocationDTO, creator?: string): Promise<LocationDTO | undefined> {
        const entity = LocationMapper.fromDTOtoEntity(locationEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.locationEntityRepository.save(entity);
        return LocationMapper.fromEntityToDTO(result);
    }

    async update(locationEntityDTO: LocationDTO, updater?: string): Promise<LocationDTO | undefined> {
        const entity = LocationMapper.fromDTOtoEntity(locationEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.locationEntityRepository.save(entity);
        return LocationMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.locationEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
