# Working with the Data

In this project, we will be working with Node.js to manage and manipulate our data. Here are the steps to accomplish this:

## Step 1: Verify Node.js Version and Navigate to Project Directory
First, ensure you have Node.js installed by checking its version. Afterward, navigate to the desired project directory. 

```bash
$ node --version
$ cd /path/to/project/directory
```

In this example, the project directory is `/home/teboho/Documents/MachineLearning`.

## Step 2: Data Acquisition
Next, we need to obtain the necessary raw data. In this example, the data is provided in Dr. Radu's GitHub repository, which you can access [here](https://github.com/gniziemazity/drawing-data). 

Navigate to the `raw` directory in your project and paste all the data from Dr. Radu's repository.

## Step 3: Create New Folders for Data
We will now create two new folders within our `data` directory: `json` and `image`. These folders will hold our data in JSON and image format, respectively. 

```bash
$ cd /path/to/project/directory/data
$ mkdir dataset
$ cd dataset/
$ mkdir json
$ mkdir image
```

## Step 4: Generate Data
Next, we will create a JavaScript file named `dataset_generator.js` to generate our data. This file will reside in a new directory called `node` at the root of our project.

```bash
$ cd /path/to/project/directory
$ mkdir node
$ cd node/
$ touch dataset_generator.js
```

## Step 5: JavaScript Code for Data Generation
The `dataset_generator.js` file contains the following code, which is responsible for generating our dataset.

```javascript
// Define constants for file paths
const constants = {
    DATA_DIR: "../data",
    RAW_DIR: "../data/raw",
    DATASET_DIR: "../data/dataset",
    JSON_DIR: "../data/dataset/json",
    IMG_DIR: "../data/dataset/image",
    SAMPLES: "../data/dataset/samples.json"
};

// Import the 'fs' module for filesystem operations
const fs = require('fs');

// Get a list of all file names in the 'raw' directory
const fileNames = fs.readdirSync(constants.RAW_DIR);

// Initialize an array to store our sample data
let samples = [];
let id = 1;

// Process each file in the 'raw' directory
fileNames.forEach(fileName => {
    // Read the content of the file
    const content = fs.readFileSync(`${constants.RAW_DIR}/${fileName}`);
    
    // Parse the content of the file
    const { session, student, drawings } = JSON.parse(content);

    // For each label in 'drawings', add a sample to our array
    for (let label in drawings) {
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        });
        id++;
    }
});

// Write our samples to 'samples.json'
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
```

This script reads the raw JSON files, parses them, and generates a summary of the samples in a new file, `samples.json`.

## Step 6: Running the Dataset Generator
Finally, run the `dataset_generator.js` script with Node.js to create the `samples.json` file.

```bash
$ node dataset_generator.js
```

After running the script, you should see a file named `samples.json` in the `data/dataset` directory of your project. The file will contain data in the following format:

```json
[
    {"id":1,"label":"car","student_name":"Radu","student_id":1663053145814},
    {"id":2,"label":"fish","student_name":"Radu","student_id":1663053145814},
    {"id":3,"label":"house","student_name":"Radu","student_id":1663053145814},
    ...
]
```

Each JSON object in the array represents a drawing sample, with an `id`, `label` for the drawing, and the `student_name` and `student_id` of the student who made the drawing.



# Beautify JSON

Before proceeding with the next steps, it's highly recommended to install a JSON beautification extension to help visualize JSON data more effectively. This will make the data easier to read and understand. One such extension is 'JSON' by Meezilla, available in the Visual Studio Code marketplace.

## Step 1: Update the Dataset Generator

The `dataset_generator.js` file needs to be updated to generate JSON files for each drawing sample. In the previous version of the script, we stored the summary of the samples in `samples.json`. Now, we will also store the drawing data for each sample in individual JSON files.

Update the `dataset_generator.js` file with the following code:

```javascript
// Define constants for file paths
const constants = {
    DATA_DIR: "../data",
    RAW_DIR: "../data/raw",
    DATASET_DIR: "../data/dataset",
    JSON_DIR: "../data/dataset/json",
    IMG_DIR: "../data/dataset/image",
    SAMPLES: "../data/dataset/samples.json"
};

// Import the 'fs' module for filesystem operations
const fs = require('fs');

// Get a list of all file names in the 'raw' directory
const fileNames = fs.readdirSync(constants.RAW_DIR);

// Initialize an array to store our sample data
let samples = [];
let id = 1;

// Process each file in the 'raw' directory
fileNames.forEach(fileName => {
    // Read the content of the file
    const content = fs.readFileSync(`${constants.RAW_DIR}/${fileName}`);
    
    // Parse the content of the file
    const { session, student, drawings } = JSON.parse(content);

    // For each label in 'drawings', add a sample to our array
    for (let label in drawings) {
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        });

        // Save the drawing data as a new JSON file, using the sample ID as the file name
        fs.writeFileSync(`${constants.JSON_DIR}/${id}.json`, JSON.stringify(drawings[label]));

        id++;
    }
});

// Write our samples to 'samples.json'
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
```

After running the updated script, you should see new JSON files in the `data/dataset/json` directory. Each file will be named with its corresponding sample ID (e.g., `1.json`, `2.json`, etc.), and will contain the coordinate data for the corresponding drawing.

## Step 2: Update Draw.js Class

To draw the images, we'll be using a JavaScript class named `draw.js`. This class encapsulates the functionality to draw paths on a canvas. Before using it, we need to move the `draw.js` file to a new directory: `/MACHINELEARNING/common/draw.js`. 

Also, add the following line at the end of `draw.js` to make it an importable module:

```javascript
module.exports = drawingFunctions;
```

Here's the full code for `draw.js`:

```javascript
/**
 * An object that encapsulates drawing functionality.
 */
const drawingFunctions = {};

/**
 * Draws a path on a given context.
 * @param {CanvasRenderingContext2D} context - The context where the path will be drawn.
 * @param {Array} path - An array of points representing the path.
 * @param {string} color - The color of the path. Default is black.
 */
drawingFunctions.path = (context, path, color = "black") => {
    // Set stroke style
    context.strokeStyle = color;
    context.lineWidth = 3;

    // Start the path
    context.beginPath();
    context.moveTo(...path[0]);

    // Draw the path
    for (let pointIndex = 1; pointIndex < path.length; pointIndex++) {
        context.lineTo(...path[pointIndex]);
    }

    // Set path properties
    context.lineCap = "round";
    context.lineJoin = "round";

    // Render the path
    context.stroke();
};


/**
 * Draws multiple paths on a given context.
 * @param {CanvasRenderingContext2D} context - The context where the paths will be drawn.
 * @param {Array} paths - An array of path arrays.
 * @param {string} color - The color of the paths. Default is black.
 */
drawingFunctions.paths = (context, paths, color = "black") => {
    // Draw each path in the array of paths
    for (const path of paths) {
        drawingFunctions.path(context, path, color);
    }
};

module.exports = drawingFunctions;
```

With `draw.js` now exportable, we can import it into our dataset generator. Add this import statement at the beginning of `dataset_generator.js`:

```javascript
// Import the draw.js module
const draw = require('../common/draw.js');
```



# Installing and Importing the Canvas

To manipulate and draw images using Node.js, we need to use the `canvas` module. This module is not built into Node.js, so we have to install it separately.

## Step 1: Install the Canvas

Run the following command in your terminal to install the `canvas` module:

```bash
$ npm install canvas
```

## Step 2: Import the Canvas

After installation, import the `canvas` module into the `dataset_generator.js` file by adding the following code:

```javascript
const { createCanvas } = require('canvas');
```

## Step 3: Update Dataset Generator

Next, we'll update our dataset generator to create image files for each drawing. We do this by drawing each set of paths onto a canvas and saving the result as an image file.

The updated `dataset_generator.js` file is shown below:

```javascript
// Import the required modules
const draw = require('../common/draw.js');
const { createCanvas } = require('canvas');

// Create a new canvas and get its 2D context
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

// Define constants for file paths
const constants = {
    DATA_DIR: "../data",
    RAW_DIR: "../data/raw",
    DATASET_DIR: "../data/dataset",
    JSON_DIR: "../data/dataset/json",
    IMG_DIR: "../data/dataset/image",
    SAMPLES: "../data/dataset/samples.json"
};

// Import the 'fs' module for filesystem operations
const fs = require('fs');

// Get a list of all file names in the 'raw' directory
const fileNames = fs.readdirSync(constants.RAW_DIR);

// Initialize an array to store our sample data
let samples = [];
let id = 1;

// Process each file in the 'raw' directory
fileNames.forEach(fileName => {
    // Read the content of the file
    const content = fs.readFileSync(`${constants.RAW_DIR}/${fileName}`);
    
    // Parse the content of the file
    const { session, student, drawings } = JSON.parse(content);

    // For each label in 'drawings', add a sample to our array
    for (let label in drawings) {
        const drawingPaths = drawings[label];

        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        });

        // Save the drawing data as a new JSON file, using the sample ID as the file name
        fs.writeFileSync(`${constants.JSON_DIR}/${id}.json`, JSON.stringify(drawingPaths));

        // Draw the paths onto the canvas and save the result as an image file
        generateImageFile(`${constants.IMG_DIR}/${id}.png`, drawingPaths);

        id++;
    }
});

// Write our samples to 'samples.json'
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFile(outFile, drawingPaths) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the paths onto the canvas
    draw.paths(ctx, drawingPaths);

    // Convert the canvas to a PNG image and save it to a file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outFile, buffer);
}
```

## Step 4: Update HTML File and Draw.js

Lastly, we need to update the HTML file and `draw.js` file because moving the `draw.js` file to a new location may have broken the path.

In the HTML file, update the path to `draw.js`:

```html
<script src="../common/draw.js"></script>
```

In `draw.js`, add a condition to only export the `drawingFunctions` object when the `module` object is defined. This is because the `module` object is not defined in a browser environment, so we only want to export `drawingFunctions` when running in Node.js:

```javascript
if (typeof module !== 'undefined') {
    module.exports = drawingFunctions;
}
```

This ensures that the `draw.js` module is only exported when running in Node.js, and not when running in the browser.



# Creating a Separate Constants File and a Utility Package for Progress Updates

To make the code more maintainable and modular, we can move the constants to a separate file and create a utility package for progress updates.

## Step 1: Creating a Constants File

Let's move the constants object to its own file. 

Here is the updated `constants.js` file:

```javascript
// Object called constants
const constants = {};  

// Define all the attributes of constants
constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.IMG_DIR = constants.DATASET_DIR + "/image";
constants.SAMPLES = constants.DATASET_DIR + "/samples.json"; // this file will store the summary of the samples

// Export constants when running in Node.js
if (typeof module !== 'undefined') {
    module.exports = constants;
}
```

After creating this file, we can import the constants in `dataset_generator.js` as follows:

```javascript
const constants = require('../common/constants.js');
```

## Step 2: Creating a Utility Package

We can create a utility package that will provide a progress bar for us as an additional side project. This will help us to track the progress of the image and JSON data processing.

Here is the `utils.js` file:

```javascript
const utils = {}

utils.formatPercent = (n) => {
    return (n * 100).toFixed(2) + "%";
}

utils.printProgress = (count, max) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    const percent = utils.formatPercent(count / max);
    process.stdout.write(count + "/" + max + " (" + percent + ")");
}

if (typeof module !== 'undefined') {
    module.exports = utils;
}
```

Now, we can import this utility package in `dataset_generator.js`:

```javascript
const utils = require('../common/utils.js');
```

## Step 3: Update Dataset Generator

Finally, let's update our `dataset_generator.js` to use the progress bar from the utility package:

```javascript
// Imports
const draw = require('../common/draw.js');
const constants = require('../common/constants.js');
const utils = require('../common/utils.js');
const { createCanvas } = require('canvas');

// Create a new canvas and get its 2D context
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

// Create the sample.json file
const fs = require('fs');

// Get a list of all file names in the 'raw' directory
const fileNames = fs.readdirSync(constants.RAW_DIR);

// Initialize an array to store our sample data
let samples = [];
let id = 1;

// Process each file in the 'raw' directory
fileNames.forEach(fileName => {
    // Read the content of the file
    const content = fs.readFileSync(`${constants.RAW_DIR}/${fileName}`);
    
    // Parse the content of the file
    const { session, student, drawings } = JSON.parse(content);

    // For each label in 'drawings', add a sample to our array
    for (let label in drawings) {
        const drawingPaths = drawings[label];

        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        });

        // Save the drawing data as a new JSON file, using the sample ID as the file name
        fs.writeFileSync(`${constants.JSON_DIR}/${id}.json`, JSON.stringify(drawingPaths));

        // Draw the paths onto the canvas and save the result as an image file
        generateImageFile(`${constants.IMG_DIR}/${id}.png`, drawingPaths);

        // Print progress
        utils.printProgress(id, fileNames.length * 8, "Processing Images");

        id++;
    }
});

// Write our samples to 'samples.json'
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFile(outFile, drawingPaths) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the paths onto the canvas
    draw.paths(ctx, drawingPaths);

    // Convert the canvas to a PNG image and save it to a file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outFile, buffer);
}
```

This utility package will provide a progress update in the console, helping you to track the progress of the image and JSON data processing.