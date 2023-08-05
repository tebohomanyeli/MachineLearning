//Object called constants
const constants={};  


//These are all the attributes of constants
constants.DATA_DIR          = "../data";
constants.RAW_DIR           = constants.DATA_DIR + "/raw";
constants.DATASET_DIR       = constants.DATA_DIR + "/dataset";
constants.JSON_DIR          = constants.DATASET_DIR + "/json";
constants.IMG_DIR           = constants.DATASET_DIR + "/image";
constants.SAMPLES           = constants.DATASET_DIR + "samples.json"; // this file will store the summery of the samples

constants.JS_OBJECTS        = "../common/js_objects";
constants.SAMPLES_JS        = constants.JS_OBJECTS+"/samples.js"

if(typeof module !== 'undefined'){
    module.exports = constants;
}