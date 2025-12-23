import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  ABERTO = 'aberto',
  FAZENDO = 'fazendo',
  FINALIZADO = 'finalizado',
}

@Entity('tasks')
export class Task {
  @ApiProperty({
    description: 'ID único da tarefa',
    example: 1,
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Estudar NestJS e Swagger',
    maxLength: 255,
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example: 'Completar a atividade prática de documentação de API com Swagger',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    description: 'Status atual da tarefa',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    default: TaskStatus.ABERTO,
    example: TaskStatus.ABERTO,
  })
  @Column({
    type: 'varchar',
    length: 50,
    default: TaskStatus.ABERTO,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Data de criação da tarefa',
    type: Date,
    example: '2024-01-15T10:30:00.000Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização da tarefa',
    type: Date,
    example: '2024-01-15T14:45:00.000Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}