import chai from 'chai';
import chaiHttp from 'chai-http';
import { Test, TestingModule } from '@nestjs/testing';
import { useSeeding } from 'typeorm-seeding';
import { BookingModule } from '../src/modules/booking/booking.module';
import { RoomModule } from '../src/modules/room/room.module';
import { TestDbModule } from './test-db.module';

chai.use(chaiHttp);

export const serverUrl: string = 'localhost:3000';
export let testingModule: TestingModule;

before(async () => {
    testingModule = await Test.createTestingModule({
        imports: [TestDbModule, BookingModule, RoomModule],
    }).compile();

    await useSeeding();
});

after(async () => {
    await testingModule?.close();
});
