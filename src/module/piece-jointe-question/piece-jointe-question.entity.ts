import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import { QuestionEntity } from '../question/question.entity';

@Entity('piece_jointe_question')
export class PieceJointeQuestionEntity{

    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ type: "varchar", length: 191, nullable: true })
    private libelle: string;

    @CreateDateColumn({name: "created_at", nullable: true})
    private createdAt: Date;

    @CreateDateColumn({name: "updated_at", nullable: true})
    private updatedAt: Date;

    @Column({name: "created_by", type: "varchar", length: 100, nullable: true})
    private createdBy: string;

    @Column({name: "updated_by",type: "varchar", length: 100, nullable: true})
    private updatedBy: string;

    @ManyToOne(type => QuestionEntity, { eager: true, nullable: true})
    private question: QuestionEntity;

    //-------------------------------------------------------------------------

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