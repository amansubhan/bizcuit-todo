import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto } from './list.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('list')
@UseGuards(AuthGuard)
@UseInterceptors(CacheInterceptor)
export class ListController {
  constructor(private listService: ListService) {}
  @Get()
  getAll() {
    return this.listService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id: number) {
    return this.listService.get(id);
  }

  @Post()
  create(@Body() list: ListDto) {
    return this.listService.create(list);
  }
  @Put('/:id')
  update(@Param('id') id: number, @Body() list: ListDto) {
    return this.listService.update(id, list);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.listService.delete(id);
  }
}
