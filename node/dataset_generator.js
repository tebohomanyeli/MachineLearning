//Imports
const draw = require('../common/draw.js');
const constants=require('../common/constants.js')
const utils=require('../common/utils.js')

const { createCanvas } = require('canvas');
const canvas = createCanvas(400,400);
const ctx = canvas.getContext('2d')


//create the sample.json file
const filesystem = require('fs');

const fileNames = filesystem.readdirSync(constants.RAW_DIR);
const samples =[];
let id=1;
fileNames.forEach(fn => {
    const content = filesystem.readFileSync(constants.RAW_DIR + "/" + fn);

    const {session, student, drawings} = JSON.parse(content)

    //create sample.json
    for(let label in drawings){
        samples.push({
            id,
            label,
            student_name:student,
            student_id:session
        });

        const drawing_paths = drawings[label]
        //drawing data and saving it by it's id as name.
        filesystem.writeFileSync(constants.JSON_DIR + "/" + id + ".json", JSON.stringify(drawing_paths));

        //drawing the data and save the images in the image folder with id as name of each image.
        generateImageFile(constants.IMG_DIR  + "/" + id + ".png", drawing_paths);
        utils.printProgress(id,fileNames.length*8,"Processing Images")
        id++;        
    }   
});

//create sample.json
filesystem.writeFileSync(constants.SAMPLES, JSON.stringify(samples));


filesystem.writeFileSync(constants.SAMPLES_JS, "const samples="+JSON.stringify(samples)+";");


function generateImageFile(outFile, drawingPaths){
    ctx.clearRect(0,0,canvas.width,canvas.height) // clear the canvas everytime it runs
    draw.paths(ctx, drawingPaths);

    const buffer=canvas.toBuffer("image/png");
    filesystem.writeFileSync(outFile,buffer);
}