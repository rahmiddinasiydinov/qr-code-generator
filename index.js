import inquirer from "inquirer";
import qr from 'qr-image';
import fs from 'fs';
/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
inquirer
  .prompt([
    /* Pass your questions in here */
    {message:"Enter url", name: 'url'}
  ])
  .then((answers) => {
    console.log(answers)
    const qrImage = qr.image(answers.url, {type: 'png'});
    fs.writeFile('urls.txt', answers.url, (err) => {
        if(err) throw err;
        console.log('url is saved!')
    })
    qrImage.pipe(fs.createWriteStream('qrImage.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log('Prompt error')
    } else {
      // Something else went wrong
      console.log('Other')
    }
  });

