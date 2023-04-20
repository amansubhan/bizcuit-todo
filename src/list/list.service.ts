import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';
import { ListDto } from './list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async getAll() {
    return this.listRepository.find();
  }

  async get(id: number) {
    return this.listRepository.findOneBy({ id });
  }

  async create(listDto: ListDto): Promise<List> {
    const list = new List();
    list.name = listDto.name;
    return this.listRepository.save(list);
  }

  async update(id: number, listDto: ListDto): Promise<List> {
    const list = await this.listRepository.findOneBy({ id });

    if (!list) throw new NotFoundException();
    list.name = listDto.name;
    return this.listRepository.save(list);
  }

  async delete(id: number) {
    await this.listRepository.delete({ id });
  }
}
