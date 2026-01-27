import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    
    const employee = await this.prisma.user.findUnique({ where: { id: dto.assignedTo } });
    if (!employee || employee.role !== 'EMPLOYEE') {
      throw new NotFoundException('Assigned user must be an existing EMPLOYEE');
    }

    
    const customer = await this.prisma.customer.findUnique({ where: { id: dto.customerId } });
    if (!customer) throw new NotFoundException('Customer not found');

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status || 'PENDING',
        assignedToId: dto.assignedTo,
        customerId: dto.customerId,
      },
    });
  }

  async findAll(user: any) {
    if (user.role === 'ADMIN') {
      return this.prisma.task.findMany({
        include: { 
          assignedTo: { select: { id: true, name: true, email: true } },
          customer: true 
        },
      });
    }
    
   return this.prisma.task.findMany({
      where: { assignedToId: user.id },
      include: { 
        assignedTo: { select: { id: true, name: true, email: true } },
        customer: true 
      },
    });
  }

  async updateStatus(id: number, status: TaskStatus, user: any) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    if (user.role === 'EMPLOYEE' && task.assignedToId !== user.id) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }
}