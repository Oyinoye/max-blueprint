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
import { VehicleDTO } from '../../service/dto/vehicle-my-suffix.dto';
import { VehicleService } from '../../service/vehicle-my-suffix.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vehicles')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('vehicles')
export class VehicleController {
    logger = new Logger('VehicleController');

    constructor(private readonly vehicleEntityService: VehicleService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: VehicleDTO,
    })
    async getAll(@Req() req: Request): Promise<VehicleDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.vehicleEntityService.findAndCount({
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
        type: VehicleDTO,
    })
    async getOne(@Param('id') id: number): Promise<VehicleDTO> {
        return await this.vehicleEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create vehicleEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: VehicleDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() vehicleEntityDTO: VehicleDTO): Promise<VehicleDTO> {
        const created = await this.vehicleEntityService.save(vehicleEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Vehicle', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update vehicleEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: VehicleDTO,
    })
    async put(@Req() req: Request, @Body() vehicleEntityDTO: VehicleDTO): Promise<VehicleDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Vehicle', vehicleEntityDTO.id);
        return await this.vehicleEntityService.update(vehicleEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update vehicleEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: VehicleDTO,
    })
    async putId(@Req() req: Request, @Body() vehicleEntityDTO: VehicleDTO): Promise<VehicleDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Vehicle', vehicleEntityDTO.id);
        return await this.vehicleEntityService.update(vehicleEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete vehicleEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Vehicle', id);
        return await this.vehicleEntityService.deleteById(id);
    }
}
