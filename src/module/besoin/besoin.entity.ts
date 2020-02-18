import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Status } from "../projet-de-mission/projet-de-mission.model";
import { Priorite } from "./besoin.priorite";
import { ProspectionEntity } from "../prospection/prospection.entity";
import { FamilleDeMissionEntity } from "../famille-de-mission/famille-de-mission.entity";
import { ProjetDeMissionEntity } from "../projet-de-mission/projet-de-mission.entity";
import { IsString, IsEnum } from "class-validator";

@Entity('besoin')
export class BesoinEntity{

    @PrimaryGeneratedColumn()
    private id: number;

    @IsString()
    @Column({ type: "varchar", length: 191, nullable: true })
    private libelle: string;

    @IsString()
    @Column({ type: "text", nullable: true})
    private description: string;

    @IsString()
    @Column({ type: "varchar", length: 191, nullable: true})
    private tag: string;

    @IsEnum(Status)
    @Column({ type: "enum", enum: Status, default: Status.IN_PROGRESS, nullable: true})
    private status: Status;

    @IsString()
    @Column({ type: "text", nullable:true})
    private conclusion: string;

    @IsEnum(Priorite)
    @Column({ type: "enum", enum: Priorite, default: Priorite.Forte, nullable: true})
    private priorite: Priorite;

    @CreateDateColumn({name: "created_at", nullable: true})
    private createdAt: Date;

    @CreateDateColumn({name: "updated_at", nullable: true})
    private updatedAt: Date;

    @IsString()
    @Column({name: "created_by", type: "varchar", length: 100, nullable: true})
    private createdBy: string;

    @IsString()
    @Column({name: "updated_by",type: "varchar", length: 100, nullable: true})
    private updatedBy: string;

    @ManyToOne( type => ProspectionEntity, { eager: true, nullable: true})
    private prospection: ProspectionEntity;

    @ManyToOne(type => FamilleDeMissionEntity, { eager: true, nullable: true})
    private familleDeMission: FamilleDeMissionEntity;

    @ManyToOne(type => ProjetDeMissionEntity, { eager: true, nullable: true})
    private projetDeMission: ProjetDeMissionEntity;



    //-------------------------------------------------------------

    public setId(id:number){
        this.id = id;
    }
    public getId(): number{
        return this.id;
    }

    public setLibelle(libelle: string){
        this.libelle = libelle;
    }
    public getLibelle(): string{
        return this.libelle;
    }

    public setCreatedAt(createdAt: Date){
        this.createdAt = createdAt;
    }
    public getCreatedAt(): Date{
        return this.createdAt;
    }

    public setConclusion(conclusion : string){
        this.conclusion = conclusion;
    }
    public getConclusion(): string{
        return this.conclusion;
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