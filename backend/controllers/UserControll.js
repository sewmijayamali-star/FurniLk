import User from "../modules/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {

    if(req.user==null){
       res.status(401).json({
            message: "Unauthorized"
        })
        return
    }   

    if(req.user.role !="admin"){
        return res.status(403).json({
            message:"You are not allowed to create a user "
        })
        return
    }

   const hashedpassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User(
   { email: req.body.email,
     name: req.body.name,
     password: hashedpassword,
     phone: req.body.phone,
     role: req.body.role,
     
    } 
  );

  user.save()
    .then(() => {
      res.json({
        message: "User created successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "User creation failed",
        error: error.message
      });
    });
}

export function loginuser(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user== null) {
        return res.status(404).json({
          message: "User not found",
        });
      }else {
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        } else {
            const token= jwt.sign(
                {email: user.email, 
                name: user.name,
                role: user.role,
                isVarified: user.isVarified,
            },
            "secretkey",
        ) ; 
        return res.status(200).json({
          message: "Login successful",
          token: token
        }); 
        
          
        }
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error occurred while logging in",
        error: error.message
      });
    });
}

export function isAdmin(req) {
    if(req.user==null){
        return false;
    }
    if(req.user.role!="admin"){
        return false;
    }
    return true;
}