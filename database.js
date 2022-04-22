import pkg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import csvwriter from 'csv-writer'
dotenv.config();

const { Pool } = pkg;

const db = new Pool({
    connectionString: process.env.DATABASE_URL
});

    const{rows:result} = await db.query(`
        SELECT * FROM repositories WHERE "hasSponsorship"=true
    `);
   const createJson= JSON.stringify(result);

    fs.writeFile("sponsored-repos.json",createJson,function (err,result){
        if(err) console.log(err)
    })

    var createCsvWriter = csvwriter.createObjectCsvWriter
  

    const most_famous_sponsored_repos = createCsvWriter({
  
  
    path: 'geek_data.csv',
    
    header: [
  
    
    {id: 'id', title: 'ID'},
    {id: 'topic', title: 'TOPIC'},
    {id: 'name', title: 'NAME'},
    {id: 'owner', title: 'OWNER'},
    {id: 'ownerType', title: 'OWNERTYPE'},
    {id: 'fullName', title: 'FULLNAME'},
  ]
});
most_famous_sponsored_repos
  .writeRecords(result)
  .then(()=> console.log('Data uploaded into csv successfully'));

   



    

