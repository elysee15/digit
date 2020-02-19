import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { IsEmail, Max, MaxLength, IsString, IsEnum } from "class-validator";
import { Civilite } from "./manager.civilite";

@Entity('manager')
export class ManagerEntity{

    @PrimaryGeneratedColumn()
    private id: number;

    @IsString()
    @Column({name: "nom", type: "varchar", length: 191, nullable: true})
    private lastName: string;

    @IsString()
    @Column({name: "prenoms", type: "varchar", length: 191, nullable: true})
    private firstName: string;

    @IsString()
    @Column({length: 100, nullable: true, type: "varchar"})
    private function: string;

    @IsEmail()
    @MaxLength(100, {message: "Email trop long"})
    @Column({name: "email", type: "varchar", length: 100, nullable:true})
    private email: string;    
    
    @IsEnum(Civilite)
    @Column({ type: "enum",enum: Civilite, nullable: true})
    private civility: Civilite;

    @CreateDateColumn({name: "created_at", nullable: true})
    private createdAt: Date;

    @CreateDateColumn({name: "updated_at", nullable: true})
    private updatedAt: Date;

    @Column({name: "created_by", type: "varchar", length: 100, nullable: true})
    private createdBy: string;

    @Column({name: "updated_by",type: "varchar", length: 100, nullable: true})
    private updatedBy: string;


    public setId(id:number){
        this.id = id;
    }
    public getId(): number{
        return this.id;
    }

    public setLastName(lastName: string){
        this.lastName = lastName;
    }
    public getLastName(): string{
        return this.lastName;
    }

    public setFirstName(firstName: string){
        this.firstName = firstName;
    }
    public getFirstName(): string{
        return this.firstName;
    }

    public setFunction(fonction: string){
        this.function = fonction;
    }
    public getFunction(): string{
        return this.function;
    }

    public setCivility(civilite: Civilite){
        this.civility = civilite;
    }
    public getCivility(): Civilite{
        return this.civility;
    }

    public setEmail(email: string){
        this.email = email;
    }
    public getEmail(): string{
        return this.email;
    }

    public setCreatedAt(createdAt: Date){
        this.createdAt = createdAt;
    }
    public getCreatedAt(): Date{
        return this.createdAt;
    }

    public setUpdatedAt(updatedAt: Date){
        this.updatedAt = updatedAt;
    }
    public getUpdatedAt(): Date{
        return this.updatedAt;
    }

    public setCreatedBy( createdBy: string){
        this.createdBy = createdBy;
    }
    public getCreatedBy(): string{
        return this.createdBy;
    }

    public setUpdatedBy( updatedBy: string){
        this.updatedBy = updatedBy;
    }
    public getUpdatedBy(): string{
        return this.updatedBy;
    }
}