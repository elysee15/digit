import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ManagerEntity } from './manager.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@EntityRepository(ManagerEntity)
export class ManagerRepository extends Repository<ManagerEntity> {
    constructor(
        @InjectRepository(ManagerEntity)
        private readonly managerRepository: Repository<ManagerEntity>,
    ) {
        super();
    }

    findAll() {
        return this.managerRepository.find();
    }

    findById(managerId: number) {
        return this.managerRepository.findOne(managerId);
    }

    created(managerDto: ManagerEntity) {
        return this.managerRepository.save(managerDto);
    }

    updated(managerId: number, managerDto: ManagerEntity) {
        return this.managerRepository.update(managerId, managerDto);
    }

    deleted(managerDto) {
        return this.managerRepository.remove(managerDto);
    }
}
