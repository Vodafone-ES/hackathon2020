const path = require('path');
const {exec} = require('child_process');


const fs = require('fs');
const fileNamePython = path.join(__dirname + '/tinderphone.py');

function getMatchesTerminals( answers ) {
  console.log(typeof answers);
  exec(`python3 ${fileNamePython} ${answers.join(' ')}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`File generate ok!!`);
    // PATH PRO ../dist/hackathon2020/assets/result.json
    // Path Local ../src/assets/result.json
    fs.copyFile(path.join(__dirname +'/tusMovilesGracias.json'), '../dist/hackathon2020/assets/result.json', (err) => {
      if (err) {
        console.log("Error Found:", err);
      } else {
        console.log("\nFile Contents of copied_file");
      }
    })
  });
}

module.exports = getMatchesTerminals;




