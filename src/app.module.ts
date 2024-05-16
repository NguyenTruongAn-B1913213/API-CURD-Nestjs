import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  StudentSchema } from './schemas/student.schema';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';  
@Module({
  imports: 
  [
    CacheModule.registerAsync({  
      isGlobal: true,  
      useFactory: async () => ({  
        store: await redisStore({  
          socket: {  
            host: 'redis',  
            port: 6379,
          },        
        }),      
      }),    
    }),    
    MongooseModule.forRoot('mongodb://mongodb:27017/nest'),
    MongooseModule.forFeature([{name: 'Student', schema: StudentSchema}])
    
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
