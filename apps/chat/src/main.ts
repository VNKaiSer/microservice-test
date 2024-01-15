import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { CHAT_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      host: '0.0.0.0',
      port: 50051,
      protoPath: join(__dirname, '../chat.proto'),
      package: CHAT_PACKAGE_NAME,
    },
  } as GrpcOptions);
  app.startAllMicroservices();
  console.log('Chat microservice is running');
}
bootstrap();
