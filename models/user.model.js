// const mongoose=require('mongoose')
// const  bcrypt=require('bcrypt')
// const createHttpError = require('http-errors'); // Ensure this is installed and imported if used

// const {roles}=require('../utils/constants')
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: [roles.admin, roles.client], default: roles.client },
//   department:{type:String,required:true},
//   uploadedFiles: [{
//       filename: String,
//       url: String,
//       date: { type: Date, default: Date.now },
//       description: String,
//       upload_by: String,
//       department: String
//   }]
// });

// // userSchema.pre('save',function(next){
// //     if(this.isModified('password')){
// //       console.log('Password is being hashed...');
// //         bcrypt.hash(this.password,8,(err,hash)=>{
// //             if(err) return next(err);
// //             console.error('Error hashing password:', err);
// //             this.password=hash;
// //             next();
// //         })
// //     }else{
// //         next();
// //     }
// // })
// userSchema.pre('save', function(next) {
//   if (this.isModified('password')) {
//     console.log('Password is being hashed...');
//     bcrypt.hash(this.password, 8, (err, hash) => {
//       if (err) {
//         console.error('Error hashing password:', err);
//         return next(err);
//       }
//       console.log('Hashed password:', hash);
//       this.password = hash;
//       next();
//     });
//   } else {
//     next();
//   }
// });


// userSchema.methods.isValidPassword = async function (password) {
//     try {
//       return await bcrypt.compare(password, this.password);
//     } catch (error) {
//       throw createHttpError.InternalServerError(error.message);
//     }
//   };

// const User=mongoose.model("User",userSchema) 
// // change
// module.exports=User

const mongoose=require('mongoose')
const  bcrypt=require('bcrypt')

const {roles}=require('../utils/constants')
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [roles.admin, roles.client], default: roles.client },
  department:{type:String,required:true},
  uploadedFiles: [{
      filename: String,
      url: String,
      date: String, // Or Date, depending on how you want to store dates
      description: String,
      upload_by: String,
      department: String
  }]
});

userSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,8,(err,hash)=>{
            if(err) return next(err);
            this.password=hash;
            next();
        })
    }else{
        next();
    }
})

userSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  };

const User=mongoose.model("users",userSchema)
module.exports=User