import { Module } from '@nestjs/common';
import { DbModule } from './database/db.module';
import { RoomModule } from './modules/room/room.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
    imports: [DbModule, BookingModule, RoomModule],
})
export class AppModule {}
