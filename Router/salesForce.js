const router = require('express').Router();
const jsforce = require('jsforce');
const Account = require('../models/account.model');
const SalesforceUser = require('../models/user.model');




const {SF_LOGIN_URL,SF_PASSWORD,SF_USERNAME,SF_TOKEN} = process.env;


const salesForceConnection = async () =>{
  try{
    const conn  = new jsforce.Connection({
        loginUrl: SF_LOGIN_URL
    });
// console.log("information",name,email);
    //   const userInfo = await conn.login(SF_USERNAME, SF_PASSWORD+SF_TOKEN);
   
   // create new Account
    //   conn.sobject("Account").create({ name}, function(err, ret) {
    //     if (err || !ret.success) { return console.error(err, ret); }
    //     console.log("Created record id : " + ret.id);
    //     // ...
    //   });

    // reterive account api
    //  conn.sobject("Account").findOne({name}).execute((err, account) => {
    //      if(err){
    //          console.error(err)
    //          return ;
    //      }
    //      if(account){
    //          // delete acount 
    //         console.log("accoutId",account)
    //         conn.sobject("Account").destroy(`${account.Id}`,(err,del)=>{
    //             if(err){
    //                 console.log(err)
    //             }
    //             console.log("account deleted",del);
    //         })
    //      }
    //     //  console.log("accounts",account)
    //  })  

  
    return conn;


  }catch(err){
    console.log(err);
    return err;
  }
   }



//-----create Account------
router.post('/create',async(req,res) => {
    try{
    const conn = req.app.get("conn");
     const account = await conn.sobject("Account").create(req.body);
     if(account){
         console.log("account");
         res.send(account);
     }


    }catch(err){
        console.log(err);
        res.send(err);
    }
})

//------ get all Accounts------
router.get('/',async (req,res)=>{
    try{
        const conn = req.app.get('conn');
        conn.sobject("Account").find().sort({"CreatedDate":-1}).execute((err, account) => {
                 if(err){
                     console.error(err)
                 }
                 res.send(account);


    });
}catch(err){
        console.error(err);
        res.send(err);
    }
})

//----Update account----
router.put('/update',async (req,res)=>{
    try{
        const conn = req.app.get('conn');
        const {Id, ...others} = req.body;
      const update = await conn.sobject("Account").findOne({Id}).update(others);
      if(update){
          res.send(update);
      }

    }catch(err){
        console.log(err);
        res.send(err.message)
    }
})

//----delete Account------
router.delete('/',async (req,res)=>{
    try{
        const conn = req.app.get('conn');
        const del = await conn.sobject("Account").findOne({id:req.body.Id}).destroy();
        if(del){
            res.send(del);
        }

    }catch(err){
        console.error(err);
        res.send(err);
    }

})

//-----login--------------------
router.post('/login', async (req, res)=>{
    try{
        // const conn = await salesForceConnection();
     const conn = req.app.get('conn');
        if(conn){
            const user = await conn.login(req.body.userName, req.body.password+SF_TOKEN);
            console.log(user);
             if(user){
                 let obj = {userLogin:true,connection:true,userId:user.id};
                 const salesforceUser = new SalesforceUser(obj);
                 const created = await salesforceUser.save();
                 if(created){
                     res.send(created);
                 }
             }
        }
        

    }catch(err){
        console.error(err);
        res.send(err);
    }

})



module.exports = router;