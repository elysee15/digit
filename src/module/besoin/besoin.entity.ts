import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { Status } from "../projet-de-mission/projet-de-mission.model";
import { Priorite } from "./besoin.priorite";
import { ProspectionEntity } from "../prospection/prospection.entity";
import { FamilleDeMissionEntity } from "../famille-de-mission/famille-de-mission.entity";
import { ProjetDeMissionEntity } from "../projet-de-mission/projet-de-mission.entity";
import {
  IsString,
  IsEnum,
  IsOptional,
  MaxLength,
  IsNotEmpty
} from "class-validator";

@Entity("besoin")
export class BesoinEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @IsNotEmpty({ message: "Le libellé est obligatoire" })
  @MaxLength(191, { message: "Le nombre de caractère ne doit pas excéder 191" })
  @IsString({ message: "Le libellé doit être de type string" })
  @Column({ type: "varchar", length: 191, nullable: true })
  private label: string;

  /*   @IsString({message: "La description doit être de type string"}) */
  @Column({ type: "text", nullable: true })
  private description: string;

  @IsOptional()
  @Column({ type: "varchar", length: 191, nullable: true })
  private tag: string;

  @IsEnum(Status, { message: "Le status doit être 'EN COURS' ou 'EN ATTENTE'" })
  @Column({
    type: "enum",
    enum: Status,
    default: Status.IN_PROGRESS,
    nullable: true
  })
  private status: Status;

  @Column({ type: "text", nullable: true })
  private conclusion: string;

  @IsEnum(Priorite, {
    message: "La priorité doit être 'Forte' 'Moyenne' 'Faible'"
  })
  @Column({
    type: "enum",
    enum: Priorite,
    default: Priorite.Forte,
    nullable: true
  })
  private priorite: Priorite;

  @CreateDateColumn({ name: "created_at", nullable: true })
  private createdAt: Date;

  @CreateDateColumn({ name: "updated_at", nullable: true })
  private updatedAt: Date;

  @IsString()
  @Column({ name: "created_by", type: "varchar", length: 100, nullable: true })
  private createdBy: string;

  @Column({ name: "updated_by", type: "varchar", length: 100, nullable: true })
  private updatedBy: string;

  @ManyToOne(type => ProspectionEntity, { eager: true, nullable: true })
  private prospection: ProspectionEntity;

  @ManyToOne(type => FamilleDeMissionEntity, { eager: true, nullable: true })
  private familleDeMission: FamilleDeMissionEntity;

  @ManyToOne(type => ProjetDeMissionEntity, { eager: true, nullable: true })
  private projetDeMission: ProjetDeMissionEntity;

  //-------------------------------------------------------------

  public setId(id: number) {
    this.id = id;
  }
  public getId(): number {
    return this.id;
  }

  public setLabel(label: string) {
    this.label = label;
  }
  public getLabel(): string {
    return this.label;
  }

  public setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setPriorite(priorite: Priorite) {
    this.priorite = priorite;
  }
  public getPriorie(): Priorite {
    return this.priorite;
  }

  public setConclusion(conclusion: string) {
    this.conclusion = conclusion;
  }
  public getConclusion(): string {
    return this.conclusion;
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
