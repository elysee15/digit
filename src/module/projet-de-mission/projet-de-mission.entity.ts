import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";
import { Status, Etat } from "./projet-de-mission.model";
import { IsString, IsEnum } from "class-validator";

@Entity("projet_de_mission")
export class ProjetDeMissionEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @IsString()
  @Column({ type: "text", nullable: true })
  private context: string;

  @IsString()
  @Column({ type: "text", nullable: true })
  private methodology: string;

  @Column({ type: "text", nullable: true })
  private summary: string;

  @IsEnum(Status)
  @Column({
    type: "enum",
    enum: Status,
    default: Status.IN_WAITING,
    nullable: true
  })
  private status: Status;

  @IsEnum(Etat)
  @Column({ type: "enum", enum: Etat, default: Etat.TO_SEND, nullable: true })
  private etat: Etat;

  @CreateDateColumn({ name: "created_at", nullable: true })
  private createdAt: Date;

  @CreateDateColumn({ name: "updated_at", nullable: true })
  private updatedAt: Date;

  @Column({ name: "created_by", type: "varchar", length: 100, nullable: true })
  private createdBy: string;

  @Column({ name: "updated_by", type: "varchar", length: 100, nullable: true })
  private updatedBy: string;

  public setId(id: number) {
    this.id = id;
  }
  public getId(): number {
    return this.id;
  }

  public setContext(context: string) {
    this.context = context;
  }
  public getContext(): string {
    return this.context;
  }

  public setMethodology(methodology: string) {
    this.methodology = methodology;
  }
  public getMethodology(): string {
    return this.methodology;
  }

  public setSummary(summary: string) {
    this.summary = summary;
  }
  public getSummary(): string {
    return this.summary;
  }

  public async setStatus(status: Status) {
    this.status = status;
  }
  public getStatus(): Status {
    return this.status;
  }

  public setEtat(etat: Etat) {
    this.etat = etat;
  }
  public getEtat(): Etat {
    return this.etat;
  }

  public setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
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
