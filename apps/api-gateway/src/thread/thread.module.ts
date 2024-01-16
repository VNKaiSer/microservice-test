import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { THREAD_PACKAGE_NAME, THREAD_SERVICE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: THREAD_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../thread.proto'),
          package: THREAD_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [ThreadController],
  providers: [ThreadService],
})
export class ThreadModule {}
