import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn
} from "typeorm";
import { ProspectionEntity } from "../prospection/prospection.entity";
import { IsString, IsNotEmpty, IsDefined, MaxLength } from "class-validator";

@Entity("questionnaire")
export class QuestionnaireEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @IsNotEmpty({ message: "Le libellé est obligatoire" })
  @IsString({ message: "Le libellé doit être de type string" })
  @MaxLength(191, {
    message: "Le nombre de caractère ne doit pas excéder plus de 191"
  })
  @Column({ type: "varchar", length: 191, nullable: true })
  private label: string;

  @IsString({ message: "Le champs doit être de type string" })
  @Column({ type: "text", nullable: true })
  private conclusion: string;

  @CreateDateColumn({ name: "created_at", nullable: true })
  private createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  private updatedAt: Date;

  @Column({ name: "created_by", type: "varchar", length: 100, nullable: true })
  private createdBy: string;

  @Column({ name: "updated_by", type: "varchar", length: 100, nullable: true })
  private updatedBy: string;

  @ManyToOne(type => ProspectionEntity, { eager: true, nullable: true })
  private prospection: ProspectionEntity;

  //-------------------------------------------------------------

  public setId(id: number) {
    this.id = id;
  }
  public getId(): number {
    return this.id;
  }

  public setLibelle(libelle: string) {
    this.label = libelle;
  }
  public getLibelle(): string {
    return this.label;
  }

  public setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
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

  public setProspection(prospection: ProspectionEntity) {
    this.prospection = prospection;
  }
  public getProspection(): ProspectionEntity {
    return this.prospection;
  }
}
