import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Status } from './prospect.status';
import { ManagerEntity } from '../manager/manager.entity';
import { IsEmail, IsInt } from 'class-validator';

@Entity('prospect')
export class ProspectEntity {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ type: 'varchar', length: '30', nullable: true})
    private codeProspect: string;

    @IsInt()
    @Column({ type: 'int', nullable: true})
    private typeSociete: number;

    @Column({ name: 'raison_sociale', type: 'varchar', length: 191, nullable: true })
    private raisonSociale: string;

    @IsEmail()
    @Column({ type: 'varchar', length: 191, nullable: true})
    private email: string;

    @Column({ type: 'varchar', length: 191, nullable: true})
    private pays: string;

    @Column({ type: 'varchar', length: 191, nullable: true})
    private ville: string;

    @Column({ type: 'varchar', length: 100, nullable: true})
    private telephone: string;

    @Column({ type: 'varchar', length: 100, nullable: true})
    private sigle: string;

    @Column({type: 'enum', enum: Status, default: Status.IN_PROGRESS, nullable: true} )
    private status: Status;

    @CreateDateColumn({name: 'created_at', nullable: true})
    private createdAt: Date;

    @CreateDateColumn({name: 'updated_at', nullable: true})
    private updatedAt: Date;

    @Column({name: 'created_by', type: 'varchar', length: 100, nullable: true})
    private createdBy: string;

    @Column({name: 'updated_by', type: 'varchar', length: 100, nullable: true})
    private updatedBy: string;

    @ManyToOne(type => ManagerEntity , { eager: true, nullable: true})
    private manager: ManagerEntity;

    // -------------------------------------------------------------

    public setId(id: number) {
        this.id = id;
    }
    public getId(): number {
        return this.id;
    }

    public setTypeSociete(typeSociete: number) {
        this.typeSociete = typeSociete;
    }
    public getTypeSocieite(): number {
        return this.typeSociete;
    }

    public setEmail(email: string) {
        this.email = email;
    }
    public getEmail(): string {
        return this.email;
    }

    public setPays(pays: string) {
        this.pays = pays;
    }
    public getPays(): string {
        return this.pays;
    }

    public setVille(ville: string) {
        this.ville = ville;
    }
    public getVille(): string {
        return this.ville;
    }

    public setSigle(sigle: string) {
        this.sigle = sigle;
    }
    public getSigle(): string {
        return this.sigle;
    }

    public setTelephone(telephone: string) {
        this.telephone = telephone;
    }
    public getTelephone(): string {
        return this.telephone;
    }

    public setRaisonSociale(raisonSociale: string) {
        this.raisonSociale = raisonSociale;
    }
    public getRaisonSociale(): string {
        return this.raisonSociale;
    }

    public async setStatus(status: Status) {
        this.status = status;
    }
    public getStatus(): Status {
        return this.status;
    }

    public setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCodeProspect(codeProspect: string) {
        this.codeProspect = codeProspect;
    }
    public getCodeprospect(): string {
        return this.codeProspect;
    }

    public setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public setCreatedBy( createdBy: string) {
        this.createdBy = createdBy;
    }
    public getCreatedBy(): string {
        return this.createdBy;
    }

    public setUpdatedBy( updatedBy: string) {
        this.updatedBy = updatedBy;
    }

    public getUpdatedBy(): string {
        return this.updatedBy;
    }
}
