import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Room {
    constructor(props?: Partial<Room>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany(() => Booking, (object) => object.room)
    public bookings: Booking[];
}
