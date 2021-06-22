import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../src/database/entities/booking.entity';
import { Room } from '../src/database/entities/room.entity';
import { config as dotenv } from 'dotenv';
dotenv();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Room, Booking],
            autoLoadEntities: true,
            synchronize: true,
            dropSchema: true,
            logging: 'all',
            schema: 'test',
        }),
    ],
})
export class TestDbModule {}
