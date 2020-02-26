import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn
} from "typeorm";
import { ProjetDeMissionEntity } from "../projet-de-mission/projet-de-mission.entity";
import { IsString, IsNotEmpty } from "class-validator";

@Entity("mission_attachements")
export class PieceJointeMissionEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @IsNotEmpty({ message: "Le libellé est obligatoire" })
  @IsString({ message: "Le champs doit être de type string" })
  @Column({ type: "varchar", length: 191, nullable: true })
  private label: string;

  @CreateDateColumn({ name: "created_at", nullable: true })
  private createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  private updatedAt: Date;

  @Column({ name: "created_by", type: "varchar", length: 100, nullable: true })
  private createdBy: string;

  @Column({ name: "updated_by", type: "varchar", length: 100, nullable: true })
  private updatedBy: string;

  @ManyToOne(type => ProjetDeMissionEntity, { eager: true, nullable: true })
  private projet: ProjetDeMissionEntity;

  //-------------------------------------------------------------------------

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
