import {Document} from 'mongoose';
export interface Ticket extends Document{
    //readonly email:string,
    //readonly ticketid:number;
    readonly seatnumber:number;
    readonly isbooked:boolean;
   // readonly name:string;
    readonly email:string;
}