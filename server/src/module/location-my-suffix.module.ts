import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from '../web/rest/location-my-suffix.controller';
import { LocationRepository } from '../repository/location-my-suffix.repository';
import { LocationService } from '../service/location-my-suffix.service';

@Module({
    imports: [TypeOrmModule.forFeature([LocationRepository])],
    controllers: [LocationController],
    providers: [LocationService],
    exports: [LocationService],
})
export class LocationModule {}
