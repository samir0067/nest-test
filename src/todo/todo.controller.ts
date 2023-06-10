import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';
import { UpperAndFusionPipe } from '../pipes/upper-and-fusion/upper-and-fusion.pipe';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@Query() myQueryParams: GetPaginatedTodoDto): Todo[] {
    console.log(myQueryParams instanceof GetPaginatedTodoDto);
    return this.todoService.getTodos();
  }

  @Get('/:id')
  getTodoById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: number,
  ) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  addTodo(@Body(ValidationPipe) newTodo: AddTodoDto): Todo {
    return this.todoService.addTodo(newTodo);
  }

  @Put(':id')
  editTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: Partial<AddTodoDto>,
  ) {
    return this.todoService.editTodo(id, todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Post('pipe')
  upperAndFusion(
    @Param('data', UpperAndFusionPipe) paramData: any,
    @Body(UpperAndFusionPipe) data: { data: string[] },
  ) {
    return data;
  }
}
