import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLGatewayModule.forRoot({
      server: {
        cors: true,
        debug: true,
      },
      gateway: {
        serviceList: [
          { name: 'users', url: 'http://localhost:3000/graphql' },
          { name: 'me', url: 'http://localhost:5001/graphql' },
          { name: 'reviews', url: 'http://localhost:5002/graphql' },
          { name: 'products', url: 'http://localhost:5003/graphql' },
        ],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
