let fs = require('fs');

class utils {
   static print(message) {
        console.log(`Error Message ${message}`);
    }

    static readJsonFile(fileName, callback){
        fs.readFile('personData.json', 'utf8', (error, data)=>{
            callback(data);
        });
    }
}

module.exports = utils;