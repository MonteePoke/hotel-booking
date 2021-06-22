import { Room } from '../../src/database/entities/room.entity';
import { factory } from 'typeorm-seeding';
import { Booking } from '../../src/database/entities/booking.entity';
import { expect, request } from 'chai';
import { serverUrl, testingModule } from '../init-test';
import { beforeEach } from 'mocha';
import { BookingController } from '../../src/modules/booking/booking.controller';

describe('Создание бронирования', () => {
    let bookingController: BookingController;
    let testRoom: Room;
    const beforeStartDate: Date = new Date('2021-06-20');
    const startDate: Date = new Date('2021-06-21');
    const betweenDate: Date = new Date('2021-06-21');
    const endDate: Date = new Date('2021-06-23');
    const afterEndDate: Date = new Date('2021-06-24');

    /**
     * @deprecated
     */
    async function testMakeBookingE2E(start: Date, end: Date, shouldSucceed: boolean) {
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

    async function testMakeBooking(start: Date, end: Date, shouldBePresent: boolean) {
        const result: Booking | undefined = await bookingController
            .createBooking({
                start: start,
                end: end,
                roomId: testRoom.id,
                booker_name: 'John Doe',
                booker_phone: '88005553535',
                booker_mail: 'example@mail.ru',
            })
            .catch(() => undefined);
        expect(result !== undefined).to.be.equal(shouldBePresent);
    }

    beforeEach(async () => {
        bookingController = testingModule.get<BookingController>(BookingController);

        testRoom = await factory(Room)().create();
        await factory(Booking)().create({ room: testRoom, start: startDate, end: endDate });
    });

    it('Если искомый диапазон совпадает с диапазоном бронирования - бронирование не должно выполниться', async () => {
        await testMakeBooking(startDate, endDate, false);
    });

    it('Если начало и конец искомого диапазона приходятся на начало диапазона бронирования - бронирование не должно выполниться', async () => {
        await testMakeBooking(startDate, startDate, false);
    });

    it('Если начало и конец искомого диапазона приходятся на конец диапазона бронирования - бронирование не должно выполниться', async () => {
        await testMakeBooking(endDate, endDate, false);
    });

    it('Если искомый диапазон находится внутри диапазона бронирования - бронирование не должно выполниться', async () => {
        await testMakeBooking(betweenDate, betweenDate, false);
    });

    it('Если искомый диапазон шире диапазона бронирования - бронирование не должно выполниться', async () => {
        await testMakeBooking(beforeStartDate, afterEndDate, false);
    });

    it('Если искомый диапазон находится до диапазона бронирования - бронирование должно выполниться', async () => {
        await testMakeBooking(beforeStartDate, beforeStartDate, true);
    });

    it('Если искомый диапазон находится после диапазона бронирования - бронирование должно выполниться', async () => {
        await testMakeBooking(afterEndDate, afterEndDate, true);
    });
});
