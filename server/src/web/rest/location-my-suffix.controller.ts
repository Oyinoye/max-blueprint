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
import { LocationDTO } from '../../service/dto/location-my-suffix.dto';
import { LocationService } from '../../service/location-my-suffix.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/locations')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('locations')
export class LocationController {
    logger = new Logger('LocationController');

    constructor(private readonly locationEntityService: LocationService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: LocationDTO,
    })
    async getAll(@Req() req: Request): Promise<LocationDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.locationEntityService.findAndCount({
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
        type: LocationDTO,
    })
    async getOne(@Param('id') id: number): Promise<LocationDTO> {
        return await this.locationEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create locationEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: LocationDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() locationEntityDTO: LocationDTO): Promise<LocationDTO> {
        const created = await this.locationEntityService.save(locationEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Location', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update locationEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: LocationDTO,
    })
    async put(@Req() req: Request, @Body() locationEntityDTO: LocationDTO): Promise<LocationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Location', locationEntityDTO.id);
        return await this.locationEntityService.update(locationEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update locationEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: LocationDTO,
    })
    async putId(@Req() req: Request, @Body() locationEntityDTO: LocationDTO): Promise<LocationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Location', locationEntityDTO.id);
        return await this.locationEntityService.update(locationEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete locationEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Location', id);
        return await this.locationEntityService.deleteById(id);
    }
}
