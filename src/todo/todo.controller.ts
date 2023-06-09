import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@Query() myQueryParams: GetPaginatedTodoDto): Todo[] {
    console.log(myQueryParams);
    return this.todoService.getTodos();
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string) {
    return this.todoService.getTodoById(+id);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.todoService.addTodo(newTodo);
  }

  @Put(':id')
  editTodo(@Param('id') id: string, @Body() todo: Partial<AddTodoDto>) {
    return this.todoService.editTodo(+id, todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(+id);
  }
}
