import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";
import { Status, Etat } from "./projet-de-mission.model";

@Entity("projet_de_mission")
export class ProjetDeMissionEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ type: "text", nullable: true })
  private contexte: string;

  @Column({ type: "text", nullable: true })
  private methodologie: string;

  @Column({ type: "text", nullable: true })
  private recapitualtif: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.IN_WAITING,
    nullable: true
  })
  private status: Status;

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

  public setContexte(contexte: string) {
    this.contexte = contexte;
  }
  public getContexte(): string {
    return this.contexte;
  }

  public setMethodologie(methodologie: string) {
    this.methodologie = methodologie;
  }
  public getMethodologie(): string {
    return this.methodologie;
  }

  public setRecapitulatif(recapitulatif: string) {
    this.recapitualtif = recapitulatif;
  }
  public getRecapitulatif(): string {
    return this.recapitualtif;
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
