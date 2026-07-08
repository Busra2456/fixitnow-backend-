import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { PayloadRegisterUser } from "./user.interface"
import config from "../../config";

const registerUserIntoDB = async (payload :PayloadRegisterUser) =>{
      const { name, email, password, phone, role, technicianProfile} = payload;

      const isExistUser = await prisma.user.findUnique({
            where : {email}
      })
      if(isExistUser){
            throw new Error("user with this email already exists")
      }

      const hashedPassword = await bcrypt.hash(password,Number(config.bcrypt_salt_rounds))

      const result = await prisma.$transaction(async(tx)=>{
              const createUser = await tx.user.create({
            data : {
                  name,
                  email,
                  password : hashedPassword,
                  phone,
                  role,
                  
               }
            
            
      });
      if (role === "TECHNICIAN" && technicianProfile) {
    await tx.technicianProfile.create({
      data: {
        ...technicianProfile,
        userId: createUser.id
      }
    });
  }

    return createUser
})

   

      const user = await prisma.user.findUnique({
            where : {
                  id : result.id
                 

            },
            omit: {
                  password : true
            },
            include : {
                   technicianProfile : true
            }
      })
      return user

}

export const userService = {
registerUserIntoDB
}