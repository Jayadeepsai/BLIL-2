const mysql=require('mysql');
const express= require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const signup = express.Router();
const connection=require('c:/Users/jayad/Desktop/BLIL/app/dbconnection')

signup.use(flash());
signup.use(bodyParser.json());
signup.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


/*signup.post('/insert', function(req, res) {
console.log('working')
    var FirstName= req.body.FirstName;
    var LastName=req.body.LastName;
    var Age=req.body.Age;
    var Gender=req.body.Gender;
    var Location=req.body.Location;
    var PhoneNo=req.body.PhoneNo;
    var Email=req.body.Email;
    var Eac=req.body.Eac;
    var Pincode=req.body.Pincode;
    var Subject=req.body.Subject;
    var Data=req.body.Data;
    var Type=req.body.Type;
    var Password=req.body.Password;
    var About=req.body.About;

    var sql = `INSERT INTO  blildata.blilusersignupdata (FirstName,LastName,Age,Gender,Location,PhoneNo,Email,Eac,Pincode,Subject,Data,Type,Password,About) VALUES 
     ("${FirstName}","${LastName}","${Age}","${Gender}","${Location}","${PhoneNo}","${Email}","${Eac}","${Pincode}","${Subject}","${Data}","${Type}","${Password}","${About}")`;
   // console.log(sql)
   connection.query(sql, function(err, result){
    if(!err) { 
      var data=JSON.parse(JSON.stringify(result));
      console.log(data)
      res.status(200).json({ data:data, 
        message:"Data posted" })
       console.log('Post is working');
     }else{
      res.status(400).json({
        message:err
       })
     }
    });
    });*/


//Read

signup.get('/read',  (req, res)=> {
  console.log('working')
    connection.query('SELECT * FROM blildata.blilusersignupdata;', function (err, results, fields) {
     if(!err) { 
      var data=JSON.parse(JSON.stringify(results));
      var obtaindata =data
      console.log(obtaindata)
      res.status(200).json({data:obtaindata ,
       message :" All Data" })
       console.log('Get is working');
     }else{
      res.status(400).json({
        message:err
       })
     }
   });
  });

  //update

  signup.put('/put',  (req, res)=> {
    connection.query('UPDATE `blilusersignupdata` SET `FirstName`=?,`LastName`=?,`Age`=?,`Gender`=?,`Location`=?,`PhoneNo`=?,`Eac`=?,`Pincode`=?,`Subject`=?,`Data`=?,`Type`=?,`Password`=?,`About`=? where `Email`=?',
     [ req.body.FirstName,req.body.LastName,req.body.Age,req.body.Gender,req.body.Location,req.body.PhoneNo,req.body.Eac,req.body.Pincode,req.body.Subject,req.body.Data,req.body.Type,req.body.Password,req.body.About,req.body.Email], 
     (err, results, fields) =>{
       if(!err) { 
        var data=JSON.parse(JSON.stringify(results));
        var updatedata =data
        console.log(updatedata)
        res.status(200).json({data:updatedata ,
           message:"Data Updated" })
         console.log('Data is updated');
       }else{
        res.status(400).json({
          message:err
         })
       }
     });
  });
  
  //Delete register data based on id

  signup.delete('/deleteregisterdata/:DocId', (req, res)=> {
    const fetchId = req.params.DocId
    connection.query('DELETE FROM `blilusersignupdata` WHERE `DocId`=?', fetchId, function (err, results, fields) {
       if (err) { 
        res.status(400).json({
          message:err
         })
    
       }else{
        if(results == null){
          res.send("wrong")
     
        }else{
          var data=JSON.parse(JSON.stringify(results));
          var deletedata =data
        
          res.status(200).json({data:deletedata ,
             message:"Data Deleted"})
           console.log('Data is Deleted');
        }
       }
     });
  });



//login post api

/*signup.post('/verify',  (req, res)=> {

    var mail=req.body.Email;
    var password=req.body.Password;

    var sql="SELECT Password FROM blilusersignupdata WHERE Email='"+mail+"'" ;

    connection.query(sql, function(err, result){
     if(!err){
       var data=JSON.parse(JSON.stringify(result));
       var obtainPassword=data[0].Password
       console.log(obtainPassword)
       if(password === obtainPassword ){
         console.log('Logged in successfully');
         res.status(200).json({
          message:" login successfull"
        })
       }else{
        res.status(400).json({
         message:"Login failed, Incorrect Password",
        })
        console.log('Login failed, Incorrect Password');
       }
       }
    });
  });
*/


//get only blilmanager register data

  signup.get('/getblilregisterdata',  (req, res)=> {
    console.log('working')
      connection.query('SELECT * FROM blildata.blilusersignupdata', function (err, results, fields) {
       if(!err) { 
        var data=JSON.parse(JSON.stringify(results));
        var obtaindata =data
        var filter =obtaindata.filter(x =>x.Type =="blilmanager")
        console.log(filter)
        res.status(200).json({data:filter ,
         message :" Type Data" })
         console.log('Get is working');
       }else{
        res.status(400).json({
          message:err
         })
       }
     });
    });



    //get profile details dased on given email
    signup.get('/profile/:Email',(req, res)=> {
      const fetchmail=req.params.Email;
        connection.query('SELECT * FROM blildata.blilusersignupdata WHERE Email=?',fetchmail, function (err, results, fields) {
         if(!err) { 
          var data=JSON.parse(JSON.stringify(results));
          var obtaindata =data
          console.log(obtaindata)
          res.status(200).json({data:obtaindata ,
           message :'InProgress count'})
           console.log('InProgress count');
         }else{
          res.status(400).json({
            message:err
           })
         }
       });
      });


      signup.put('/updateRegister/:DocId',  (req, res)=> {
        const fetchId=req.params.DocId;
        const lastname=req.body.LastName;
        const age=req.body.Age;
        const gender=req.body.Gender;
        const location=req.body.Location;
        const phoneno=req.body.PhoneNo;
        const email=req.body.Email;
        const eac=req.body.Eac;
        const pincode=req.body.Pincode;
        const subject=req.body.Subject;
        const data=req.body.Data;
        const type=req.body.Type;
        const password=req.body.Password;
        const about=req.body.About;
        const firstname=req.body.FirstName;
        connection.query('UPDATE `blilusersignupdata` SET `LastName`=?,`Age`=?,`Gender`=?,`Location`=?,`PhoneNo`=?,`Email`=?,`Eac`=?,`Pincode`=?,`Subject`=?,`Data`=?,`Type`=?,`Password`=?,`About`=?,`FirstName`=? where `DocId`=?',
         [ lastname,age,gender,location,phoneno,email,eac,pincode,subject,data,type,password,about,firstname,fetchId], 
         function(err, results, fields){
           if(!err) { 
            var data=JSON.parse(JSON.stringify(results));
            var updatedata =data
            console.log(updatedata)
            res.status(200).json({data:updatedata ,
               message:"Data Updated" })
             console.log('Data is updated');
           }else{
            res.status(400).json({
              message:err
             })
           }
         });
      });



      
      signup.put('/updateProfile/:Email',  (req, res)=> {
        const fetchEmail=req.params.Email;
        const lastname=req.body.LastName;
        const age=req.body.Age;
        const gender=req.body.Gender;
        const location=req.body.Location;
        const phoneno=req.body.PhoneNo;
        const email=req.body.Email;
        const eac=req.body.Eac;
        const pincode=req.body.Pincode;
        const subject=req.body.Subject;
        const data=req.body.Data;
        const type=req.body.Type;
        const password=req.body.Password;
        const about=req.body.About;
        const firstname=req.body.FirstName;
        connection.query('UPDATE `blilusersignupdata` SET `LastName`=?,`Age`=?,`Gender`=?,`Location`=?,`PhoneNo`=?,`Email`=?,`Eac`=?,`Pincode`=?,`Subject`=?,`Data`=?,`Type`=?,`Password`=?,`About`=?,`FirstName`=? where `Email`=?',
         [ lastname,age,gender,location,phoneno,email,eac,pincode,subject,data,type,password,about,firstname,fetchEmail], 
         function(err, results, fields){
           if(!err) { 
            var data=JSON.parse(JSON.stringify(results));
            var updatedata =data
            console.log(updatedata)
            res.status(200).json({data:updatedata ,
               message:"Data Updated" })
             console.log('Data is updated');
           }else{
            res.status(400).json({
              message:err
             })
           }
         });
      });

module.exports=signup