import { Room } from '../../src/database/entities/room.entity';
import { factory } from 'typeorm-seeding';
import { Booking } from '../../src/database/entities/booking.entity';
import { expect, request } from 'chai';
import { serverUrl } from '../init-test';

describe('Поиск комнат', () => {
    let testRoom: Room;
    const beforeStartDate: Date = new Date('2021-06-20');
    const startDate: Date = new Date('2021-06-21');
    const betweenDate: Date = new Date('2021-06-21');
    const endDate: Date = new Date('2021-06-23');
    const afterEndDate: Date = new Date('2021-06-24');

    async function testGetRoom(start: Date, end: Date, shouldBePresent: boolean) {
        const result = await request(serverUrl)
            .get('/room')
            .set('Content-Type', 'application/json')
            .query({
                start: start.toISOString(),
                end: end.toISOString(),
            });
        expect(result).to.have.status(200);
        const rooms: Room[] = result.body;
        const testingRoomPresent: boolean =
            rooms.filter((room) => room.id === testRoom.id).length === 1;
        expect(testingRoomPresent).to.be.equal(shouldBePresent);
    }

    before(async () => {
        testRoom = await factory(Room)().create();
        await factory(Booking)().create({ room: testRoom, start: startDate, end: endDate });
    });

    it('Оригинальный диапазон', async () => {
        await testGetRoom(startDate, endDate, false);
    });

    it('Только первый день', async () => {
        await testGetRoom(startDate, startDate, false);
    });

    it('Только последний день', async () => {
        await testGetRoom(endDate, endDate, false);
    });

    it('День между началом и концом', async () => {
        await testGetRoom(betweenDate, betweenDate, false);
    });

    it('Диапазон шире оригинального', async () => {
        await testGetRoom(beforeStartDate, afterEndDate, false);
    });

    it('День до', async () => {
        await testGetRoom(beforeStartDate, beforeStartDate, true);
    });

    it('День после', async () => {
        await testGetRoom(afterEndDate, afterEndDate, true);
    });
});
