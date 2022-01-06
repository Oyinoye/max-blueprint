import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { VehicleTypeDTO } from '../../service/dto/vehicle-type-my-suffix.dto';
import { VehicleTypeService } from '../../service/vehicle-type-my-suffix.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicle-types')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicle-types')
export class VehicleTypeController {
    logger = new Logger('VehicleTypeController');

    constructor(private readonly vehicleTypeEntityService: VehicleTypeService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: VehicleTypeDTO,
    })
    async getAll(@Req() req: Request): Promise<VehicleTypeDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.vehicleTypeEntityService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: VehicleTypeDTO,
    })
    async getOne(@Param('id') id: number): Promise<VehicleTypeDTO> {
        return await this.vehicleTypeEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create vehicleTypeEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: VehicleTypeDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() vehicleTypeEntityDTO: VehicleTypeDTO): Promise<VehicleTypeDTO> {
        const created = await this.vehicleTypeEntityService.save(vehicleTypeEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleType', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update vehicleTypeEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: VehicleTypeDTO,
    })
    async put(@Req() req: Request, @Body() vehicleTypeEntityDTO: VehicleTypeDTO): Promise<VehicleTypeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleType', vehicleTypeEntityDTO.id);
        return await this.vehicleTypeEntityService.update(vehicleTypeEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update vehicleTypeEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: VehicleTypeDTO,
    })
    async putId(@Req() req: Request, @Body() vehicleTypeEntityDTO: VehicleTypeDTO): Promise<VehicleTypeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'VehicleType', vehicleTypeEntityDTO.id);
        return await this.vehicleTypeEntityService.update(vehicleTypeEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete vehicleTypeEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'VehicleType', id);
        return await this.vehicleTypeEntityService.deleteById(id);
    }
}
