import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('todo')
@UseGuards(AuthGuard)
@UseInterceptors(CacheInterceptor)
export class TodoController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private todoService: TodoService,
  ) {}

  @Get()
  getAll() {
    return this.todoService.getAll();
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    const cachedTodo = await this.cacheManager.get(`todo-${id}`);
    if (cachedTodo) return cachedTodo;

    const todo = await this.todoService.get(id);
    await this.cacheManager.set(`todo-${id}`, todo, 1000);
    return todo;
  }

  @Post()
  create(@Body() todo: TodoDto) {
    return this.todoService.create(todo);
  }
  @Put('/:id')
  update(@Param('id') id: number, @Body() todo: TodoDto) {
    return this.todoService.update(id, todo);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.cacheManager.del(`todo-${id}`);
    await this.todoService.delete(id);
  }
}
