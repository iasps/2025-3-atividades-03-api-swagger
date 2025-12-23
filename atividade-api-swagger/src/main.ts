import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Tarefas (TODO List)')
    .setDescription('API para gerenciamento de tarefas da turma Infoweb 2025\n\n**Desenvolvido por:** Iasmim Souto\n**Instituição:** IFRN - Campus Natal Central\n**Disciplina:** POS - Programação Orientada a Serviços')
    .setVersion('1.0')
    .addTag('root', 'Endpoint raiz da API')
    .addTag('tasks', 'Operações relacionadas a tarefas')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  // Habilita CORS
  app.enableCors();
  
  // Habilita validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  await app.listen(3000);
  console.log('🚀 API rodando em http://localhost:3000');
  console.log('📚 Swagger UI disponível em http://localhost:3000/api-docs');
}
bootstrap();