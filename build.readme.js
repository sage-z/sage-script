const readline = require('readline');
const path = require('path');
const fs = require('fs');
const os = require('os');

let filepath = path.join(__dirname, "./src/is/business.ts")
let fWrite = fs.createWriteStream('./abc.md')
const rl = readline.createInterface({
    input: fs.createReadStream(filepath),
    // output: fWrite,
    terminal: true
});


function output() {
    let lineObj = {
        status: 0 ,
        data: {}
    }
    input = (line) => {
        const name = line.indexOf('@name')
        const description = line.indexOf('@description')
        if (name !== -1) {
            lineObj.status = lineObj.status + 1
            lineObj.data.name = line.substring(name + 5)
        }
        if (description !== -1) {
            if (lineObj.status === 0) return new Error("错了啊！！！！！！")
            lineObj.data.description = line.substring(description + 12)
            fWrite.write(`${lineObj.data.name} | ${lineObj.data.description}`+ os.EOL)
            lineObj.status = 0
        }
    }
    close = (line) => {
        // console.log("读取完毕！"+ line);
    }
    return {
        input,
        close
    }
}
const Output = new output()
// console.log(a.input)

rl.on('line', Output.input);
rl.on('close', Output.close);