import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
        },
      }
    ]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService,
  {
    provide: 'KAFKA_PRODUCER',
    useFactory: async(kafkaService: ClientKafka) : Promise<any> => {
      return kafkaService.connect();
    },
    inject: ['KAFKA_SERVICE']
  }],
})
export class UsersModule {}
