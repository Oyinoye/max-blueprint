import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleController } from '../web/rest/vehicle-my-suffix.controller';
import { VehicleRepository } from '../repository/vehicle-my-suffix.repository';
import { VehicleService } from '../service/vehicle-my-suffix.service';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleRepository])],
    controllers: [VehicleController],
    providers: [VehicleService],
    exports: [VehicleService],
})
export class VehicleModule {}
