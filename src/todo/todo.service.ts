import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async getAll() {
    return this.todoRepository.find();
  }

  async get(id: number) {
    return this.todoRepository.findOneBy({ id });
  }

  async create(todoDto: TodoDto): Promise<Todo> {
    const todo = new Todo();

    todo.name = todoDto.name;
    todo.description = todoDto.description;
    todo.deadline = todoDto.deadline;
    todo.listId = todoDto.listId;
    todo.done = todoDto.done;

    return this.todoRepository.save(todo);
  }

  async update(id: number, todoDto: TodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) throw new NotFoundException();
    todo.name = todoDto.name;
    todo.description = todoDto.description;
    todo.deadline = todoDto.deadline;
    todo.listId = todoDto.listId;
    todo.done = todoDto.done;

    return this.todoRepository.save(todo);
  }

  async delete(id: number) {
    await this.todoRepository.delete({ id });
  }
}
