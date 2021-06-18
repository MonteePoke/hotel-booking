import { define } from 'typeorm-seeding';
import { Booking } from '../entities/booking.entity';

define(
    Booking,
    // @ts-ignore
    (faker, context: Partial<Booking>) =>
        new Booking({
            start: faker.date.recent(),
            end: faker.date.recent(-10),
            booker_name: faker.name.firstName(),
            booker_mail: faker.internet.email(),
            booker_phone: faker.phone.phoneNumber(),
            ...context,
        }),
);
