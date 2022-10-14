const mysql=require('mysql');
const express= require('express');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const userprofile = express();
const connection=require('c:/Users/jayad/Desktop/BLIL/app/dbconnection')
const nodemailer = require('nodemailer');

userprofile.use(flash());
userprofile.use(bodyParser.json());
userprofile.use(session({ 
    secret: '123456catr', 
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


userprofile.post('/sendemail', function(req, res) {
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'orumpatisaikrishna00@gmail.com',
        pass: 'joqxwhbuyaebhzgz',
    },
});
const mailOptions = {
    from: 'orumpatisaikrishna00@gmail.com',
    to: 'deepumettela007@gmail.com',
    subject: 'hello world!',
    text: 'Email notification is working',
};
transport.sendMail(mailOptions, (error,info) => {
    if (error) {
        console.log(error);
        return
    }
    res.status(200).json({
      message:info.response
    })
    console.log("Sent: "+ info.response);
});

});


//Create

userprofile.post('/create', function(req, res) {

  var MiddleName= req.body.MiddleName;
  var LastName=req.body.LastName;
  var EmergencyFullName= req.body.EmergencyFullName;
  var EmergencyContactNumber=req.body.EmergencyContactNumber;
  var DateofBirth=req.body.DateofBirth;
  var Nationality=req.body.Nationality;
  var WardNumber=req.body.WardNumber;
  var MobileNumber=req.body.MobileNumber;
  var Email=req.body.Email;
  var AddressType=req.body.AddressType;
  var State=req.body.State;
  var Postal=req.body.Postal;
  var MaritalStatus=req.body.MaritalStatus;
  var District=req.body.District;
  var Gender=req.body.Gender;
  var Relationship=req.body.Relationship;
  var HaveInsurance=req.body.HaveInsurance;
  var InsuranceDetails=req.body.InsuranceDetails;
  var Id=req.body.Id;
  var BlockNumber=req.body.BlockNumber;
  var Location=req.body.Location;
  var Type=req.body.Type;
  var Age=req.body.Age;
  var TestType=req.body.TestType;
  var TestResult=req.body.TestResult;
  var Status=req.body.Status;
  var Date=req.body.Date;
  var Slot=req.body.Slot;
  var Doctor=req.body.Doctor;
  var PatientId=req.body.PatientId;
  var TestGroup=req.body.TestGroup;
  var TestName=req.body.TestName;
  var DocPageStatus=req.body.DocPageStatus;
  var FilePath=req.body.FilePath;
  var Description=req.body.Description;
  var PatientEmail=req.body.PatientEmail;
  var Subject=req.body.Subject;
  var Text=req.body.Text;
  var BlilEmail=req.body.BlilEmail;
  var DoctorEmail=req.body.DoctorEmail;
  var FirstName= req.body.FirstName;


  var sql = `INSERT INTO  blildata.bliluserdata (MiddleName,LastName,EmergencyFullName,EmergencyContactNumber,DateofBirth,Nationality,WardNumber,MobileNumber,Email,AddressType,State,Postal, 
    MaritalStatus,District,Gender,Relationship,HaveInsurance,InsuranceDetails,Id,BlockNumber,Location,Type,Age,TestType,TestResult, 
    Status,Date,Slot,Doctor,PatientId,TestGroup,TestName,DocPageStatus,FilePath,Description,PatientEmail,Subject,Text,BlilEmail,DoctorEmail,FirstName) VALUES 
   ("${MiddleName}","${LastName}","${EmergencyFullName}","${EmergencyContactNumber}","${DateofBirth}","${Nationality}","${WardNumber}","${MobileNumber}","${Email}","${AddressType}","${State}", 
   "${Postal}","${MaritalStatus}","${District}","${Gender}","${Relationship}","${HaveInsurance}","${InsuranceDetails}","${Id}","${BlockNumber}","${Location}","${Type}","${Age}","${TestType}","${TestResult}",
   "${Status}","${Date}","${Slot}","${Doctor}","${PatientId}","${TestGroup}","${TestName}","${DocPageStatus}","${FilePath}","${Description}","${PatientEmail}","${Subject}","${Text}","${BlilEmail}","${DoctorEmail}","${FirstName}")`;
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
});

//Read

userprofile.get('/read',  (req, res)=> {
  console.log('working')
    connection.query('SELECT * FROM blildata.bliluserdata;', function (err, results, fields) {
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

  //InProgress count in DoctorPage

  userprofile.get('/inprogresscount/:Email',(req, res)=> {
    const fetchmail=req.params.Email;
      connection.query('SELECT * FROM blildata.bliluserdata WHERE Email=?',fetchmail, function (err, results, fields) {
       if(!err) { 
        var data=JSON.parse(JSON.stringify(results));
        let vv = data.filter(x=> x.DocPageStatus == 'InProgress')
        var obtaindata =vv
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
 
//Assign back to BLIL in DoctorPage

    userprofile.get('/assignbacktoblilcount/:Email',(req, res)=> {
      const fetchmail=req.params.Email;
        connection.query('SELECT * FROM blildata.bliluserdata WHERE Email=?',fetchmail, function (err, results, fields) {
         if(!err) { 
          var data=JSON.parse(JSON.stringify(results));
          let vv = data.filter(x=> x.DocPageStatus == 'Assign back to BLIL')
          var obtaindata =vv
          console.log(obtaindata)
          res.status(200).json({data:obtaindata ,
           message :'Data of Assign bact to BLIL'})
           console.log('Data of Assign bact to BLIL');
         }else{
          res.status(400).json({
            message:err
           })
         }
       });
      });


//Completed count in DoctorPage

      userprofile.get('/completedcount/:Email',(req, res)=> {
        const fetchmail=req.params.Email;
          connection.query('SELECT * FROM blildata.bliluserdata WHERE Email=?',fetchmail, function (err, results, fields) {
           if(!err) { 
            var data=JSON.parse(JSON.stringify(results));
            let vv = data.filter(x=> x.DocPageStatus == 'Completed')
            var obtaindata =vv
            console.log(obtaindata)
            res.status(200).json({data:obtaindata ,
             message :'Data of Completed'})
             console.log('Data of Completed');
           }else{
            res.status(400).json({
              message:err
             })
           }
         });
        });
      
  
        //Open count in DoctorPage

        userprofile.get('/opencount/:Email',(req, res)=> {
          const fetchmail=req.params.Email;
            connection.query('SELECT * FROM blildata.bliluserdata WHERE Email=?',fetchmail, function (err, results, fields) {
             if(!err) { 
              var data=JSON.parse(JSON.stringify(results));
              let vv = data.filter(x=> x.DocPageStatus == 'Open')
              var obtaindata =vv
              console.log(obtaindata)
              res.status(200).json({data:obtaindata ,
               message :'Data of Open'})
               console.log('Data of Open');
             }else{
              res.status(400).json({
                message:err
               })
             }
           });
          }); 

  //getting all records which are assigned to the doctor email

  userprofile.get('/getdoctdatatodocportal/:Email',(req, res)=> {
    const fetchmail=req.params.Email;
      connection.query('SELECT * FROM blildata.bliluserdata WHERE Email=?',fetchmail, function (err, results, fields) {
       if(!err) { 
        var data=JSON.parse(JSON.stringify(results));
        var obtaindata =data
        console.log(obtaindata)
        res.status(200).json({data:obtaindata ,
         message :"Data by Email" })
         console.log('Fetch by Email is working');
       }else{
        res.status(400).json({
          message:err
         })
       }
     });
    });

  //update all patient details by DocId

  /*userprofile.put('/update',  (req, res)=> {
    connection.query('UPDATE `bliluserdata` SET `MiddleName`=?,`LastName`=?,`EmergencyFullName`=?,`EmergencyContactNumber`=?,`DateofBirth`=?,`Nationality`=?,`WardNumber`=?,`MobileNumber`=?,`Email`=?,`AddressType`=?,`State`=?,`Postal`=?,`MaritalStatus`=?,`District`=?,`Gender`=?,`Relationship`=?,`HaveInsurance`=?,`InsuranceDetails`=?,`Id`=?,`BlockNumber`=?,`Location`=?,`Type`=?,`Age`=?,`TestType`=?,`TestResult`=?,`Status`=?,`Date`=?,`Slot`=?,`Doctor`=?,`PatientId`=?,`TestGroup`=?,`TestName`=?,`DocPageStatus`=?,`FilePath`=?,`Description`=?,`PatientEmail`=?,`Subject`=?,`Text`=?,`BlilEmail`=?,`DoctorEmail`=?,`FirstName`=? where `DocId`=?',
     [ req.body.MiddleName,req.body.LastName,req.body.EmergencyFullName,req.body.EmergencyContactNumber,req.body.DateofBirth,req.body.Nationality,req.body.WardNumber,req.body.MobileNumber,req.body.Email,req.body.AddressType,req.body.State,req.body.Postal,req.body.MaritalStatus,req.body.District,req.body.Gender,req.body.Relationship,req.body.HaveInsurance,req.body.InsuranceDetails,req.body.Id,req.body.BlockNumber,req.body.Location,req.body.Type,req.body.Age,req.body.TestType,req.body.TestResult,req.body.Status,req.body.Date,req.body.Slot,req.body.Doctor,req.body.PatientId,req.body.TestGroup,req.body.TestName,req.body.DocPageStatus,req.body.FilePath,req.body.Description,req.body.PatientEmail,req.body.Subject,req.body.Text,req.body.BlilEmail,req.body.DoctorEmail,req.body.FirstName, req.body.DocId], 
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
  });*/

//update patient timings and details  by the doctor

  userprofile.put('/updatedoctorportal',  (req, res)=> {
    
    connection.query('UPDATE `bliluserdata` SET `Date`=?,`Slot`=?,`TestName`=?,`TestGroup`=? where `DocId`=?',
     [ req.body.Date,req.body.Slot,req.body.TestName,req.body.TestGroup, req.body.DocId],
   function(err, results, fields) {
       if(!err) { 
        var data=JSON.parse(JSON.stringify(results));
        var updatedata =data
        console.log(updatedata)
        res.status(200).json({data:updatedata ,
           message:"Data Updated by DocId" })
         console.log('Data is updated by DocId');
       }else{
        res.status(400).json({
          message:err
         })
       }
     });
  });

  
  //Delete

  userprofile.delete('/delete/:DocId', (req, res)=> {
    const docid=(req.params.DocId)
    connection.query('DELETE FROM `bliluserdata` WHERE `DocId`=?',docid, function (err, results, fields) {
       if (!err) { 
        var data=JSON.parse(JSON.stringify(results));
        var deletedata =data
        console.log(deletedata)
        res.status(200).json({data:deletedata ,
           message:"Data Deleted"})
         console.log('Data is Deleted');
       }else{
        res.status(400).json({
          message:err
         })
       }
     });
  });



//login post api

/*signup.post('/verify',  (req, res)=> {

    var mail=req.body.Mail;
    var password=req.body.Password;

    var sql="SELECT Password FROM userdata WHERE Mail='"+mail+"'" ;

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
  });*/




  
module.exports=userprofile