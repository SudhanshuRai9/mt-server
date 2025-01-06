import { Controller, Get } from '@nestjs/common';
import { ExcelParserService } from './excel-parser.service';

@Controller()
export class ExcelParserController {
  constructor(private readonly excelParserService: ExcelParserService) {}
}
