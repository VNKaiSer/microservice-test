import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {
  GrpcOptions,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        host: '0.0.0.0',
        port: 50052,
        protoPath: join(__dirname, '../auth.proto'),
        package: AUTH_PACKAGE_NAME,
      },
    } as GrpcOptions,
  );
  await app.listen();
  console.log('Auth microservice is running');
}
bootstrap();
