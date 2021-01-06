import { Body, Controller,HttpStatus,Post, Res,Param, NotFoundException, Get,Put,Query} from '@nestjs/common';
import{TicketService}from'./ticket.service';
import{UserDTO} from './dto/user.dto';
import{TicketDTO} from './dto/ticket.dto';
import { resolve } from 'path';
import { User } from './interfaces/user.interface';
import { get } from 'http';

@Controller('ticket')
export class TicketController {
constructor(private ticketService:TicketService) {}
/*@Post('/register')
async addUser(@Res() res, @Body() userDTO:UserDTO){
    const newUser=await this.ticketService.addUser(userDTO);
    return res.status(HttpStatus.OK).json({
         message: 'User details added successfully!',
        post:newUser
    });
    
      
;
}
@Post('/bookticket')
async addSeat(@Res() res, @Body() ticketDTO:TicketDTO){
    const newTicket=await this.ticketService.addSeat(ticketDTO);
    return res.status(HttpStatus.OK);
}*/
@Post('/register')
async register(@Res() res, @Body() userDTO:UserDTO){
    const newUser=await this.ticketService.register(userDTO,res);
}
@Post('/login')
async login(@Res() res, @Body() userDTO:UserDTO){
    const loginUser=await this.ticketService.login(userDTO,res);
}
@Post('/addTicket')
async addTicket(@Res() res ,@Body() ticketDTO:TicketDTO){
    const newTicket=await this.ticketService.addTicket(ticketDTO,res);
}
@Get('/status/open')
async openTicket(){
    const open=await this.ticketService.openTicket();
    return open;
}
@Get('/status/close')
async closeTicket(){
    const close=await this.ticketService.closeTicket();
    console.log(close);
}
@Post('/reset')
async resetTickets(@Res() res ,@Body() body,ticketDTO:TicketDTO){
    const username="Admin";
    const password="123456";
    if(body.username==username && body.password==password){
        const reset=await this.ticketService.resetTickets(ticketDTO);
        return res.status(HttpStatus.OK).json({
        message: 'All tickets has been reset!!'
  });
}else{res.send("Invalid login credentials!!")}
}
@Get('/:id')
    public async getTicketid(@Res() res, @Param() param){
        const ticket = await this.ticketService.findById(param.id);
        return res.status(HttpStatus.OK).json(ticket);
    }
@Get('/details/:id')
public async getTicketdetails(@Res() res, @Param() param){
    const ticket = await this.ticketService.findDetailsById(param.id);
        return res.status(HttpStatus.OK).json(ticket);
    }

@Put('/update')//update ticket
async updateTicket(@Res() res, @Body() ticketDTO: TicketDTO, @Query('ticketID') ticketID) {
    const updatedTicket = await this.ticketService.updateTicketStatus(ticketID, ticketDTO);
    if (!updatedTicket) throw new NotFoundException('Ticket does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Ticket Updated Successfully',
            updatedTicket 
        });
    }











}



