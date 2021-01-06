import {Document} from 'mongoose';
export interface User extends Document{
    /*readonly name:string;
    readonly gender:string;
    readonly age:number;
    readonly email:string;
    readonly phone:number;
    readonly seatnumber:number;*/


    readonly name:string;
    readonly email:string;
    readonly password:number;
}