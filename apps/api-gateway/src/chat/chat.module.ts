import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CHAT_SERVICE } from './constants';
import { join } from 'path';
import { CHAT_PACKAGE_NAME } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CHAT_SERVICE,
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../chat.proto'),
          package: CHAT_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
