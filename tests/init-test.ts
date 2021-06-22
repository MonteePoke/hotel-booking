import chai from 'chai';
import chaiHttp from 'chai-http';
import { Test, TestingModule } from '@nestjs/testing';
import { DbModule } from '../src/database/db.module';
import { useSeeding } from 'typeorm-seeding';

chai.use(chaiHttp);

export const serverUrl: string = 'localhost:3000';
let testingModule: TestingModule;

before(async () => {
    testingModule = await Test.createTestingModule({
        imports: [DbModule],
    }).compile();

    await useSeeding();
});

after(async () => {
    await testingModule?.close();
});
