import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { AnySchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: AnySchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException(error.message);
        }
        return value;
    }
}
