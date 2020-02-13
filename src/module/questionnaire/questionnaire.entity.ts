import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { ProspectionEntity } from "../prospection/prospection.entity";

@Entity('questionnaire')
export class QuestionnaireEntity{

    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ type: "varchar", length: 191, nullable: true })
    private libelle: string;

    @Column({ type: "text", nullable:true})
    private conclusion: string;

    @CreateDateColumn({name: "created_at", nullable: true})
    private createdAt: Date;

    @CreateDateColumn({name: "updated_at", nullable: true})
    private updatedAt: Date;

    @Column({name: "created_by", type: "varchar", length: 100, nullable: true})
    private createdBy: string;

    @Column({name: "updated_by",type: "varchar", length: 100, nullable: true})
    private updatedBy: string;

    @ManyToOne( type => ProspectionEntity, { eager: true, nullable: true})
    private prospection: ProspectionEntity;



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

    public setProspection(prospection: ProspectionEntity){
        this.prospection = prospection;
    }
    public getProspection(): ProspectionEntity{
        return this.prospection;
    }
}