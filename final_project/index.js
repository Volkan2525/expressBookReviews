const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

//app.use("/login",customer_routes);

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    //console.log(req.session.authorizarion);
    /*let user = req.body.username;
    let accessToken = jwt.sign({data:password},"access",60);
    req.session.authorizarion = {
        accessToken, user
    }*/
    let result = jwt.verify(res.header["auth"],"access",{complete:true});
    console.log(result);
    if(result)
        next();
});
 
const PORT =5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
