import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';

@Controller('todo')
export class TodoController {
  todos: Todo[];
  constructor() {
    this.todos = [];
  }

  @Get()
  getTodos(@Query() myQueryParams: GetPaginatedTodoDto) {
    console.log(myQueryParams);
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

  @Get('/:id')
  getTodoById(@Param('id') id: string) {
    const todo = this.todos.find((findTodo) => findTodo.id === +id);
    if (todo) {
      return todo;
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto) {
    const todo = new Todo();
    const { name, description } = newTodo;
    todo.name = name;
    todo.description = description;
    if (this.todos.length) {
      todo.id = this.todos[this.todos.length - 1].id + 1;
    } else {
      todo.id = 1;
    }
    this.todos.push(todo);
    return todo;
  }

  @Put(':id')
  editTodo(@Param('id') id: string, @Body() todo: Partial<AddTodoDto>) {
    const todoFound = this.getTodoById(id);
    todoFound.description = todo.name ? todo.name : todoFound.name;
    todoFound.description = todo.description
      ? todo.description
      : todoFound.description;
    console.log(todoFound);
    return todoFound;
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    const index = this.todos.findIndex((todo) => todo.id === +id);
    if (index > 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return {
      message: `Le todo d'id ${id} à été supprimer avec success`,
      count: 1,
    };
  }
}
