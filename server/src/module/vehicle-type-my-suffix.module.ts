import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTypeController } from '../web/rest/vehicle-type-my-suffix.controller';
import { VehicleTypeRepository } from '../repository/vehicle-type-my-suffix.repository';
import { VehicleTypeService } from '../service/vehicle-type-my-suffix.service';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleTypeRepository])],
    controllers: [VehicleTypeController],
    providers: [VehicleTypeService],
    exports: [VehicleTypeService],
})
export class VehicleTypeModule {}
