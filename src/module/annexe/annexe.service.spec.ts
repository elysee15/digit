import {AnnexeService} from "./annexe.service";
import { Test} from "@nestjs/testing";
import {AnnexeRepository} from "./annexe.repository";
import {NotFoundException} from "@nestjs/common";

const mockAnnexeRepository = () => ({
    findAll: jest.fn(() => true),
    findById: jest.fn(() => true),
    created: jest.fn(() => true),
    deleted: jest.fn(() => true),
    updated: jest.fn(() => true),
});

const mockAnnexe = { id: 1, label: "My object label"};

describe('AnnexeService', () => {
    let annexeService;
    let annexeRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers : [
                AnnexeService,
                {
                    provide: AnnexeRepository, useFactory: mockAnnexeRepository
                }
            ],
        }).compile();
        annexeService = await module.get<AnnexeService>(AnnexeService);
        annexeRepository = await module.get<AnnexeRepository>(AnnexeRepository);
    });

    describe('getAllAnnexe', () => {
        it('should get all annexe from the repository', async  () => {
            annexeRepository.findAll.mockResolvedValue('Object');
            expect(annexeRepository.findAll).not.toHaveBeenCalled();

            const result = await annexeService.getAll();
            expect(annexeRepository.findAll).toHaveBeenCalled();
            expect(result).toEqual('Object');
        });
    });

    describe('getById', () => {
        it('should call annexRepository.findById(), successfully retrieve and returns annexe', async  () => {

            annexeRepository.findById.mockResolvedValue(mockAnnexe); //value we must get

            const result = await annexeService.getById(1);
            expect(annexeRepository.findById).toHaveBeenCalledWith(mockAnnexe.id);
            expect(result).toEqual(mockAnnexe);
        });

        it('should throw an error if annexe not found',  () => {
            annexeRepository.findById.mockResolvedValue(null);
            expect(annexeService.getById(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('creating', () => {

        it('should call annexeRepository.create and return annexe object',  async  () => {
            annexeRepository.created.mockResolvedValue(mockAnnexe); // value we must get

            expect(annexeRepository.created).not.toHaveBeenCalled(); // return true
            const result = await annexeService.creating(mockAnnexe);
            expect(annexeRepository.created).toHaveBeenCalledWith(mockAnnexe);
            expect(result).toEqual(mockAnnexe);
        });
    });

    describe('updating annexe',  () => {

        it('should call annexeRepository.updated ', async function () {
            annexeRepository.findById.mockResolvedValue(mockAnnexe);

            expect(annexeRepository.findById).not.toHaveBeenCalled();
            expect(annexeRepository.updated).not.toHaveBeenCalled();

            const result = await annexeService.updating(2, mockAnnexe);
            expect(annexeRepository.findById).toHaveBeenCalledWith(2);
            expect(annexeRepository.updated).toHaveBeenCalledWith(2,mockAnnexe);

            expect(result).toEqual(mockAnnexe);


        });
    });



    describe('deleting',  () => {
        it('should call annexeRepository.deleted to delete a task', async  () => {
            annexeRepository.deleted.mockResolvedValue(mockAnnexe);

            expect(annexeRepository.findById).not.toHaveBeenCalled();
            const result = await annexeService.deleting(mockAnnexe.id);
            expect(annexeRepository.findById).toHaveBeenCalledWith(mockAnnexe.id);
            expect(annexeRepository.deleted).toHaveBeenCalled();
            expect(result).toEqual(mockAnnexe);
        });

        it('should throw an error if annexe does not found',   () => {
            annexeRepository.findById.mockResolvedValue(null);
            expect(annexeService.deleting(1)).rejects.toThrow(NotFoundException);
        });
    })
});
