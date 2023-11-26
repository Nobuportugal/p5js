// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let label2 = "";
let label3 = "";
// & confidence
let confidence = "";
let confidence2 = "";
let confidence3 = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uz0fWPuJY/model.json');
}

function setup() {
  createCanvas(320, 300);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 5, height - 30);
  text(confidence, width / 5, height - 4);
  text(label2, width / 2, height -30);
  text(confidence2, width / 2, height - 4);
  text(label3, width *4 / 5, height -30);
  text(confidence3, width *4 / 5, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0&1]);
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
  label2 = results[1].label;
  confidence2 = nf(results[1].confidence, 0, 2);
  label3 = results[2].label;
  confidence3 = nf(results[2].confidence, 0, 2);
  // Classifiy again!
  classifyVideo();
}
