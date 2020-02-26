import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn
} from "typeorm";
import { AnnexeEntity } from "../annexe/annexe.entity";
import { ProjetDeMissionEntity } from "../projet-de-mission/projet-de-mission.entity";
import { PlaningEntity } from "../planing/planing.entity";
import { BudgetEntity } from "../budget/budget.entity";
import { Etat } from "./offre-de-mission.state";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

@Entity("offre_de_mission")
export class OffreDeMissionEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @IsNotEmpty({ message: "Le contexte est obligatoire" })
  @IsString({ message: "Le champs doit être de type string" })
  @Column({ type: "text", nullable: true })
  private context: string;

  @Column({ type: "text", nullable: true })
  private methodology: string;

  @IsEnum(Etat, {
    message: "L'etat doit être 'A envoyer' ou 'A ne pas envoyer'"
  })
  @Column({ type: "enum", enum: Etat, default: Etat.TO_SEND, nullable: true })
  private state: Etat;

  @CreateDateColumn({ name: "created_at", nullable: true })
  private createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
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

  @ManyToOne(type => AnnexeEntity, { eager: true, nullable: true })
  private annexe: AnnexeEntity;

  @ManyToOne(type => ProjetDeMissionEntity, { eager: true, nullable: true })
  private projet_de_mission: ProjetDeMissionEntity;

  @ManyToOne(type => PlaningEntity, { eager: true, nullable: true })
  private planing: PlaningEntity;

  @ManyToOne(type => BudgetEntity, { eager: true, nullable: true })
  private budget: BudgetEntity;

  public setContexte(context: string) {
    this.context = context;
  }
  public getContexte(): string {
    return this.context;
  }

  public setMethodologie(methodology: string) {
    this.methodology = methodology;
  }
  public getMethodologie(): string {
    return this.methodology;
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
