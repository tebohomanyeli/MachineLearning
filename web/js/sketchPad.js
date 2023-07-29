/**
 * Class representing a SketchPad.
 */
class SketchPad {
    /**
     * Create a SketchPad.
     * @param {Element} container - The HTML element where the SketchPad will be appended.
     * @param {number} dimension - The width and height of the SketchPad in pixels. Default is 400.
     */
    constructor(container, dimension = 400) {
        // Create a canvas element and set its properties
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = dimension;
        this.canvasElement.height = dimension;
        this.canvasElement.style = `
            background-color: white;
            box-shadow: 0px 0px 10px 2px black;
        `;
        
        // Append the canvas to the container
        container.appendChild(this.canvasElement);

        // Create a line break and append it to the container
        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);

        // Create an undo button, set its properties and append it to the container
        this.undoButtonElement = document.createElement("button");
        this.undoButtonElement.innerHTML = "UNDO";
        container.appendChild(this.undoButtonElement);

        // Set up the context for drawing
        this.context = this.canvasElement.getContext("2d");

        // Initialize drawing variables
        this.pathsList = [];
        this.isDrawing = false;

        // Redraw the canvas
        this._redraw();

        // Add event listeners to the canvas and undo button
        this._addEventListeners();
    }

    /**
     * Add event listeners to the SketchPad elements.
     * @private
     */
    _addEventListeners() {
        // Add mouse event listeners to the canvas
        this.canvasElement.onmousedown = (event) => {
            const mousePosition = this._getMousePosition(event);
            this.pathsList.push([mousePosition]);
            this.isDrawing = true;
        };
        this.canvasElement.onmousemove = (event) => {
            if (this.isDrawing) {
                const mousePosition = this._getMousePosition(event);
                const lastPath = this.pathsList[this.pathsList.length - 1];
                lastPath.push(mousePosition);
                this._redraw();
            }
        };
        document.onmouseup = () => {
            this.isDrawing = false;
        };

        
        // Add touch event listeners to the canvas
        this.canvasElement.ontouchstart = (event) => {
            const touchLocation = event.touches[0];
            this.canvasElement.onmousedown(touchLocation);
        };
        this.canvasElement.ontouchmove = (event) => {
            const touchLocation = event.touches[0];
            this.canvasElement.onmousemove(touchLocation);
        };
        document.ontouchend = () => {
            document.onmouseup();
        };


        // Add click event listener to the undo button
        this.undoButtonElement.onclick = () => {
            this.pathsList.pop(); // Remove last path
            this._redraw();
        };
    }

    /**
     * Get mouse position relative to the SketchPad.
     * @param {MouseEvent} event - The mouse event.
     * @return {Array} The x and y coordinates of the mouse relative to the SketchPad.
     * @private
     */
    _getMousePosition = (event) => {
        const rect = this.canvasElement.getBoundingClientRect();
        return [
            event.clientX - rect.left,
            event.clientY - rect.top
        ];
    };

    /**
     * Redraw the SketchPad.
     * @private
     */
    _redraw() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        // Draw the paths
        drawingFunctions.paths(this.context, this.pathsList);

        // Enable or disable the undo button
        this.undoButtonElement.disabled = this.pathsList.length === 0;
    }


    reset(){
        // Initialize drawing variables
        this.pathsList = [];
        this.isDrawing = false;

        // Redraw the canvas
        this._redraw();

    }
}
