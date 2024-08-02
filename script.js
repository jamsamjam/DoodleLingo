let canvas;
let clearButton;
let content;
let classifier;

window.onload = function() {
    googleTranslateElementInit();
};

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

function setup() {
    canvas = createCanvas(370, 370);
    clearButton = createButton('Clear');
    clearButton.position(7, 10);
    clearButton.mousePressed(clearCanvas);
    content = createDiv("Hmmm...");

    background(255);

    classifier = ml5.imageClassifier('DoodleNet', modelReady);
}

function modelReady() {
    classifier.classify(canvas, gotResults);
}

function clearCanvas() {
    background(255);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    content.html("Hmmm... You're drawing a nice '" + results[0].label + "'.");    
    classifier.classify(canvas, gotResults); // Make it loop
}

function draw() {
    if (mouseIsPressed) {
        strokeWeight(15);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}