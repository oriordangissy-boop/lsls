const http=require("node:http"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),port=Number(process.env.PORT||8080);
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml",".json":"application/json; charset=utf-8",".txt":"text/plain; charset=utf-8"};
const server=http.createServer((req,res)=>{
 if(req.method!=="GET"&&req.method!=="HEAD"){res.writeHead(405);res.end();return;}
 let name;try{name=decodeURIComponent(new URL(req.url,"http://localhost").pathname);}catch{res.writeHead(400);res.end("Invalid URL");return;}
 if(name.endsWith("/"))name+="index.html";
 const file=path.resolve(root,"."+name),ext=path.extname(file);
 if(!file.startsWith(root+path.sep)||!types[ext]||name.split("/").some(part=>part.startsWith("."))){res.writeHead(404);res.end("Not found");return;}
 fs.stat(file,(error,stat)=>{
  if(error||!stat.isFile()){res.writeHead(404);res.end("Not found");return;}
  res.writeHead(200,{"Content-Type":types[ext],"Content-Length":stat.size,"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});
  if(req.method==="HEAD"){res.end();return;}fs.createReadStream(file).on("error",()=>res.destroy()).pipe(res);
 });
});
server.on("error",e=>{console.error(e.code==="EADDRINUSE"?"Port "+port+" is in use. Open the existing preview or set PORT to a different port.":e.message);process.exitCode=1;});
server.listen(port,"127.0.0.1",()=>console.log("TIMEPIECE preview: http://127.0.0.1:"+port+"/\nPress Ctrl+C to stop."));

