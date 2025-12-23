import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Novo título da tarefa',
    example: 'Atualizar documentação da API',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Nova descrição da tarefa',
    example: 'Melhorar exemplos e descrições na documentação',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Novo status da tarefa',
    enum: TaskStatus,
    example: TaskStatus.FAZENDO,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}