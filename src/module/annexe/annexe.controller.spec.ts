import { Test } from '@nestjs/testing';
import { AnnexeController } from './annexe.controller';
import { AnnexeService } from './annexe.service';
import {AnnexeEntity} from "./annexe.entity";

describe('CatsController', () => {
    let annexeController: AnnexeController;
    let annexeService: AnnexeService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AnnexeController],
            providers: [AnnexeService],
        }).compile();

        annexeService = moduleRef.get<AnnexeService>(AnnexeService);
        annexeController = moduleRef.get<AnnexeController>(AnnexeController);
    });

    describe('findAll', () => {
        it('should return an array of annexe', async () => {
            const annexe = new AnnexeEntity();
            let result: AnnexeEntity[] = [annexe];

            jest.spyOn(annexeService, 'getAll').mockImplementation(async () => {
                return [annexe];
            } );

            expect(await annexeController.getAllAnnexe()).toBe(result);
        });
    });
});
