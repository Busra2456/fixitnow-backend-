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