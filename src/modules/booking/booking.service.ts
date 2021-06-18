import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/create-boking.dto';
import { Booking } from '../../database/entities/booking.entity';
import { Room } from '../../database/entities/room.entity';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
    ) {}

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const room: Room | undefined = await getRepository(Room).findOne(createBookingDto.roomId);

        if (!room) {
            throw new BadRequestException('Room not found');
        }

        const available: boolean = await this.bookingRepository
            .createQueryBuilder('booking')
            .where('booking.roomId = :id', { id: createBookingDto.roomId })
            .andWhere(
                new Brackets((qb) => {
                    qb.where('booking.end between :start and :end', {
                        start: createBookingDto.start,
                        end: createBookingDto.end,
                    })
                        .orWhere('booking.start between :start and :end', {
                            start: createBookingDto.start,
                            end: createBookingDto.end,
                        })
                        .orWhere(':start between booking.start and booking.end');
                }),
            )
            .getManyAndCount()
            .then(([bookings, count]: [Booking[], number]) => {
                return count === 0;
            });

        if (!available) {
            throw new BadRequestException('Rooms is occupied');
        }

        return this.bookingRepository.save({
            booker_name: createBookingDto.booker_name,
            booker_mail: createBookingDto.booker_mail,
            end: createBookingDto.end,
            start: createBookingDto.start,
            booker_phone: createBookingDto.booker_phone,
            room: new Room({ id: createBookingDto.roomId }),
        });
    }
}
