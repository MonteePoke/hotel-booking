import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RoomService } from './room.service';
import { Controller, Get, Query } from '@nestjs/common';
import { JoiValidationPipe } from '../../validation/joi-validation-pipe';
import { getRoomsSchema } from './validation/get-rooms.schema';
import { GetRoomsDto } from './dto/get-roomds.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    @ApiBody({ type: [GetRoomsDto] })
    findMany(@Query(new JoiValidationPipe(getRoomsSchema)) getRoomsQuery: GetRoomsDto) {
        return this.roomService.findMany(getRoomsQuery.start, getRoomsQuery.end);
    }
}
