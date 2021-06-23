import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { JoiValidationPipe } from '../../validation/joi-validation-pipe';
import { BookingService } from './booking.service';
import { createBookingSchema } from './validation/create-booking.schema';
import { CreateBookingDto } from './dto/create-boking.dto';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) {}

    @Post()
    @ApiBody({ type: CreateBookingDto })
    createBooking(
        @Body(new JoiValidationPipe(createBookingSchema)) createBookingDto: CreateBookingDto,
    ) {
        return this.bookingService.create(createBookingDto);
    }
}
