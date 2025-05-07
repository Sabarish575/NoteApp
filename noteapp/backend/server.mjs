import http from "http";

import { randomUUID } from "crypto";
const PORT=5000;

let ans=[]

const CORSPOLICY=(res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

const VIEWFILE=(res)=>{

    res.writeHead(200,{"content-type":"application/json"});
    res.end(JSON.stringify(ans));
}

const ADDFILE=((req,res)=>{


    let body="";
    req.on("data",chunks=>body+=chunks)
    req.on("end",()=>{
        const {data}=JSON.parse(body);
        ans.push({id:randomUUID(),data})
        res.end("Added Successfully...")
    })
})

const UPDATEDFILE=((req,res)=>{

    const id=req.url.split("/")[2]

    let body='';
    req.on("data",chunks=>body+=chunks);
    req.on("end",()=>{
        const {data}=JSON.parse(body);
        console.log(data);
    
        ans=ans.map((ans)=>{
            if(ans.id===id){

                return{
                    ...ans,data
                }
            }
        })
    })
    res.end("Updated SuccessFully..")
})

const DELETEFILE=((req,res)=>{
    const id=req.url.split("/")[2];


    ans=ans.filter((ans)=> id!==ans.id);

    res.end("Deleted Successfully")
})

const server=http.createServer((req,res)=>{

    CORSPOLICY(res);

    if(req.method==="OPTIONS"){
        res.writeHead(204);
        res.end();
        return;
    }

    if(req.method==="GET" && req.url==="/VIEW"){
        VIEWFILE(res);
    }

    else if(req.method==="POST" && req.url==="/ADD"){
        ADDFILE(req,res);
    }
    else if(req.method==="PUT" && req.url.startsWith("/UPDATE/")){
        UPDATEDFILE(req,res);
    }

    else if(req.method==="DELETE" && req.url.startsWith("/DELETE/")){
        DELETEFILE(req,res);
    }
    
    else{
        res.writeHead(404,{"content-type":"text/plain"});
        res.end("Not Found");
    }
})


server.listen(PORT,()=>{
    console.log("server is started and running in",PORT);  
})