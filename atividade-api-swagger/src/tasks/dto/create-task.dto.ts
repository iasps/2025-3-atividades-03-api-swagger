import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Documentar API com Swagger',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  title: string;

  @ApiProperty({
    description: 'Descrição da tarefa',
    example: 'Implementar documentação completa da API usando Swagger/OpenAPI',
  })
  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  description: string;

  @ApiPropertyOptional({
    description: 'Status inicial da tarefa',
    enum: TaskStatus,
    default: TaskStatus.ABERTO,
    example: TaskStatus.ABERTO,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}