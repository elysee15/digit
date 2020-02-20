import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { Status, Type } from "./prospection.status";
import { ProspectEntity } from "../prospect/prospect.entity";

@Entity("prospection")
export class ProspectionEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ type: "varchar", length: 191, nullable: true })
  private libelle: string;

  @Column({
    name: "code_prospection",
    type: "varchar",
    length: 30,
    nullable: true
  })
  private codeProspection: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.IN_PROGRESS,
    nullable: true
  })
  private status: Status;

  @Column({ type: "enum", enum: Type, default: Type.PROSPECT, nullable: true })
  private type: Type;

  @CreateDateColumn({ name: "created_at", nullable: true })
  private createdAt: Date;

  @CreateDateColumn({ name: "updated_at", nullable: true })
  private updatedAt: Date;

  @Column({ name: "created_by", type: "varchar", length: 100, nullable: true })
  private createdBy: string;

  @Column({ name: "updated_by", type: "varchar", length: 100, nullable: true })
  private updatedBy: string;

  @ManyToOne(type => ProspectEntity, { eager: true, nullable: true })
  private prospect: ProspectEntity;

  // -------------------------------------------------------------

  public setId(id: number) {
    this.id = id;
  }
  public getId(): number {
    return this.id;
  }

  public setLibelle(libelle: string) {
    this.libelle = libelle;
  }
  public getLibelle(): string {
    return this.libelle;
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

  public setCodeProspection(codeProspection: string) {
    this.codeProspection = codeProspection;
  }
  public getCodeProspection(): string {
    return this.codeProspection;
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
