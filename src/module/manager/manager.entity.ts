import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import {
  IsEmail,
  MaxLength,
  IsString,
  IsEnum,
  IsNotEmpty,
  MinLength
} from "class-validator";
import { Civilite } from "./manager.civilite";

@Entity("manager")
export class ManagerEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @IsNotEmpty({ message: "Le nom est obligatoire" })
  @MinLength(0)
  @MaxLength(191, {
    message: "Le nombre de caractère doivent être inférieur où egale à 191"
  })
  @IsString({ message: "Le libellé doit être de type string" })
  @Column({ name: "nom", type: "varchar", length: 191, nullable: true })
  private lastName: string;

  @IsNotEmpty({ message: "Le prénom est obligatoire" })
  @MaxLength(191, {
    message: "Le nombre de caractère doivent être inférieur où egale à 191"
  })
  @IsString({ message: "Le libellé doit être de type string" })
  @Column({ name: "prenoms", type: "varchar", length: 191, nullable: true })
  private firstName: string;

  @Column({ length: 100, nullable: true, type: "varchar" })
  private function: string;

  @IsEmail()
  @MaxLength(50, { message: "L'email est trop longue" })
  @Column({ name: "email", type: "varchar", length: 100, nullable: true })
  private email: string;

  @IsEnum(Civilite, {
    message: "La civilite doit être 'Monsieur', 'Mademoiselle' ou 'Madame'"
  })
  @Column({ type: "enum", enum: Civilite, nullable: true })
  private civility: Civilite;

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

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }
  public getLastName(): string {
    return this.lastName;
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }
  public getFirstName(): string {
    return this.firstName;
  }

  public setFunction(fonction: string) {
    this.function = fonction;
  }
  public getFunction(): string {
    return this.function;
  }

  public setCivility(civilite: Civilite) {
    this.civility = civilite;
  }
  public getCivility(): Civilite {
    return this.civility;
  }

  public setEmail(email: string) {
    this.email = email;
  }
  public getEmail(): string {
    return this.email;
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
