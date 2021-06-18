import { Factory, Seeder } from 'typeorm-seeding';
import { Room } from '../entities/room.entity';
import { Booking } from '../entities/booking.entity';

export default class TestSeeder implements Seeder {
    public async run(factory: Factory): Promise<void> {
        const rooms: Room[] = await factory(Room)().createMany(10);

        await Promise.all(
            rooms.map(async (room) => {
                await factory(Booking)().create({ room: room });
            }),
        );
    }
}
