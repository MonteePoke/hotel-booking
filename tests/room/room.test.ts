import { Room } from '../../src/database/entities/room.entity';
import { factory } from 'typeorm-seeding';
import { Booking } from '../../src/database/entities/booking.entity';
import { expect, request } from 'chai';
import { serverUrl, testingModule } from '../init-test';
import { RoomController } from '../../src/modules/room/room.controller';
import { getRoomsSchema } from '../../src/modules/room/validation/get-rooms.schema';
import Joi from '@hapi/joi';

describe('Поиск комнат', () => {
    let roomController: RoomController;

    let testRoom: Room;
    const beforeStartDate: Date = new Date('2021-06-20');
    const startDate: Date = new Date('2021-06-21');
    const betweenDate: Date = new Date('2021-06-21');
    const endDate: Date = new Date('2021-06-23');
    const afterEndDate: Date = new Date('2021-06-24');

    /**
     * @deprecated
     */
    async function testGetRoomE2E(start: Date, end: Date, shouldBePresent: boolean) {
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

    async function testGetRoom(start: Date, end: Date, shouldBePresent: boolean) {
        const result: Room[] = await roomController.findMany({ start, end });
        const testingRoomPresent: boolean =
            result.filter((room) => room.id === testRoom.id).length === 1;
        expect(testingRoomPresent).to.be.equal(shouldBePresent);
    }

    before(async () => {
        roomController = testingModule.get<RoomController>(RoomController);
        testRoom = await factory(Room)().create();
        await factory(Booking)().create({ room: testRoom, start: startDate, end: endDate });
    });

    it('Если конец искомого диапазона раньше начала - должна быть ошибка валидации', async () => {
        const result: Joi.ValidationResult = getRoomsSchema.validate({
            start: endDate.toISOString(),
            end: startDate.toISOString(),
        });
        expect(result.error).not.to.be.equal(undefined);
    });

    it('Если искомый диапазон совпадает с диапазоном бронирования - комната не должна быть в ответе', async () => {
        await testGetRoom(startDate, endDate, false);
    });

    it('Если начало и конец искомого диапазона приходятся на начало диапазона бронирования - комната не должна быть в ответе', async () => {
        await testGetRoom(startDate, startDate, false);
    });

    it('Если начало и конец искомого диапазона приходятся на конец диапазона бронирования - комната не должна быть в ответе', async () => {
        await testGetRoom(endDate, endDate, false);
    });

    it('Если искомый диапазон находится внутри диапазона бронирования - комната не должна быть в ответе', async () => {
        await testGetRoom(betweenDate, betweenDate, false);
    });

    it('Если искомый диапазон шире диапазона бронирования - комната должна не быть в ответе', async () => {
        await testGetRoom(beforeStartDate, afterEndDate, false);
    });

    it('Если искомый диапазон находится до диапазона бронирования - комната должна быть в ответе', async () => {
        await testGetRoom(beforeStartDate, beforeStartDate, true);
    });

    it('Если искомый диапазон находится после диапазона бронирования - комната должна быть в ответе', async () => {
        await testGetRoom(afterEndDate, afterEndDate, true);
    });
});
