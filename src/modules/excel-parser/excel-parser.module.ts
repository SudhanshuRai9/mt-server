import { Module } from '@nestjs/common';
import { ExcelParserController } from './excel-parser.controller';
import { ExcelParserService } from './excel-parser.service';

@Module({
  imports: [],
  controllers: [ExcelParserController],
  providers: [ExcelParserService],
})
export class ExcelParserModule {}
