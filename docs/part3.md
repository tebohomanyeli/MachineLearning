# Step 1: Creating a Web-Readable Version of the Data

To start building a web application that can display the dataset, it needs to be stored in a format that the browser can read. This can be achieved by creating a JavaScript object of the data. 

First, a new directory called `/common/js_objects` is created. This directory will hold the files used for communication between Node.js scripts and the web applications. 

In the [`constants.js`](../common/constants.js) file, a path is defined to the `JS_OBJECTS` directory:

```js
// constants.js
// ... rest of code ...

// Adding a new constant for the JS_OBJECTS directory
constants.JS_OBJECTS        = "./common/js_objects";

// A new constant for the SAMPLES_JS file
constants.SAMPLES_JS        = constants.JS_OBJECTS + "/samples.js";

// ... rest of code ...
```

After adding these constants, the `dataset_generator.js` script is modified to write a new file, `samples.js`, which will initialize a JavaScript object with the JSON data:

```js
// dataset_generator.js
// ... rest of code ...

// This line creates the samples.json file
filesystem.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

// The new line added: this creates the samples.js file
filesystem.writeFileSync(constants.SAMPLES_JS, "const samples=" + JSON.stringify(samples) + ";");

// ... rest of code ...
```

Upon re-running the [`dataset_generator.js`](../node/dataset_generator.js) script, a new file, [`samples.js`](../common/js_objects/samples.js), is created in the `/common/js_objects` directory. The `samples.js` file is similar to the [`samples.json`](../data/datasetsamples.json) file, but it initializes a JavaScript object named `samples`:

```js
// samples.js
const samples = [
    {"id":1,"label":"car","student_name":"Radu","student_id":1663053145814},
    // ... rest of data ...
];
```

Note that this structure is not standard; it's used here to avoid issues related to CORS and to circumvent certain bugs with the VS Code Live Server extension. Feel free to reorganize this if you have a better idea or if it fits your project needs better.

---

# Step 2: Continue