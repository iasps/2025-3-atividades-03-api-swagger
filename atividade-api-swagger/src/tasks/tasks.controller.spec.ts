import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todas as tarefas',
    description: 'Retorna uma lista com todas as tarefas cadastradas no sistema',
  })
  @ApiOkResponse({
    description: 'Lista de tarefas retornada com sucesso',
    type: Task,
    isArray: true,
  })
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar uma tarefa específica',
    description: 'Retorna os detalhes de uma tarefa com base no ID fornecido',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa',
    type: Number,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Tarefa encontrada com sucesso',
    type: Task,
  })
  @ApiNotFoundResponse({
    description: 'Tarefa não encontrada',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar uma nova tarefa',
    description: 'Cria uma nova tarefa com os dados fornecidos',
  })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Dados para criação da tarefa',
  })
  @ApiCreatedResponse({
    description: 'Tarefa criada com sucesso',
    type: Task,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar uma tarefa existente',
    description: 'Atualiza os dados de uma tarefa existente com base no ID fornecido',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa a ser atualizada',
    type: Number,
    example: 1,
  })
  @ApiBody({
    type: UpdateTaskDto,
    description: 'Dados para atualização da tarefa',
  })
  @ApiOkResponse({
    description: 'Tarefa atualizada com sucesso',
    type: Task,
  })
  @ApiNotFoundResponse({
    description: 'Tarefa não encontrada',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover uma tarefa',
    description: 'Remove uma tarefa do sistema com base no ID fornecido',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da tarefa a ser removida',
    type: Number,
    example: 1,
  })
  @ApiNoContentResponse({
    description: 'Tarefa removida com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Tarefa não encontrada',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}