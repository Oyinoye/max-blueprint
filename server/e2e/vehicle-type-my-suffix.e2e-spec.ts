import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { VehicleTypeDTO } from '../src/service/dto/vehicle-type-my-suffix.dto';
import { VehicleTypeService } from '../src/service/vehicle-type-my-suffix.service';

describe('VehicleType Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(VehicleTypeService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all vehicle-types ', async () => {
        const getEntities: VehicleTypeDTO[] = (
            await request(app.getHttpServer())
                .get('/api/vehicle-types')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET vehicle-types by id', async () => {
        const getEntity: VehicleTypeDTO = (
            await request(app.getHttpServer())
                .get('/api/vehicle-types/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create vehicle-types', async () => {
        const createdEntity: VehicleTypeDTO = (
            await request(app.getHttpServer())
                .post('/api/vehicle-types')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update vehicle-types', async () => {
        const updatedEntity: VehicleTypeDTO = (
            await request(app.getHttpServer())
                .put('/api/vehicle-types')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update vehicle-types from id', async () => {
        const updatedEntity: VehicleTypeDTO = (
            await request(app.getHttpServer())
                .put('/api/vehicle-types/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE vehicle-types', async () => {
        const deletedEntity: VehicleTypeDTO = (
            await request(app.getHttpServer())
                .delete('/api/vehicle-types/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
