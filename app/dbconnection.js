const mysql=require('mysql');
const connection= mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password: '7700',
    database: 'blildata',
    multipleStatements: true
  
  })
  connection.connect(function(error){
      if(error)throw error
      else console.log('connected to mysql database')
  })

 

  module.exports=connection
  