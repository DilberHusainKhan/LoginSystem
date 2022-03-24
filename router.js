var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();

const credential = {
    email:"dilberjmi@gmail.com",
    password:"12345"
}


//login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login sucessful"+req.body.email);
    }else{
        res.end("Invalid Username"); 
        
    }
});

// route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{
            user:req.session.user
        })
    }else{
        res.send("Unauthorized User")
    }
})

// route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err) {
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{
                title:'Expess',
                logout:"Logout Successfully...!"
            })
        }
    })
})

module.exports = router;