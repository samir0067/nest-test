import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  todos: Todo[];
  constructor() {
    this.todos = [];
  }
  @Get()
  getTodos() {
    return this.todos;
  }
  @Get('res')
  getTodosResponse(@Req() request: Request, @Res() response: Response) {
    console.log('Récupérer la liste des TODOS');
    response.status(205);
    response.json({
      content: "Réponse obtenue à partir de l'objet express (Response)",
    });
  }

  @Post()
  addTodo(@Body() newTodo: Todo) {
    if (this.todos.length) {
      newTodo.id = this.todos[this.todos.length - 1].id + 1;
    } else {
      newTodo.id = 1;
    }
    this.todos.push(newTodo);
    return newTodo;
  }

  @Put()
  editTodo() {
    console.log('Modifier un TODO à la liste des TODOS');
    return 'Update TODO';
  }

  @Delete()
  deleteTodo() {
    console.log('Supprimer un TODO à la liste des TODOS');
    return 'Delete TODO';
  }
}
