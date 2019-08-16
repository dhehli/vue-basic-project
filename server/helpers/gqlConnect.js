const config = require('config');
const http = require('http');

const gqlconnect = (path, data) => {
  const options = {
    ...config.get("gql"),
    path
  }

  const stringifiedData = JSON.stringify(data)

  return new Promise((resolve, reject) => {
    const httpreq  = http.request(options, response => {
      let serverResponse = "";
  
      response.on("data", chunk => {
        serverResponse += chunk;
      });
  
      response.on("end", () => {
        resolve(JSON.parse(serverResponse))        
      });
  
      response.on("error", err => {
        reject(err)
      })
  
    });
    httpreq.write(stringifiedData);
    httpreq.end();
  })
}

module.exports = gqlconnect;