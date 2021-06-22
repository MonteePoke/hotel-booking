import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../../database/entities/room.entity';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>,
    ) {}

    findMany(start: Date, end: Date): Promise<Room[]> {
        return (
            this.roomRepository
                .createQueryBuilder('room')
                // Ищем резеврации которые накладываются на диапазон нужных дат
                .leftJoinAndSelect(
                    'room.bookings',
                    'booking',
                    'booking.end between :start and :end ' +
                        'or booking.start between :start and :end ' +
                        'or :start between booking.start and booking.end',
                    {
                        start: start,
                        end: end,
                    },
                )
                // Если нашлись накладывающиеся резервации - не берем комнату
                .where('booking is null')
                .orderBy('room.id', 'ASC')
                .getMany()
        );
    }
}
