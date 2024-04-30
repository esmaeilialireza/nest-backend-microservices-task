import { ConfigModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../static'),
      serveStaticOptions: {
        fallthrough: true,
      },
    }),
    UsersModule,
  ],
})
export class GatewayModule {}
