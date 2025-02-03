const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function promptUser(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

async function main() {
    let newCodec;
    let changeCodec = 'changeCodec';
    while(changeCodec.toLowerCase()!= "yes" && changeCodec.toLowerCase() != 'no') {
        changeCodec= await promptUser("Is codec change required (Yes/No): ");
    }
    const CodecChange = changeCodec==="Yes"?true:false;
    if(CodecChange) {
        newCodec = await promptUser("New Codec: ");
    }
    const fromValue = await promptUser("Enter the source file extension (e.g., mkv): ");
    const toValue = await promptUser("Enter the target file extension (e.g., mp4): ");
    const fromFolder = await promptUser("Enter the source folder name: ");
    const toFolder = await promptUser("Enter the target folder name: ");

    rl.close();


    function convertFunctionsSameCodec(inputFolder, outputFolder) {
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }

        fs.readdir(inputFolder, (err, files) => {
            if (err) {
                console.error(`Error reading input folder: ${err.message}`);
                return;
            }

            files.filter(file => file.endsWith(`.${fromValue}`)).forEach(file => {
                const inputFile = path.join(inputFolder, file);
                const outputFile = path.join(outputFolder, file.replace(`.${fromValue}`, `.${toValue}`));

                const command = `ffmpeg -i "${inputFile}" -codec copy "${outputFile}"`;

                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error converting ${file}: ${error.message}`);
                        return;
                    }

                    if (stderr) {
                        console.error(`FFmpeg error for ${file}: ${stderr}`);
                        return;
                    }

                    console.log(`Conversion successful! Output file: ${outputFile}`);
                });
            });
        });
    }

    function convertFunctionsNewCodec(inputFolder, outputFolder, newcodec) {
        let codecname = "mp3";
        if(newcodec.toLowerCase() ==="mp3") {
            codecname = "libmp3lame -ab 128k";
        } else if(newcodec.toLowerCase()==="wav"){
            codecname = "pcm_s16le -ar 44100 -ac 2";
        }

        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true });
        }

        fs.readdir(inputFolder, (err, files) => {
            if (err) {
                console.error(`Error reading input folder: ${err.message}`);
                return;
            }

            files.filter(file => file.endsWith(`.${fromValue}`)).forEach(file => {
                const inputFile = path.join(inputFolder, file);
                const outputFile = path.join(outputFolder, file.replace(`.${fromValue}`, `.${toValue}`));

                const command = `ffmpeg -i "${inputFile}" -acodec "${codecname}"  "${outputFile}"`
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error converting ${file}: ${error.message}`);
                        return;
                    }

                    if (stderr) {
                        console.error(`FFmpeg error for ${file}: ${stderr}`);
                        return;
                    }

                    console.log(`Conversion successful! Output file: ${outputFile}`);
                });
            });
        });
    }

    const inputFolder = path.resolve(__dirname, fromFolder);
    const outputFolder = path.resolve(__dirname, toFolder);

    if(!CodecChange)
        convertFunctionsSameCodec(inputFolder, outputFolder);
    else if(CodecChange)
        convertFunctionsNewCodec(inputFolder, outputFolder, newCodec)
}

main();
