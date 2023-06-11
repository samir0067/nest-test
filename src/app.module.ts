import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(HelmetMiddleware)
      .forRoutes('*')
      .apply(FirstMiddleware)
      .forRoutes(
        'hello',
        { path: 'todo', method: RequestMethod.GET },
        { path: 'todo*', method: RequestMethod.DELETE },
      )
      .apply(loggerMiddleware)
      .forRoutes('*');
  }
}
