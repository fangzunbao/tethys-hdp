import { PartialType } from '@nestjs/swagger';
import { CreateReadingBookDto } from './create.reading.book.dto';

export class UpdateReadingBookDto extends PartialType(CreateReadingBookDto) {}
