import { Room } from '../../src/database/entities/room.entity';
import { factory } from 'typeorm-seeding';
import { Booking } from '../../src/database/entities/booking.entity';
import { expect, request } from 'chai';
import { serverUrl } from '../init-test';
import { beforeEach } from 'mocha';

describe('Создание бронирования', () => {
    let testRoom: Room;
    const beforeStartDate: Date = new Date('2021-06-20');
    const startDate: Date = new Date('2021-06-21');
    const betweenDate: Date = new Date('2021-06-21');
    const endDate: Date = new Date('2021-06-23');
    const afterEndDate: Date = new Date('2021-06-24');

    async function testMakeBooking(start: Date, end: Date, shouldSucceed: boolean) {
        const result = await request(serverUrl)
            .post('/booking')
            .set('Content-Type', 'application/json')
            .send({
                start: start.toISOString(),
                end: end.toISOString(),
                roomId: testRoom.id,
                booker_name: 'John Doe',
                booker_phone: '88005553535',
                booker_mail: 'example@mail.ru',
            });
        if (shouldSucceed) {
            expect(result).to.have.status(201);
        } else {
            expect(result).to.have.status(400);
        }
    }

    beforeEach(async () => {
        testRoom = await factory(Room)().create();
        await factory(Booking)().create({ room: testRoom, start: startDate, end: endDate });
    });

    it('Оригинальный диапазон', async () => {
        await testMakeBooking(startDate, endDate, false);
    });

    it('Только первый день', async () => {
        await testMakeBooking(startDate, startDate, false);
    });

    it('Только последний день', async () => {
        await testMakeBooking(endDate, endDate, false);
    });

    it('День между началом и концом', async () => {
        await testMakeBooking(betweenDate, betweenDate, false);
    });

    it('Диапазон шире оригинального', async () => {
        await testMakeBooking(beforeStartDate, afterEndDate, false);
    });

    it('День до', async () => {
        await testMakeBooking(beforeStartDate, beforeStartDate, true);
    });

    it('День после', async () => {
        await testMakeBooking(afterEndDate, afterEndDate, true);
    });
});
