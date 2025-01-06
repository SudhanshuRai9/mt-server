import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ExcelParserModule } from '../excel-parser/excel-parser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    ExcelParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
