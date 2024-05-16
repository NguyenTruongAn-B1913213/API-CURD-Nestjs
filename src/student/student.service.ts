import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { promises } from 'dns';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { IStudent } from 'src/interface/student.interface';
import { Cache } from 'cache-manager';
@Injectable()
export class StudentService {
    constructor (@InjectModel('Student') private studentModel:Model<IStudent>,@Inject(CACHE_MANAGER) private cacheManager: Cache ){}

    async createStudent(createStudentDto: CreateStudentDto ):Promise<IStudent>{
        const newStudent = await new this.studentModel(createStudentDto)
        return newStudent.save()
    }

    async getAllStudent():Promise<IStudent[]>{
        let studentData: IStudent[] | null = await this.cacheManager.get<IStudent[]>('getAllStudent');
        if(!studentData){
            studentData = await this.studentModel.find()
            await this.cacheManager.set('getAllStudent', studentData, 5000);
        }
        return studentData
    }

    async  getStudent(studentId:string):Promise<IStudent> {
        let existingStudent: IStudent | null = await this.cacheManager.get<IStudent>('getStudent');
        if(!existingStudent){
            console.log('run API')
            existingStudent = await this.studentModel.findById(studentId)
            await this.cacheManager.set('getStudent', existingStudent, 5000);
            if(!existingStudent){
                throw new NotFoundException(`Student ${studentId}  not found`)
            }
        }
        return existingStudent;
        
    }
    async  deleteStudent(studentId:string):Promise<IStudent> {
        const deletedStudent = await this.studentModel.findByIdAndDelete(studentId)
        if(!deletedStudent){
            throw new NotFoundException(`Student ${studentId}  not found`)
        }
        return deletedStudent
        
    }
    async  updateStudent(studentId:string, updateStudentDto: UpdateStudentDto):Promise<IStudent> {
        const existingStudent = await this.studentModel.findByIdAndUpdate(studentId,updateStudentDto)
        if(!existingStudent){
            throw new NotFoundException(`Student ${studentId}  not found`)
        }
        return existingStudent
        
    }

}

