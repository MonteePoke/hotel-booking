import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dotenv } from 'dotenv';
import { Room } from './entities/room.entity';
import { Booking } from './entities/booking.entity';
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
            logging: 'all',
        }),
    ],
})
export class DbModule {}
