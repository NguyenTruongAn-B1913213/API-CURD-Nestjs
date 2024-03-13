import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  StudentSchema } from './schemas/student.schema';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: 
  [
    CacheModule.register(),
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    MongooseModule.forFeature([{name: 'Student', schema: StudentSchema}])
    
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
