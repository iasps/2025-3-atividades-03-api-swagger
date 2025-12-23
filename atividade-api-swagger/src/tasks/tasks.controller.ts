import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Informações da API',
    description: 'Endpoint raiz que retorna informações sobre a API',
  })
  @ApiResponse({
    status: 200,
    description: 'API está funcionando corretamente',
    schema: {
      example: {
        message: 'API de Tarefas está funcionando!',
        version: '1.0',
        documentation: '/api-docs',
        status: 'online',
      },
    },
  })
  getInfo() {
    return {
      message: 'API de Tarefas está funcionando!',
      version: '1.0',
      documentation: '/api-docs',
      status: 'online',
      description: 'API para gerenciamento de tarefas da turma Infoweb 2025',
      author: 'Iasmim Souto',
      institution: 'IFRN - Campus Natal Central',
    };
  }
}