// Pascal's Law MicroSim
// This simulation demonstrates the principles of hydraulics using Pascal's Law
// Pressing on a small piston creates pressure that transfers to a larger piston

// Canvas dimensions
let canvasWidth = 500;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 180;
let defaultTextSize = 16;

// Global variables for responsive design
let containerWidth; // calculated by container upon resize
let containerHeight = canvasHeight; // fixed height on page

// Cylinder parameters
let smallCylinderWidth = 40;
let largeCylinderWidth = 120;
let cylinderHeight = 250;
let bottomTubeHeight = 30;
let smallCylinderX;
let largeCylinderX;
let cylinderY = 100;
let bottomTubeY;

// Fluid parameters
let pressureValue = 50; // Default force applied (0-100)
let fluidColor;
let smallPistonHeight;
let largePistonHeight;
let maxPistonDisplacement = 100;

// UI Controls
let pressureSlider;

function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  
  // Create pressure slider
  pressureSlider = createSlider(0, 100, 50);
  pressureSlider.position(sliderLeftMargin, drawHeight + 15);
  pressureSlider.size(containerWidth - sliderLeftMargin - margin);
  
  // Initial position calculations
  updatePositions();
  
  // Define fluid color
  fluidColor = color(68, 138, 255, 200); // Semi-transparent blue
  
  describe('A physics simulation demonstrating Pascal\'s Law with two connected cylinders of different diameters.', LABEL);
}

function draw() {
  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  
  // Controls area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Update pressure from slider
  pressureValue = pressureSlider.value();
  
  // Update piston positions based on pressure
  updatePistonPositions();
  
  // Title
  fill('black');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text("Pascal's Law Demonstration", canvasWidth/2, margin/2);
  
  // Draw cylinders and connecting tube
  drawHydraulicSystem();
  
  // Draw forces and measurements
  drawMeasurements();
  
  // Draw control labels
  drawControlLabels();
}

function updatePositions() {
  // Calculate cylinder positions based on canvas width
  smallCylinderX = canvasWidth * 0.25;
  largeCylinderX = canvasWidth * 0.75;
  bottomTubeY = cylinderY + cylinderHeight;
}

function updatePistonPositions() {
  // Calculate piston heights based on pressure value
  
  // Small piston moves down as pressure increases
  smallPistonHeight = (pressureValue / 100) * maxPistonDisplacement;
  
  // Large piston moves up proportionally, based on area ratio
  // Area ratio = (small cylinder area / large cylinder area)
  let areaRatio = Math.pow(smallCylinderWidth / largeCylinderWidth, 2);
  largePistonHeight = smallPistonHeight * areaRatio;
}

function drawHydraulicSystem() {
  // Draw cylinder outlines
  stroke('black');
  strokeWeight(2);
  noFill();
  
  // Small cylinder
  rect(smallCylinderX - smallCylinderWidth/2, cylinderY, smallCylinderWidth, cylinderHeight);
  
  // Large cylinder
  rect(largeCylinderX - largeCylinderWidth/2, cylinderY, largeCylinderWidth, cylinderHeight);
  
  // Connecting tube
  line(smallCylinderX - smallCylinderWidth/2, bottomTubeY, smallCylinderX + smallCylinderWidth/2, bottomTubeY);
  line(largeCylinderX - largeCylinderWidth/2, bottomTubeY, largeCylinderX + largeCylinderWidth/2, bottomTubeY);
  line(smallCylinderX, bottomTubeY, smallCylinderX, bottomTubeY + bottomTubeHeight);
  line(largeCylinderX, bottomTubeY, largeCylinderX, bottomTubeY + bottomTubeHeight);
  line(smallCylinderX, bottomTubeY + bottomTubeHeight, largeCylinderX, bottomTubeY + bottomTubeHeight);
  
  // Draw fluid
  fill(fluidColor);
  noStroke();
  
  // Fluid in small cylinder
  rect(smallCylinderX - smallCylinderWidth/2 + 1, 
       cylinderY + smallPistonHeight, 
       smallCylinderWidth - 2, 
       cylinderHeight - smallPistonHeight);
  
  // Fluid in large cylinder
  rect(largeCylinderX - largeCylinderWidth/2 + 1, 
       cylinderY + cylinderHeight - largePistonHeight, 
       largeCylinderWidth - 2, 
       largePistonHeight);
  
  // Fluid in connecting tube
  rect(smallCylinderX - smallCylinderWidth/2, bottomTubeY, smallCylinderWidth, 1);
  rect(largeCylinderX - largeCylinderWidth/2, bottomTubeY, largeCylinderWidth, 1);
  rect(smallCylinderX - 1, bottomTubeY, 2, bottomTubeHeight);
  rect(largeCylinderX - 1, bottomTubeY, 2, bottomTubeHeight);
  rect(smallCylinderX - 1, bottomTubeY + bottomTubeHeight - 1, largeCylinderX - smallCylinderX + 2, 2);
  
  // Draw pistons
  fill(200);
  stroke('black');
  strokeWeight(1);
  
  // Small piston
  rect(smallCylinderX - smallCylinderWidth/2 - 5, 
       cylinderY + smallPistonHeight - 10, 
       smallCylinderWidth + 10, 
       10);
  
  // Force arrow on small piston
  if (pressureValue > 0) {
    let arrowSize = map(pressureValue, 0, 100, 10, 30);
    drawArrow(smallCylinderX, cylinderY + smallPistonHeight - 15, 
              smallCylinderX, cylinderY + smallPistonHeight - 15 - arrowSize, 
              color(255, 0, 0), 8);
  }
  
  // Large piston
  rect(largeCylinderX - largeCylinderWidth/2 - 5,
       cylinderY + cylinderHeight - largePistonHeight,
       largeCylinderWidth + 10,
       10);
  
  // Force arrow on large piston (upward)
  if (largePistonHeight > 0) {
    let arrowSize = map(largePistonHeight, 0, maxPistonDisplacement * 0.25, 0, 30);
    drawArrow(largeCylinderX, cylinderY + cylinderHeight - largePistonHeight + 15,
              largeCylinderX, cylinderY + cylinderHeight - largePistonHeight + 15 + arrowSize,
              color(0, 150, 0), 8);
  }
}

function drawArrow(x1, y1, x2, y2, arrowColor, headSize) {
  // Draw force arrow with arrowhead
  stroke(arrowColor);
  strokeWeight(3);
  fill(arrowColor);
  
  // Arrow line
  line(x1, y1, x2, y2);
  
  // Arrow head
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -headSize, headSize/2, -headSize, -headSize/2);
  pop();
}

function drawMeasurements() {
  // Calculate pressure and distance values
  let smallArea = PI * Math.pow(smallCylinderWidth/2, 2);
  let largeArea = PI * Math.pow(largeCylinderWidth/2, 2);
  
  let force = pressureValue * 0.1; // Scale for display (0-10)
  let smallPressure = force / smallArea;
  let largePressure = force / largeArea;
  
  // Display measurements
  fill('black');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  
  // Small cylinder measurements
  text(`Force: ${force.toFixed(1)} N`, smallCylinderX, cylinderY - 30);
  text(`Area: ${smallArea.toFixed(0)} mm²`, smallCylinderX, cylinderY - 15);
  text(`Pressure: ${smallPressure.toFixed(4)} N/mm²`, smallCylinderX, cylinderY + cylinderHeight + 50);
  text(`Distance: ${smallPistonHeight.toFixed(1)} mm`, smallCylinderX, cylinderY + smallPistonHeight/2 - 15);
  
  // Large cylinder measurements
  text(`Force: ${(force * largeArea/smallArea).toFixed(1)} N`, largeCylinderX, cylinderY - 30);
  text(`Area: ${largeArea.toFixed(0)} mm²`, largeCylinderX, cylinderY - 15);
  text(`Pressure: ${largePressure.toFixed(4)} N/mm²`, largeCylinderX, cylinderY + cylinderHeight + 50);
  text(`Distance: ${largePistonHeight.toFixed(1)} mm`, largeCylinderX, cylinderY + cylinderHeight - largePistonHeight/2 + 15);
  
  // Draw pressure equation to show that P1 = P2
  textAlign(CENTER, TOP);
  textSize(16);
  text("Pascal's Law: P₁ = P₂", canvasWidth/2, cylinderY + cylinderHeight + 80);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Label with current value of the slider
  text(`Applied Force: ${pressureValue}%`, margin, drawHeight + 25);
}

function windowResized() {
  // Update canvas size when the container resizes
  updateCanvasSize();
  updatePositions();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
  
  // Resize the slider to match the new canvasWidth
  pressureSlider.size(containerWidth - sliderLeftMargin - margin);
  pressureSlider.position(sliderLeftMargin, drawHeight + 15);
}

function updateCanvasSize() {
  // Get the exact dimensions of the container
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);  // Avoid fractional pixels
  canvasWidth = containerWidth;
}