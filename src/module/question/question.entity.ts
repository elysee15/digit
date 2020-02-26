import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { IsString, IsDefined, IsNotEmpty, MaxLength } from "class-validator";

@Entity("question")
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @IsNotEmpty({ message: "Le libellé est obligatoire" })
  @IsString({ message: "Le libellé doit être de type string" })
  @MaxLength(191, {
    message: "Le libellé ne doit pas excéder plus de 191 caractère"
  })
  @Column({ type: "varchar", length: 191, nullable: true })
  private label: string;

  @IsString()
  @Column({ type: "text", nullable: true })
  private response: string;

  @Column({ type: "text", nullable: true })
  private descriptif: string;

  @CreateDateColumn({ name: "created_at", nullable: true })
  private createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  private updatedAt: Date;

  @Column({ name: "created_by", type: "varchar", length: 100, nullable: true })
  private createdBy: string;

  @Column({ name: "updated_by", type: "varchar", length: 100, nullable: true })
  private updatedBy: string;

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

  public setReponse(reponse: string) {
    this.response = reponse;
  }
  public getReponse(): string {
    return this.response;
  }

  public setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setDescriptif(descriptif: string) {
    this.descriptif = descriptif;
  }
  public getDescriptif(): string {
    return this.descriptif;
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
