import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Booking {
    constructor(props?: Partial<Booking>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Room)
    @JoinColumn()
    public room: Room;

    @Column()
    public start: Date;

    @Column()
    public end: Date;

    @Column()
    public booker_name: string;

    @Column()
    public booker_phone: string;

    @Column()
    public booker_mail: string;
}
