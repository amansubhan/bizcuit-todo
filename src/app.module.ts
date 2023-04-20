import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { Todo } from './todo/todo.entity';
import { List } from './list/list.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 10, // seconds
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'SuperSecretPassword',
      database: 'todo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Todo, List]),
    AuthModule,
    UserModule,
  ],
  controllers: [TodoController, ListController],
  providers: [TodoService, ListService],
})
export class AppModule {}
