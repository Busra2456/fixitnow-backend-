import { ActiveStatus } from "../../../generated/prisma/enums";


export interface PayloadRegisterUser {
      name :string;
      email :string;
      password : string;
      phone?:string;
      role:"CUSTOMER" | "TECHNICIAN";
       technicianProfile?: {
            experience: number;
            bio?:string;
            location:string;
      };
}


export interface IUpdateUserStatus {
  activeStatus: ActiveStatus;
}