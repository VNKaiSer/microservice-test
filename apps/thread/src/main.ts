import { NestFactory } from '@nestjs/core';

import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { THREAD_PACKAGE_NAME } from '@app/common';
import { ThreadModule } from './thread.module';

async function bootstrap() {
  const app = await NestFactory.create(ThreadModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      host: '0.0.0.0',
      port: 50051,
      protoPath: join(__dirname, '../thread.proto'),
      package: THREAD_PACKAGE_NAME,
    },
  } as GrpcOptions);
  app.startAllMicroservices();
  console.log('Thread microservice is running');
}
bootstrap();
