import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import {
  AppEnvironment,
  AppPort,
  EnvVariable,
  SWAGGER_DOCUMENTATION_PATH,
  SWAGGER_JSON_PATH,
} from './env/env.constants';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const configService = app.get(ConfigService);
  const appEnvironment = configService.get(EnvVariable.NODE_ENV);

  if (appEnvironment != AppEnvironment.PRODUCTION) {
    const config = new DocumentBuilder()
      .setTitle('Mock Test Server Api Documentation')
      .setDescription('Mock Test Server Written in Nest.js')
      .setVersion('1.0')
      .addBearerAuth();

    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'Mock Test Server Docs',
    };

    const document = SwaggerModule.createDocument(app, config.build());

    SwaggerModule.setup(
      SWAGGER_DOCUMENTATION_PATH,
      app,
      document,
      customOptions,
    );

    app.getHttpAdapter().get(SWAGGER_JSON_PATH, (req, res) => {
      res.json(document);
    });
  }

  await app.listen(AppPort[appEnvironment]);

  console.info(
    `Mock Test Server started at http://127.0.0.1:${AppPort[appEnvironment]}/ in ${appEnvironment} environment`,
  );

  if (appEnvironment != AppEnvironment.PRODUCTION) {
    console.info(
      `Api documentation available at http://127.0.0.1:${AppPort[appEnvironment]}/${SWAGGER_DOCUMENTATION_PATH}/`,
    );
  }
}
bootstrap();
