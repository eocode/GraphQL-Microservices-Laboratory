import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLFederationModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        path: 'graphql',
        tracing: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        // autoSchemaFile:
        //   configService.get('GRAPHQL_SCHEMA_DEST') || './src/schema.graphql',
        // debug: configService.get('GRAPHQL_DEBUG') === '1' ? true : false,
        // playground:
        //   configService.get('PLAYGROUND_ENABLE') === '1' ? true : false,
        debug: true,
        playground: true,
        context: ({ req }) => ({ req }),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
