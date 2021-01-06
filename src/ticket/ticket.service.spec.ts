import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import {MongooseModule} from '@nestjs/mongoose';
import { async } from 'rxjs';
import {User} from './interfaces/user.interface';
import {Ticket} from './interfaces/ticket.interface';
import{UserSchema} from './schemas/user.schema';
import {TicketSchema} from './schemas/ticket.schema';
import * as mongoose from 'mongoose';
import{Model} from 'mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../tests/db-handler';

describe('TicketService', () => {
  let service: TicketService;
  let testingmodule: TestingModule;
  let ticketModel: Model<Ticket>;
  let userModel: Model<User>;
  beforeEach(async () => {
     testingmodule = await Test.createTestingModule({
     imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{ name: 'Ticket', schema: TicketSchema },]),
      ],
      providers: [TicketService],
    }).compile();
    service = testingmodule.get<TicketService>(TicketService);
    ticketModel=testingmodule.get<Model<Ticket>>('TicketModel',)
    userModel=testingmodule.get<Model<User>>('UserModel',);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const details={
    name:'sithik',
    age:18,
    gender:'F',
    email:'srithik@gmail.com',
    phone:78493257896,
    seatnumber:11
  }
  const bookingdetails={
    seatnumber:11,
    isbooked:false
  }
  const updatedDetails={
    seatnumber:11,
    isbooked:true
  }
  it("Should create a new user",async () => {
    expect(async () => {
      await service.addUser(details)
    })
    .not
    .toThrow();
    
  })
  it('User exists after being created', async () => {
    await service.addUser(details);
    const createdUser = await userModel.findOne();
    expect(createdUser.name)
        .toBe(details.name);
  });
  it('ticket exists after being created', async () => {
    await service.addUser(details);
    const createdTicket = await ticketModel.findOne();
    expect(createdTicket.seatnumber)
        .toBe(details.seatnumber);
  });
  it("Should display open tickets",async () => {
    await service.addUser(details);
    expect(async () => {
      await service.openTicket()
    })
    .not
    .toThrow();
    
  })
  it("Should display closed tickets",async () => {
    await service.addUser(details);
    expect(async () => {
      await service.closeTicket()
    })
    .not
    .toThrow();
    
  })
  it("Should display ticket details by id",async () => {
    await service.addUser(details);
    const seat=ticketModel.findOne({seatnumber:details.seatnumber});
    var ID=(await seat)._id;
    expect(async () => {
      await service.findById(ID)
    })
    .not
    .toThrow();
    
  })
  it("Should display passenger details by id",async () => {
    await service.addUser(details);
    const seat=ticketModel.findOne({seatnumber:details.seatnumber});
    var ID=(await seat)._id;
    expect(async () => {
      await service.findById(ID)
    })
    .not
    .toThrow();
    
  })
  it("Should reset the ticket status",async () => {
    await service.addUser(details);
    const createdTicket = await ticketModel.findOne();
    expect(async () => {
      await service.resetTickets(createdTicket);
    })
    .not
    .toThrow();
    })
  afterAll(async () => {
    await userModel.deleteMany({});
    await ticketModel.deleteMany({});
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});