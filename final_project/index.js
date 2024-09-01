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
let err= "";
if(!req.session.auth)
    return res.status(403).json({"message":"auth error"});
    
    jwt.verify(req.session.auth["accessToken"],"access",(err) => {
        if(!err){
            res.status(200).json({"message":"auth ok"});
            next();       
        }
        else
            res.status(403).json({"message":"auth error"})
    });
});
 
const PORT =5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
