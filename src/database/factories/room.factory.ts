import { define } from 'typeorm-seeding';
import { Room } from '../entities/room.entity';

define(
    Room,
    // @ts-ignore
    (faker, context: Partial<Room>) =>
        new Room({
            name: faker.random.word(),
            ...context,
        }),
);
