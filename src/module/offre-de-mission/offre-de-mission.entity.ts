import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { AnnexeEntity } from "../annexe/annexe.entity";
import { ProjetDeMissionEntity } from "../projet-de-mission/projet-de-mission.entity";
import { PlaningEntity } from "../planing/planing.entity";
import { BudgetEntity } from "../budget/budget.entity";
import { Etat } from "./offre-de-mission.state";

@Entity('offre_de_mission')
export class OffreDeMissionEntity{

    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ type: "text", nullable: true})
    private contexte: string;

    @Column({ type: "text", nullable: true})
    private methodologie: string;

    @Column({ type: "enum",enum: Etat, default: Etat.TO_SEND, nullable: true})
    private etat: Etat;

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

    @ManyToOne(type => AnnexeEntity, {eager: true, nullable:true})
    private annexe: AnnexeEntity;

    @ManyToOne(type => ProjetDeMissionEntity, {eager: true, nullable:true})
    private projet_de_mission: ProjetDeMissionEntity;

    @ManyToOne(type => PlaningEntity , {eager: true, nullable:true})
    private planing: PlaningEntity;

    @ManyToOne(type => BudgetEntity , {eager: true, nullable:true})
    private budget: BudgetEntity;

    public setContexte(contexte: string){
        this.contexte = contexte;
    }
    public getContexte(): string{
        return this.contexte;
    }

    public setMethodologie(methodologie: string){
        this.methodologie = methodologie;
    }
    public getMethodologie(): string{
        return this.methodologie;
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