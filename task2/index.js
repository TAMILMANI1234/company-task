const express =require('express');
const bodyParser=require('body-parser');
const fs =require('fs');

const app =express();
const PORT=8080;


app.use(bodyParser.json()); // Middleware for parsing JSON data


//load data.json
let data=[];

try{
  data =JSON.parse(fs.readFileSync('data.json'));
}catch(err){
    console.error(`Error on file ${err}`);
}


//Create operation
app.post("/api/insert",(req,res)=>{
   const newdata=req.body;
   data.push(newdata);
   fs.writeFile("data.json",JSON.stringify(data),(err)=>{
      if(err){
        console.error("Error on insert");
        res.status(500);
      }
      else{
        res.status(200).send("Data insterted.....");
      }
   })
});


//display
app.get("/api/display",(req,res)=>{
   res.json(data);
});

//delete

app.delete("/api/delete:id",(req,res)=>{
   const id =req.params.id;
   const index=data.findIndex(item=>item.id===id);
   if(index !==-1){
     data.splice(index,1);
     fs.writeFile("data.json",JSON.stringify(data),(err)=>{
        if(err){
            console.error("error on deleting");
            res.status(500).send("error on deleting");
        }
        else{
            res.status(200).send("deleted success")
        }
     })
   }
   else{
    res.status(404).send("no date")
}
});

//update
app.put("/api/update:id",(req,res)=>{
    const id =req.params.id;
    const body =req.body;
    const index=data.findIndex(item=>item.id===id);
    if(index !==-1){
      data[index]=newdata;
      fs.writeFile("data.json",JSON.stringify(data),(err)=>{
         if(err){
             console.error("error on deleting");
             res.status(500).send("error on upadate");
         }
         else{
             res.status(200).send("update success")
         }
      })
    }
    else{
        res.status(404).send("no date")
    }
 });
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
});