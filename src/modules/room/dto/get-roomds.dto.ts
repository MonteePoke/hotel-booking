import { ApiProperty } from '@nestjs/swagger';

export class GetRoomsDto {
    @ApiProperty({
        description: 'Начало резервации',
    })
    start: Date;
    @ApiProperty({
        description: 'Конец резервации',
    })
    end: Date;
}
