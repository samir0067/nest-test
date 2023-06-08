import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {
  @Get()
  getTodos() {
    console.log('Récupérer la liste des TODOS');
    return 'List des TODO';
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
  addTodo() {
    console.log('Ajouter un TODO à la liste des TODOS');
    return 'Add TODO';
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
