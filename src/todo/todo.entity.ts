import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { List } from '../list/list.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  deadline?: Date;

  @Column({ default: false })
  done: boolean;

  @Column({ nullable: true })
  listId: number;
}
