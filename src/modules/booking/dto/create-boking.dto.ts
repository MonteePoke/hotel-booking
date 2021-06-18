import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
    @ApiProperty({
        description: 'ID комнаты',
    })
    roomId: number;
    @ApiProperty({
        description: 'Начало резервации',
    })
    start: Date;
    @ApiProperty({
        description: 'Конец резервации',
    })
    end: Date;

    @ApiProperty({
        description: 'Имя посетителя',
    })
    booker_name: string;
    @ApiProperty({
        description: 'Телефон посителя',
    })
    booker_phone: string;
    @ApiProperty({
        description: 'Почта поситителя',
    })
    booker_mail: string;
}
