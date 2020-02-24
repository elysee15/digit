import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { Status } from "./prospect.status";
import { ManagerEntity } from "../manager/manager.entity";
import {
  IsEmail,
  IsInt,
  IsAlphanumeric,
  IsString,
  IsEnum,
  IsOptional
} from "class-validator";

@Entity("prospect")
export class ProspectEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @IsAlphanumeric()
  @Column({ type: "varchar", length: "30", nullable: true })
  private codeProspect: string;

  @IsInt()
  @Column({ type: "int", nullable: true })
  private typeSociete: number;

  @IsString()
  @Column({
    name: "raison_sociale",
    type: "varchar",
    length: 191,
    nullable: true
  })
  private raisonSociale: string;

  @IsEmail()
  @Column({ type: "varchar", length: 191, nullable: true })
  private email: string;

  @IsString()
  @Column({ type: "varchar", length: 191, nullable: true })
  private country: string;

  @IsString()
  @Column({ type: "varchar", length: 191, nullable: true })
  private city: string;

  @IsString()
  @Column({ type: "varchar", length: 100, nullable: true })
  private phone: string;

  @IsString()
  @Column({ type: "varchar", length: 100, nullable: true })
  private acronym: string;

  @IsEnum(Status)
  @Column({
    type: "enum",
    enum: Status,
    default: Status.IN_PROGRESS,
    nullable: true
  })
  private status: Status;

  @CreateDateColumn({ name: "created_at", nullable: true })
  private createdAt: Date;

  @CreateDateColumn({ name: "updated_at", nullable: true })
  private updatedAt: Date;

  @Column({ name: "created_by", type: "varchar", length: 100, nullable: true })
  private createdBy: string;

  @Column({ name: "updated_by", type: "varchar", length: 100, nullable: true })
  private updatedBy: string;

  @ManyToOne(type => ManagerEntity, { eager: true, nullable: true })
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

  public setPays(country: string) {
    this.country = country;
  }
  public getPays(): string {
    return this.country;
  }

  public setVille(city: string) {
    this.city = city;
  }
  public getVille(): string {
    return this.city;
  }

  public setSigle(acronym: string) {
    this.acronym = acronym;
  }
  public getSigle(): string {
    return this.acronym;
  }

  public setTelephone(phone: string) {
    this.phone = phone;
  }
  public getTelephone(): string {
    return this.phone;
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

  public setCreatedBy(createdBy: string) {
    this.createdBy = createdBy;
  }
  public getCreatedBy(): string {
    return this.createdBy;
  }

  public setUpdatedBy(updatedBy: string) {
    this.updatedBy = updatedBy;
  }

  public getUpdatedBy(): string {
    return this.updatedBy;
  }
}
