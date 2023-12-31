const User = require('../model/user');

const insertUser = (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
    }

    User.getUser(user.email,(err,results)=>{
        if(!err){
            if(results){
                res.send("tum pahle se the bhai");
            }
            else{
                User.createUser(user,(err,results)=>{
                    if(!err){
                        res.send("ok");
                    } 
                });
            }
        } 
    });
};

const getuser = (req, res) => {
    const email =   req.body.email;
    
    User.getUser(email,(err,results)=>{
        if(!err){
            console.log(results);
          if(results){
            if(req.body.password==results.password)
            {
                req.session.email = email;   
                res.redirect('/');
            }
            else{
                res.send('incorrect password');
            }
          }
          else{
            res.send('user not found');
          }
          
        }
    });
};

const userLogout = (req, res) => {
    req.session.destroy((err)=>{
        if(err){
            res.send(err) ;
        }
        res.json({message:"logout success"});
    })
};

const viewlogin=(req,res)=>{
    res.render('login');
}
const viewsignup=(req,res)=>{
    res.render('signup');
}


module.exports = {insertUser,getuser,viewlogin,viewsignup,userLogout};