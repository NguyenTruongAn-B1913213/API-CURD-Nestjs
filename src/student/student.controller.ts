import { Controller ,Post ,Get , Delete, Put, Param,Req , Res , Body , HttpStatus, Inject, Response} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { response } from 'express';
@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService){}
    @Post()
    async createStudent(@Res() Response, @Body() createStudentDto: CreateStudentDto){
        try {
            const newStudent = await this.studentService.createStudent(createStudentDto)
            return  Response.status(HttpStatus.CREATED).json({
                statusCode:200,
                message:' Student created succesfully'
            })
            
        } catch (error) {
            return Response.status(HttpStatus.BAD_REQUEST).json({
                statusCode:400,
                message:'Error Student not created',
                error: "Bad Request"
            })
        }
    }

    @Get()
    async getStudents(@Res() Response){
        try {
            const studentData = await this.studentService.getAllStudent()
            return Response.status(HttpStatus.OK).json({
                message:"All student data found succesfully",studentData
            })
        } catch (error) {
            return Response.status(error.status).json(error.Response)
            
        }
    }
    @Get('/detail/:id')
    async getStudent(@Res() Response , @Param('id') studentId:string){
        try{
            const getStudentId = await this.studentService.getStudent(studentId)
            return Response.status(HttpStatus.OK).json({getStudentId
            })
        }catch(error){
            return Response.status(error.status).json(error.Response)
        }
    }
    @Put('/:id')
    async updateStudent(@Res() Response, @Param('id') studentId:string , @Body() updateStudentDto:UpdateStudentDto){
        try {
            const existingStudent = await this.studentService.updateStudent(studentId,updateStudentDto)
            return Response.status(HttpStatus.OK).json({
                message:"All student data update succesfully",existingStudent
            })
            
        } catch (error) {
            return Response.status(error.status).json(error.Response)
        }
    }
    @Delete('/:id')
    async deleteStudent(@Res() Response, @Param('id') studentId:string ){
        try {
            const deletedStudent = await this.studentService.deleteStudent(studentId,)
            return Response.status(HttpStatus.OK).json({
                message:"All student data delate succesfully",deletedStudent
            })
            
        } catch (error) {
            return Response.status(error.status).json(error.Response)
        }
    }

}
