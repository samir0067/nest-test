import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo {
    const todo = this.todos.find((findTodo) => findTodo.id === id);
    if (todo) {
      return todo;
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
  }

  addTodo(newTodo: AddTodoDto): Todo {
    let id;
    const { name, description } = newTodo;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }
    const todo = {
      id,
      name,
      description,
      createdAd: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  editTodo(id: number, todo: Partial<AddTodoDto>) {
    const todoFound = this.getTodoById(id);
    todoFound.description = todo.name ? todo.name : todoFound.name;
    todoFound.description = todo.description
      ? todo.description
      : todoFound.description;
    console.log(todoFound);
    return todoFound;
  }

  deleteTodo(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
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
