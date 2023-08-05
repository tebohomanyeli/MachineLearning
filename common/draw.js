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
}


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
}

if(typeof module!== 'undefined'){
    module.exports=drawingFunctions;
}