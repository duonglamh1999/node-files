const fs = require('fs');
const process = require('process');
const axios = require('axios')

const handleOutput = (text,out) =>{
  if (out){
    fs.writeFile(out,text,'utf8', (err)=> {
      if (err){
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
      else{
        console.log(text)
      }
    })
  }
}

const cat =( path)=> {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
      } else {
        console.log(data);
      }
    });
  }

  
const webCat = async(URL) =>{
   try {
    let res = await axios.get(URL)
    console.log (res)
   }
   catch(e){
    console.error(e)
    process.exit(1)
   }
}
  

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path);
} else {
  cat(path);
}