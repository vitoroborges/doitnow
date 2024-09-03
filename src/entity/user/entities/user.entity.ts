import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/entity/task/entities/task.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz', precision: 3 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', precision: 3 })
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPass(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
