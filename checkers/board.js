/*
 * Copyright (C) 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * This file represents a TicTacToe board object, with all needed drawing and
 * state update functions.
 */


/**
 * Creates an empty board object with no location
 * @param {CanvasRenderingContext2D} context the 2D context of the canvas that
 *     the board is drawn on.
 * @constructor
 */

//var _xCurrentCells;
//var _oCurrentCells;

var eatenTag;
var aYellow = 'Yellow';
var aAqua = 'Aqua';
var aYellowGreen = 'YellowGreen';
var hintColor = '';
var colorArray;

var animteTime = 100;
var frameCount = 60;
var currentX = 15;
var currentY = 15;
var offsetX;
var offsetY;
//var canvasOffset;
var ctx;
var mySoundFile;
var myAudio;

var cellCanvas;
//var cellContext;
var previousPoint;

var cellWidth;
var cellHeight;
var boardWidth;
var boardHeight;

var lineThickness;
var numberOfColumns;
var numberOfRows;

var mContext;
var dimension;
var thisX;
var thisY;

var startX;
var startY;
var endX;
var endY;

var dropColumn;
var dropRow;
var dropCellType;
var dropDestCellType;

var xCellColor;
var oCellColor;
var colors;
var colorsCode;

var currentEvent;
var cellTypes;

SoundFile = {
ONLINE: 'ONLINE',
CLICKERS: 'CLICKERS',
MUSIC: 'MUSIC',
};

Colors = {
    blackColor: 'Black',
    darkGrayColor: 'DarkGray',
    lightGrayColor: 'LightGray',
    whiteColor: 'White',
    grayColor: 'Gray',
    redColor: 'Red',
    blueColor: 'Blue',
    cyanColor: 'Cyan',
    yellowColor: 'Yellow',
    magentaColor: 'Magenta',
    orangeColor: 'Orange',
    purpleColor: 'Purple',
    brownColor: 'Brown',
};

ColorsCode = {
    blackColor: 1,
    darkGrayColor: 2,
    lightGrayColor: 3,
    whiteColor: 4,
    grayColor: 5,
    redColor: 6,
    blueColor: 7,
    cyanColor: 8,
    yellowColor: 9,
    magentaColor: 10,
    orangeColor: 11,
    purpleColor: 12,
    brownColor: 13,
};

CellTypes = {
    oCell: 1,  //enumerate won't accept 0
    xCell: 2,
    xxCell: 5,
    ooCell: 6,
};



//function board(context) {

function board(context, webaudioclass) {
    
    mContext = context;
    colors = Colors;
    colorsCode = ColorsCode;
    cellTypes = CellTypes;
    ctx = context;
    
//    console.log('create board function ctx ' + ctx);
    
    offsetX = 0;
    offsetY = 0;
    
    cellCanvas = document.createElement("canvas");
    
    //create two arrays to hold players cells
//    _xCurrentCells = new Array();
//    _oCurrentCells = new Array();
    
//    _xCurrentCells = [];
//    _oCurrentCells = [];
    
    var rm = 45 % 8;
    var nRow = Math.floor(46/8);
    var nRow2 = Math.floor(44/8);
    console.log('remainder: ' + rm + ' nRow: ' + nRow + ' nrow2: ' + nRow2);
    
    colorArray = [aYellow, aAqua, aYellowGreen];
    
}

/**
 * Resets the board to a starting state.
 * @this {board}
 */
function boardReset() {
    if (cellCanvas.parentNode)
    {
        console.log('cellCanvas is active');
        document.body.removeChild(cellCanvas);
    }
    
    
    mContext.beginPath();
    mContext.clearRect(0, 0, mContext.canvas.width,
                            mContext.canvas.height);

//  console.log('boardReset thisX ' + thisX + ' Y: ' + thisY + ' width: ' + mContext.canvas.width + ' height: ' + mContext.canvas.height);
}

function getRowsWithTag(tag)
{
    return Math.floor(tag / 8);
}

function getColumnWithTag(tag)
{
    return tag % 8;
}

function boardCalcDimensions(level) {
    lineThickness = 2;
    numberOfColumns = 8;
    numberOfRows = 8;
    
//    _kCellWidth =  (kBoardWidth - (kNumberOfColumns - 1) * kLineThickness) / kNumberOfColumns;
//    _kCellHeight =  (kBoardHeight - (kNumberOfRows - 1) * kLineThickness) / kNumberOfRows;

  if (mContext.canvas.width > mContext.canvas.height) {
    dimension = mContext.canvas.height - 2 * this.margin;
  } else {
    dimension = mContext.canvas.width - 2 * this.margin;
  }
  thisX = (mContext.canvas.width - dimension) / 2;
  thisY = (mContext.canvas.height - dimension) / 2;
    
//    console.log('boardcalcdimensions thisX: ' + thisX + ' thisY: ' + thisY);
    
    cellWidth = (dimension - (numberOfColumns + 1) * lineThickness) / numberOfColumns;
    cellHeight = (dimension - (numberOfRows + 1) * lineThickness) / numberOfRows;
    
    boardWidth = (numberOfColumns + 1) * lineThickness + numberOfColumns * cellWidth;
    boardHeight = (numberOfRows + 1) * lineThickness + numberOfRows * cellHeight;
    
//    console.log('boardCalcDimensions boardWidth: ' + boardWidth + ' boardHeight: ' + boardHeight + ' cellWidth: ' + cellWidth + ' cellHeight: ' + cellHeight);
}

function boardClear(level) {
  this.calcDimensions(level);
}

function boardDrawPlayersCells()
{
    console.log('boardDrawPlayersCells xcellcolor: ' + xCellColor + ' ocellcolor: ' + oCellColor);
    
    var kNumberOfRows = 8;
    var kNumberOfColumns = 8;
    var kLineThickness = mContext.lineWidth;
    var _kCellHeight = cellHeight;
    var _kCellWidth = cellWidth;

    
    var initX = kLineThickness;
    var initY = kLineThickness;
    var tag = 0;
    
    var r = (_kCellWidth - _kCellWidth / 6) / 2.0;
    var r2 = r * 0.5;
    var index = 0;
    
    for (var row=0; row<3; row++)
    {
        var delta = 0;
        if (row == 1)
        {
            delta = -1;
        }
        var y = thisY + initY + _kCellHeight * row + kLineThickness * row;
        for (var column=0; column<(kNumberOfColumns / 2); column++)
        {
            var x = thisX + initX + _kCellWidth * (column + ++delta) + kLineThickness * (column +delta);
            r = 15;
//            createPlayerCell(x, y, "Red");
            createPlayerCell(x, y, xCellColor);
        }
    }
    
    index = 0;
    for (var row=5; row<kNumberOfRows; row++)
    {
        var delta = -1;
        if (row == 6)
        {
            delta = 0;
        }
        var y = thisY + initY + _kCellHeight * row + kLineThickness * row;
        for (var column=0; column<(kNumberOfColumns / 2); column++)
        {
            var x = thisX + initX + _kCellWidth * (column + ++delta) + kLineThickness * (column +delta);
            r = 15;
//            createPlayerCell(x, y, "Blue");
            createPlayerCell(x, y, oCellColor);
        }
    }

//    boardDropBall(19,44);
    
}



function boardDrawBlocksColor()
{
    console.log('boardDrawBlocksCoor');
    var kLineThickness = mContext.lineWidth;
    var _kCellHeight = cellHeight;
    var _kCellWidth = cellWidth;
    var kNumberOfColumns = 8;
    
    var initX = mContext.lineWidth;
    var initY = mContext.lineWidth;
    ctx.fillStyle = "Peru";//"Chocolate";//"Brown";
    
    var row = 0;
    var delta = 0;
    
    var y = thisY + initY + _kCellHeight * row + kLineThickness * row;
    for (var column=0; column<kNumberOfColumns / 2; column++)
    {
        ++delta;
        var x = thisX + initX + _kCellWidth * (column + delta) + kLineThickness * (column + delta);
        ctx.fillRect(x, y, _kCellWidth, _kCellHeight);
        console.log('baordDrawBlocksCoor x: y: w: h:' + x + '  ' + y + '  ' + _kCellWidth + '  ' + _kCellHeight);
    }
    
    row = 1;
    delta = 0;
    y = thisY + initY + _kCellHeight * row + kLineThickness * row;
    for (var column=0; column<kNumberOfColumns / 2; column++)
    {
        var x = thisX + initX + _kCellWidth * (column + delta) + kLineThickness * (column + delta);
        ctx.fillRect(x, y, _kCellWidth, _kCellHeight);
        delta++;
    }
    
    row = 2;
    delta = 0;
    y = thisY + initY + _kCellHeight * row + kLineThickness * row;
    for (var column=0; column<kNumberOfColumns / 2; column++)
    {
        ++delta;
        var x = thisX + initX + _kCellWidth * (column + delta) + kLineThickness * (column + delta);
        ctx.fillRect(x, y, _kCellWidth, _kCellHeight);
    }
    
    row = 3;
    delta = 0;
    y = thisY + initY + _kCellHeight * row + kLineThickness * row;
    for (var column=0; column<kNumberOfColumns / 2; column++)
    {
        var x = thisX + initX + _kCellWidth * (column + delta) + kLineThickness * (column + delta);
        ctx.fillRect(x, y, _kCellWidth, _kCellHeight);
        delta++;
    }
    
    row = 4;
    delta = 0;
    y = thisY + initY + _kCellHeight * row + kLineThickness * row;
    for (var column=0; column<kNumberOfColumns / 2; column++)
    {
        ++delta;
        var x = thisX + initX + _kCellWidth * (column + delta) + kLineThickness * (column + delta);
        ctx.fillRect(x, y, _kCellWidth, _kCellHeight);
    }
    
    row = 5;
    delta = 0;
    y = thisY + initY + _kCellHeight * row + kLineThickness * row;
    for (var column=0; column<kNumberOfColumns / 2; column++)
    {
        var x = thisX + initX + _kCellWidth * (column + delta) + kLineThickness * (column + delta);
        ctx.fillRect(x, y, _kCellWidth, _kCellHeight);
        delta++;
    }
    
    row = 6;
    delta = 0;
    y = thisY + initY + _kCellHeight * row + kLineThickness * row;
    for (var column=0; column<kNumberOfColumns / 2; column++)
    {
        ++delta;
        var x = thisX + initX + _kCellWidth * (column + delta) + kLineThickness * (column + delta);
        ctx.fillRect(x, y, _kCellWidth, _kCellHeight);
    }
    
    row = 7;
    delta = 0;
    y = thisY + initY + _kCellHeight * row + kLineThickness * row;
    for (var column=0; column<kNumberOfColumns / 2; column++)
    {
        var x = thisX + initX + _kCellWidth * (column + delta) + kLineThickness * (column + delta);
        ctx.fillRect(x, y, _kCellWidth, _kCellHeight);
        delta++;
    }

    
}

function boardDrawGrid(level) {
//    console.log('boarddrawgrid b4 new version correction');
    this.level = level;
    // draw background
    mContext.fillStyle = "LightGray";  //'#BDBDBD';
//    mContext.strokeStyle = '#00FFEE';
    //mContext.strokeStyle.opacity = '0.0';
    mContext.fillRect(thisX, thisY, dimension, dimension);
    
    
    // draw grid
    mContext.lineWidth = lineThickness;
//    var oneHalfLineThickness = mContext.lineWidth / 2.0;
//    //draw vertical lines
//    for (var i=0; i<(numberOfColumns + 1); i++)
//    {
//        var xPos = thisX + cellWidth * i + mContext.lineWidth * i + oneHalfLineThickness;
//        var yPos = thisY + cellHeight * numberOfRows + mContext.lineWidth * (numberOfRows + 1);
//        mContext.moveTo(xPos, thisY);
//        mContext.lineTo(xPos, yPos);
//        mContext.stroke();
//        //        console.log('boarddrawgrid vertical i: ' + i + ' xPos: ' + xPos + ' yPos: ' + yPos);
//    }
//    
//    //draw horizontal liens
//    for (var i=0; i<(numberOfRows + 1); i++)
//    {
//        var xPos = thisX + cellWidth * numberOfColumns + mContext.lineWidth * (numberOfColumns + 1);
//        var yPos = thisY + cellHeight * i + mContext.lineWidth * i + oneHalfLineThickness;
//        mContext.moveTo(thisX, yPos);
//        mContext.lineTo(xPos, yPos);
//        mContext.stroke();
//        //        console.log('boarddrawgrid horizontal i: ' + i + ' xPos: ' + xPos + ' yPos: ' + yPos);
//    }
    
    boardDrawBlocksColor();
//    boardDrawPlayersCells();   // delay until received color pairs object for players cells
    
}

function boardDraw(x, y) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //    console.log('boardDraw after ctx clear ');
    //    console.log('boardDraw canvas.width ' + canvas.width + ' canvas.height: ' + canvas.height);
    
    ctx.beginPath();
    //    console.log('boardDraw afte beginpath canvas.width ' + canvas.width + ' canvas.height: ' + canvas.height);
    ctx.fillStyle = "skyblue";
    ctx.strokeStyle = "gray";
    //                  ctx.rect(x, y, 30, 20);
    var xCenter = x;
    var yCenter = y;
    r = 15;
    ctx.arc(xCenter, yCenter, r, 0, 360);
    ctx.fill();
    ctx.stroke();
    //    console.log('boardDraw x ' + xCenter + ' y ' + yCenter + ' r ' + r);
}

function boardDrawWinningLocation(aWinningOjbect)
{
    var gameRule = aWinningOjbect.GameRule;   //to make this compatible with iOS code
    var drawDirection = aWinningOjbect.Direction;  //to make this compatible with iOS code
    var i = aWinningOjbect.CellICoordinate;   //to make this compatible with iOS code
    var j = aWinningOjbect.CellJCoordinate;   //to make this compatible with iOS code
    
    var xStart = -1;
    var yStart = -1;
    var xEnd = -1;
    var yEnd = -1;
    var xThickness = -1;
    var yThickness = -1;
    var xCompensate = -1;
    var yCompensate = -1;
    var xAdjustHalf = 0;
    var yAdjustHalf = 0;
    var xRoundAdjustment = 0.5;
    var yRoundAdjustment = 0.5; //0.15;
    
    switch (drawDirection)
    {
        case 1:
        {
            xStart = xRoundAdjustment + i;
            xEnd = xStart + gameRule - 2 * xRoundAdjustment;  //need to substract 0.05
            yStart = yEnd = 0.5 + j;
            yThickness = j;  //number of rows
            xThickness = i;  //number of columns
            xCompensate = gameRule - 1 - (0.00 *(gameRule - 1));
            yCompensate = 0;
            break;
        }
        case 2:
        {
            yStart = yRoundAdjustment + j;
            yEnd = yStart + gameRule - 2 * yRoundAdjustment;
            xStart = xEnd = (0.5 + i);
            yThickness = j;
            xThickness = i;    //self.level*2 is for enum value
            xCompensate = 0;
            yCompensate = gameRule - 1 - (0.00 *(gameRule - 1));
            break;
        }
        case 3:    //topleft
        {
            xStart = xRoundAdjustment + i;   //add thickness later
            yStart = yRoundAdjustment + j;   //add thickness later
            xEnd = xStart + gameRule - 2 * xRoundAdjustment;
            yEnd = yStart + gameRule - 2 * yRoundAdjustment;
            xThickness = i;
            yThickness = j;
            xCompensate = gameRule - 1;
            yCompensate = gameRule - 1;
            break;
        }
        case 4:    //anti-diagonal  need to use bottomleft
        {
            //bottomleft
            xStart = i + xRoundAdjustment;   //add thickness later
            yStart = -yRoundAdjustment + j + 1;   //add thickness later
            xEnd = xStart + gameRule  - 2 * xRoundAdjustment;
            yEnd = yStart + (0 - gameRule) + 2 * yRoundAdjustment;
            xThickness = i;
            yThickness = j;
            xCompensate = gameRule - 0;
            yCompensate = 0 - gameRule;
            break;
        }
        default:
            break;
    }

    var x = lineThickness;
    var y = lineThickness;
    
    mContext.lineCap = "round";
    mContext.lineWidth = lineThickness * 5;
    mContext.strokeStyle = '#FFCCBB';
    mContext.beginPath();
    
    mContext.moveTo(thisX + x + cellWidth * xStart + lineThickness * xThickness - xAdjustHalf, thisY + y + cellHeight * yStart + lineThickness * yThickness - yAdjustHalf);
    mContext.lineTo(thisX + x + cellWidth * xEnd + lineThickness * xThickness + lineThickness * xCompensate - xAdjustHalf, thisY + y + cellHeight * yEnd + lineThickness * yThickness + lineThickness * yCompensate - yAdjustHalf);
    mContext.stroke();
    
}

function boardDrawAtPoints(x,y) {
//    console.log('boardDrawAtPoints x: ' + x + ' y: ' + y);
    mouseX = parseInt(x - offsetX);
    mouseY = parseInt(y - offsetY);
    $("#downlog").html("DownNew: " + mouseX + " / " + mouseY);
    
    // Put your mousedown stuff here
    points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
    currentFrame = 0;
    currentX = mouseX;
    currentY = mouseY;
    animate();
}

function boardInitDraw() {
    // start the rect at [10,10]
//    console.log('boardInitDraw');
    boardDraw(15,15);
}
function drawAStar(myContext, xMargin, yMargin)
{
    console.log('draw A Star math.pi: ' + Math.PI);
    myContext.beginPath();
//    myContext.fillStyle = "Black";
//    myContext.strokeStyle = "Black";

    var width = cellWidth;
    var height = cellHeight;
    
    var x = width / 2.0;
    var y = height / 2.0;
    
    var aSize = 2.0;
    myContext.lineWidth = aSize;
    
//    var xCenter = x;
//    var yCenter = y;
    
    var xCenter = xMargin + cellWidth / 2.0;
    var yCenter = yMargin + cellHeight / 2.
    
    var  w = width / 3.0; //100.0;
    var r = w / 2.0;
    var flip = -1.0;
    
    for (var i=0; i<1; i++)
    {
        var theta = 2.0 * Math.PI * (2.0 / 5.0); // 144 degrees
        
//        CGContextMoveToPoint(context, xCenter, r*flip+yCenter);
        myContext.moveTo(xCenter, r*flip+yCenter);
        
        for (var k=1; k<5; k++)
        {
            var x = r * Math.sin(k * theta);
            var y = r * Math.cos(k * theta);
//            CGContextAddLineToPoint(context, x+xCenter, y*flip+yCenter);
            myContext.lineTo(x+xCenter, y*flip+yCenter);
        }
        xCenter += 150.0;
    }
    
//    myContext.fill();
//    myContext.stroke();
    
    
    
//    r = cellWidth * 0.15;
//    myContext.beginPath();
    myContext.strokeStyle = "Green";
    myContext.fillStyle = "Green";
//    myContext.arc(xCenter, yCenter, r, 0, 360);
    myContext.fill();
//    myContext.stroke();
    
}
function createCellCanvas2(x, y, destCellType) {
    console.log('createCellCanvas2 dropcelltype: ' + dropCellType + ' dropCellType: ' + dropCellType);
    console.log('createCellCanvas2 dropcellltypecellType: ' + dropCellType + ' dropCellType: ' + dropCellType + ' destCellType ' + destCellType);
    //    cellCanvas = document.createElement("canvas");
    document.body.appendChild(cellCanvas);
    cellCanvas.style.position = "absolute";
    cellCanvas.width = cellWidth;
    cellCanvas.height = cellHeight;
    
    cellCanvas.style.left = x + "px";   //x
    cellCanvas.style.top = y + "px";    //y
    
    //draw ball into cellCanvas
    var cellContext = cellCanvas.getContext('2d');
    cellContext.beginPath();
    
    console.log('switch cellTypes.xCell: ' + cellTypes.xCell);
    console.log('switch cellTypes.oCell: ' + cellTypes.oCell);
    switch (dropCellType + 1)
    {
        case (cellTypes.xCell):
        {
            console.log('createCellCanvas2 dropcell=1 xcellcolor: ' + xCellColor);
            cellContext.fillStyle = xCellColor;
            var xCenter = cellWidth / 2.0;
            var yCenter = cellHeight / 2.0;
            var r = cellWidth * 0.40;
            cellContext.arc(xCenter, yCenter, r, 0, 360);
            cellContext.fill();
//            drawAStar(cellContext, 0, 0);
//            cellContext.strokeStyle = xCellColor;
            break;
        }
        case (cellTypes.oCell):
        {
            console.log('createCellCanvas2 dropcell=0 ocellcolor: ' + oCellColor);
            cellContext.fillStyle = oCellColor;
            var xCenter = cellWidth / 2.0;
            var yCenter = cellHeight / 2.0;
            var r = cellWidth * 0.40;
            cellContext.arc(xCenter, yCenter, r, 0, 360);
            cellContext.fill();
//            cellContext.strokeStyle = oCellColor;
            break;
        }
        case (cellTypes.xxCell):
        {
            console.log('createCellCanvas2 dropcell=2 xxcellcolor: ' + xCellColor);
            cellContext.fillStyle = xCellColor;
            var xCenter = cellWidth / 2.0;
            var yCenter = cellHeight / 2.0;
            var r = cellWidth * 0.40;
            cellContext.arc(xCenter, yCenter, r, 0, 360);
            cellContext.fill();
            
            drawAStar(cellContext, 0, 0);
            
//            cellContext.strokeStyle = xCellColor;
            
            //draw star
            
            break;
        }
        case (cellTypes.ooCell):
        {
            console.log('createCellCanvas2 dropcell=3 ooCellcolor: ' + oCellColor);
            cellContext.fillStyle = oCellColor;
            var xCenter = cellWidth / 2.0;
            var yCenter = cellHeight / 2.0;
            var r = cellWidth * 0.40;
            cellContext.arc(xCenter, yCenter, r, 0, 360);
            cellContext.fill();
             drawAStar(cellContext, 0, 0);
            
//            cellContext.strokeStyle = oCellColor;
            
            // draw star
            
            break;
        }
        default:
//            console.log('createCellcanvas2 switch default should no have seeen this');
            break;
        
    }

//    var xCenter = cellWidth / 2.0;
//    var yCenter = cellHeight / 2.0;
//    var r = cellWidth * 0.40;
//    cellContext.arc(xCenter, yCenter, r, 0, 360);
//    cellContext.fill();
    
    
    
////    var xCenter = cellWidth / 2.0;
////    var yCenter = cellHeight / 2.0;
//    r = cellWidth * 0.15;
////    cellContext.fillStyle = "Black";
//    
//    cellContext.beginPath();
////    cellContext.strokeStyle = "White";
//    cellContext.fillStyle = "White";
//    cellContext.arc(xCenter, yCenter, r, 0, 360);
//    cellContext.fill();
////    cellContext.stroke();
    
//    drawAStar(cellContext, 0, 0);
}

function createPlayerCell(x, y, color)  //create player cells when create game board - draw directly into the main canvas
{

    ctx.beginPath();
    var xCenter = x + cellWidth / 2.0;
    var yCenter = y + cellHeight / 2.0;
    var r = cellWidth * 0.40;
    ctx.arc(xCenter, yCenter, r, 0, 360);
    ctx.fillStyle = color;
    ctx.fill();
}
function boardMovingObjects(event)
{
    currentEvent = event;
    var text = event.data;
    
    var tagSrc = text.SourceTag;
    var tagDest = text.DestTag;
//    var cellType = text.CellType;
    var cellType = text.SrcCellType;
    var destCellType = text.DestCellType;
    
    dropDestCellType = text.DestCellType;
    
    console.log('boardMovingObjects tagsrc: ' + tagSrc + ' tagDest: ' + tagDest + ' sourcecelltype: ' + cellType + ' destCellType ' + destCellType);
    
    var cellColumnSrc = getColumnWithTag(tagSrc);
    var cellRowSrc = getRowsWithTag(tagSrc);
    var cellType;// = text.CellType;
    
    var cellColumnDest = getColumnWithTag(tagDest);
    var cellRowDest = getRowsWithTag(tagDest);
    
    console.log('boardMovingObjects cellColumnSrc: ' + cellColumnSrc + ' cellRowSrc: ' + cellRowSrc);
    console.log('boardMovingObjects cellColumnDest: ' + cellColumnDest + ' cellRowDest: ' + cellRowDest);
    
//    dropCellType = cellType;
    dropCellType = cellType;
    
    //    console.log('boardDropBall cellcolumn: ' + cellColumn + ' cellRow: ' + cellRow + ' cellType: ' + cellType);
    //    console.log('boardDropBall thisX: ' + thisX + ' thisY: ' + thisY);
    
    var initX = lineThickness;
    var initY = lineThickness;
    
    //    var j = 0;
    startX = thisX + initX + cellWidth * cellColumnSrc + lineThickness * cellColumnSrc;
    startY = thisY + initY + cellHeight * cellRowSrc + lineThickness * cellRowSrc;
    console.log('boardMovingObjects startX: ' + startX + ' startY: ' + startY);
    
    createCellCanvas2(startX, startY, destCellType);
    
    //    endX = startX;
    //    endY = thisY + initY + cellHeight * cellRow + lineThickness * cellRow;
    
    endX = thisX + initX + cellWidth * cellColumnDest + lineThickness * cellColumnDest;
    endY = thisY + initY + cellHeight * cellRowDest + lineThickness * cellRowDest;
    
    
    //    var destX = startX;
    //    var destY = thisY + initY + cellHeight * cellRow + lineThickness * cellRow;
    console.log('boardMovingObjects endX: ' + endX + ' endY: ' + endY);
    
    
    clearCell(startX, startY);
    
    
    boardDrawAtPoints(endX, endY);
    
}
function boardEatingObjects(event)
{
    console.log('boardEatingObjects... event:' + event);
    
    currentEvent = event;
    var text = event.data;
    var tagSrc = text.SourceTag;
    var tagDest = text.DestTag;
//    var cellType = text.CellType;
    var cellType = text.SrcCellType;
    var destCellType = text.DestCellType;
    dropDestCellType = text.DestCellType;
    eatenTag = text.EatenCellTag;
    
    console.log('boardEatingObjects tagsrc: ' + tagSrc + ' tagDest: ' + tagDest + ' celltype: ' + cellType + ' eatingTag: ' + eatenTag);
    
    var cellColumnSrc = getColumnWithTag(tagSrc);
    var cellRowSrc = getRowsWithTag(tagSrc);
    var cellType;// = text.CellType;
    
    var cellColumnDest = getColumnWithTag(tagDest);
    var cellRowDest = getRowsWithTag(tagDest);
    
    console.log('boardEatingObjects cellColumnSrc: ' + cellColumnSrc + ' cellRowSrc: ' + cellRowSrc);
    console.log('boardEatingObjects cellColumnDest: ' + cellColumnDest + ' cellRowDest: ' + cellRowDest);
    
//    dropCellType = cellType;
    dropCellType = cellType;
    
//    var initX = lineThickness;
//    var initY = lineThickness;
//    
//    startX = thisX + initX + cellWidth * cellColumnSrc + lineThickness * cellColumnSrc;
//    startY = thisY + initY + cellHeight * cellRowSrc + lineThickness * cellRowSrc;
    
    startX = getXForColumn(cellColumnSrc);
    startY = getYForRow(cellRowSrc);
    console.log('boardEatingObjects startX: ' + startX + ' startY: ' + startY);
    
    createCellCanvas2(startX, startY, destCellType);
    
//    endX = thisX + initX + cellWidth * cellColumnDest + lineThickness * cellColumnDest;
//    endY = thisY + initY + cellHeight * cellRowDest + lineThickness * cellRowDest;
    
    endX = getXForColumn(cellColumnDest);
    endY = getYForRow(cellRowDest);
    
    console.log('boardEatingObjects endX: ' + endX + ' endY: ' + endY);
    
    clearCell(startX, startY);
    
    boardDrawAtPoints(endX, endY);
    
    removeCell(eatenTag);

}
function getXForColumn(cellColumnSrc)
{
    var initX = lineThickness;
    var xOrigin = thisX + initX + cellWidth * cellColumnSrc + lineThickness * cellColumnSrc;
    return xOrigin;
}
function getYForRow(cellRowSrc)
{
    var initY = lineThickness;
    var yOrigin = thisY + initY + cellHeight * cellRowSrc + lineThickness * cellRowSrc;
    return yOrigin;
}
function removeCell(tag)
{
    var cellColumnEaten = getColumnWithTag(eatenTag);
    var cellRowEaten = getRowsWithTag(eatenTag);
    clearCell(getXForColumn(cellColumnEaten), getYForRow(cellRowEaten));
}
function clearCell(x,y)
{
    ctx.beginPath();
    ctx.clearRect(x, y, cellWidth, cellHeight);
    
    ctx.fillStyle = "Peru";
    ctx.fillRect(x, y, cellWidth, cellHeight);
    
//    ctx.beginPath();
//    ctx.clearRect(startX, startY, cellWidth, cellHeight);
//    
//    ctx.fillStyle = "Brown";
//    ctx.fillRect(startX, startY, cellWidth, cellHeight);
}

function boardDrawAtPoints(x,y) {
    mouseX = parseInt(x);
    mouseY = parseInt(y);
    currentX = parseInt(startX);
    currentY = parseInt(startY);
    
    points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
    currentFrame = 0;
    currentX = mouseX;
    currentY = mouseY;
    animate();
}

function boardDrawCircleForCellCanvas(x, y) {
    console.log('boardDrawCircleForCellCanvas dropdestcelltype: ' + dropDestCellType + ' cellTypes.ooCell: ' + cellTypes.ooCell);
    
//    console.log('boardDrawCircleForCellCanvas xCellColor: ' + xCellColor + ' oCellColor ' + oCellColor);
    
    ctx.beginPath();
    switch (dropDestCellType + 1)
    {
        case (cellTypes.xCell):
        {
            ctx.fillStyle = xCellColor;
            ctx.strokeStyle = xCellColor;
            var xCenter = endX + cellWidth / 2.0;
            var yCenter = endY + cellHeight / 2.0;
            var r = cellWidth * 0.40;
            ctx.arc(xCenter, yCenter, r, 0, 360);
            ctx.fill();
            console.log('boardDrawCircleForCellCanvas xCell');
            break;
        }
        case (cellTypes.oCell):
        {
            ctx.fillStyle = oCellColor;
            ctx.strokeStyle = oCellColor;
            var xCenter = endX + cellWidth / 2.0;
            var yCenter = endY + cellHeight / 2.0;
            var r = cellWidth * 0.40;
            ctx.arc(xCenter, yCenter, r, 0, 360);
            ctx.fill();
            console.log('boardDrawCircleForCellCanvas oCell');
            break;
        }
        case (cellTypes.xxCell):
        {
            ctx.fillStyle = xCellColor;
            ctx.strokeStyle = xCellColor;
            var xCenter = endX + cellWidth / 2.0;
            var yCenter = endY + cellHeight / 2.0;
            var r = cellWidth * 0.40;
            ctx.arc(xCenter, yCenter, r, 0, 360);
            ctx.fill();
            
            console.log('boardDrawCircleForCellCanvas xxCell');
            drawAStar(ctx, endX, endY);
            break;
        }
        case (cellTypes.ooCell):
        {
//            console.log('boardDrawCircleForCellCanvas ooCell at the beginning');
            ctx.fillStyle = oCellColor;
            ctx.strokeStyle = oCellColor;
            var xCenter = endX + cellWidth / 2.0;
            var yCenter = endY + cellHeight / 2.0;
            var r = cellWidth * 0.40;
            ctx.arc(xCenter, yCenter, r, 0, 360);
            ctx.fill();
            
            console.log('boardDrawCircleForCellCanvas ooCell');
            drawAStar(ctx, endX, endY);
            break;
        }
        default:
            //            console.log('createCellcanvas2 switch default should no have seeen this');
            break;
            
    }
    
    
    
    
//    ctx.beginPath();
//    //    console.log('boardDraw afte beginpath canvas.width ' + canvas.width + ' canvas.height: ' + canvas.height);
//    
////    if (dropCellType == 1)
////    {
////        ctx.fillStyle = xCellColor;
////        ctx.strokeStyle = xCellColor;
////    }
////    else
////    {
////        ctx.fillStyle = oCellColor;
////        ctx.strokeStyle = oCellColor;
////    }
////
//////    ctx.fillStyle = "Red";
//    
//    var xCenter = endX + cellWidth / 2.0;
//    var yCenter = endY + cellHeight / 2.0;
//    var r = cellWidth * 0.40;
//    ctx.arc(xCenter, yCenter, r, 0, 360);
//    ctx.fill();
////    ctx.stroke();
//    //    console.log('boardDraw x ' + xCenter + ' y ' + yCenter + ' r ' + r);
//    
////    drawAStar(ctx, endX, endY);
}

function animate() {
//    console.log('animate function');
    var point = points[currentFrame++];
    //    boardDraw(point.x, point.y);
    boardDrawCanvas(point.x, point.y);
    
    // refire the timer until out-of-points
    if (currentFrame < points.length) {
        previousPoint = point;
//        console.log('animate previouspoint.x: ' + previousPoint.x + ' previousPoint.y: ' + previousPoint.y);
        timer = setTimeout(animate, animteTime / 60);
    }
    else
    {
//        console.log('finished animated');
        if (cellCanvas.parentNode)
        {
//            console.log('animate cellCanvas is active.  finished animated');
//            myAudio.playSound2();
            clearCell(endX, endY);
            boardDrawCircleForCellCanvas(previousPoint.x, previousPoint.y);
            document.body.removeChild(cellCanvas);
            
            window.messageBus.send(currentEvent.senderId, 12345);
        }
    }
}

function linePoints(x1, y1, x2, y2, frames) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var length = Math.sqrt(dx * dx + dy * dy);
    var incrementX = dx / frames;
    var incrementY = dy / frames;
    var a = new Array();
    
    a.push({
           x: x1,
           y: y1
           });
    for (var frame = 0; frame < frames - 1; frame++) {
        a.push({
               x: x1 + (incrementX * frame),
               y: y1 + (incrementY * frame)
               });
    }
    a.push({
           x: x2,
           y: y2
           });
    return (a);
}
function boardDrawCanvas(x, y) {
    cellCanvas.style.left = x + "px";
    cellCanvas.style.top = y + "px";
//    console.log('boardDrawCanvas x: ' + x + ' y: ' + y);
    
}
function boardCellColorPairsObject(jsonText)
{
    xCellColor = getColorCode(jsonText.xCellColor);
    oCellColor = getColorCode(jsonText.oCellColor);
    console.log('checkers boardCellColorPairsObject xcellcolor: ' + xCellColor + ' oCellColor: ' + oCellColor);
    boardDrawPlayersCells();
}
function getColorCode(colorStringCode)
{
//    console.log('getcolorCode colorstringcode: ' + colorStringCode);
    switch (colorStringCode)
    {
        case '1':
        {
            return colors.blackColor;
            break;
        }
        case '2':
        {
            return colors.darkGrayColor;
            break;
        }
        case '3':
        {
            return colors.lightGrayColor;
            break;
        }
        case '4':
        {
            return colors.whiteColor;
            break;
        }
        case '5':
        {
            return colors.grayColor;
            break;
        }
        case '6':
        {
            return colors.redColor;
            break;
        }
        case '7':
        {
            return colors.blueColor;
            break;
        }
        case '8':
        {
            return colors.cyanColor;
            break;
        }
        case '9':
        {
            return colors.yellowColor;
            break;
        }
        case '10':
        {
            return colors.magentaColor;
            break;
        }
        case '11':
        {
            return colors.orangeColor;
            break;
        }
        case '12':
        {
            return colors.purpleColor;
            break;
        }
        case '13':
        {
            return colors.brownColor;
            break;
        }
        default:
            return colors.blueColor;
            break;
    }

}
function boardCellColorPairsObject_old(colorCollectionTag)
{
//    console.log('boardcellcolorpairboject colorcollecitontag: ' + colorCollectionTag);
    switch (colorCollectionTag)
    {
        case '1':
        {
//            console.log('boardcellcolorpairboject case 1 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.redColor;
            oCellColor = colors.blueColor;
            break;
        }
        case '2':
        {
//            console.log('boardcellcolorpairboject case 2 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.purpleColor;
            oCellColor = colors.lightGrayColor;
            break;
        }
        case '3':
        {
//            console.log('boardcellcolorpairboject case 3 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.blackColor;
            oCellColor = colors.whiteColor;
            break;
        }
        case '4':
        {
//            console.log('boardcellcolorpairboject case 4 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.cyanColor;
            oCellColor = colors.yellowColor;
            break;
        }
        case '5':
        {
//            console.log('boardcellcolorpairboject case 5 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.magentaColor;
            oCellColor = colors.orangeColor;
            break;
        }
        case '6':
        {
//            console.log('boardcellcolorpairboject case 6 colorcollecitontag: ' + colorCollectionTag);
            xCellColor = colors.brownColor;
            oCellColor = colors.blueColor;
            break;
        }
        case '7':
        {
//            console.log('boardcellcolorpairboject case 7 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.redColor;
            xCellColor = colors.blueColor;
            break;
        }
        case '8':
        {
//            console.log('boardcellcolorpairboject case 8 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.purpleColor;
            xCellColor = colors.lightGrayColor;
            break;
        }
        case '9':
        {
//            console.log('boardcellcolorpairboject case 9 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.blackColor;
            xCellColor = colors.whiteColor;
            break;
        }
        case '10':
        {
//            console.log('boardcellcolorpairboject case 10 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.cyanColor;
            xCellColor = colors.yellowColor;
            break;
        }
        case '11':
        {
//            console.log('boardcellcolorpairboject case 11 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.magentaColor;
            xCellColor = colors.orangeColor;
            break;
        }
        case '12':
        {
//            console.log('boardcellcolorpairboject case 12 colorcollecitontag: ' + colorCollectionTag);
            oCellColor = colors.brownColor;
            xCellColor = colors.blueColor;
            break;
        }
        default:
            break;
    }
    
}

function boardHiLiCells(event)  //for moving cells
{
    console.log('boardHiLiForcedCells event ' + event);
    currentEvent = event;
    var text = event.data;
    var hints = text.HintsArray;
    console.log('boardHiLiForcedCells hints: ' + hints + ' oneobject: ' + hints[0]);
    
    for (var i=0; i<hints.length; i++)
    {
        highLightACell(hints[i], colorArray[1]);
//        console.log('boardHiLiForcedCells i: ' + i + ' color: ' + colorArray[i]);
    }
    
}

function boardHiLiForcedCells(event)  //for eating cells
{
    console.log('boardHiLiCells event ' + event);
    currentEvent = event;
    var text = event.data;
    var hints = text.HintsArray;
    console.log('boardHiLiCells hints: ' + hints + ' oneobject: ' + hints[0]);
    
    var inc = 0;
    var half = Math.floor(hints.length / 2);
    for (var i=0; i<half; i++)
    {
        highLightACell(hints[i + inc++], colorArray[i]);
        highLightACell(hints[i + inc], colorArray[i]);
        console.log('boardHiLiCells i: ' + i + ' color: ' + colorArray[i]);
    }
    
}
function highLightACell(tag, aColor)
{
    console.log('highLightACell tag: ' + tag);
    var cellColumn = getColumnWithTag(tag);
    var cellRow = getRowsWithTag(tag);
    var x = getXForColumn(cellColumn);
    var y = getYForRow(cellRow);
    console.log('highLightACell x ' + x + ' y ' + y + ' cellWidth ' + cellWidth + ' cellHeight ' + cellHeight);
    
    ctx.beginPath();
    ctx.lineWidth = lineThickness; // * 5;
    console.log('highLightACell tag: ' + tag + ' color: ' + aColor);
    ctx.strokeStyle = aColor;   //"Aqua";   //'#FFCCBB';
    
    ctx.rect(x, y, cellWidth, cellHeight);
    ctx.stroke();
    
}
function hideHintForACell(tag)
{
    console.log('hideHintForACell tag: ' + tag);
    var cellColumn = getColumnWithTag(tag);
    var cellRow = getRowsWithTag(tag);
    var x = getXForColumn(cellColumn);
    var y = getYForRow(cellRow);
    console.log('hideHintForACell x ' + x + ' y ' + y + ' cellWidth ' + cellWidth + ' cellHeight ' + cellHeight);
    
    ctx.beginPath();
    ctx.lineWidth = lineThickness; // * 5;
//    console.log('hideHintForACell tag: ' + tag + ' color: ' + aColor);
    ctx.strokeStyle = "Peru";   //"LightGray";
    
    ctx.rect(x, y, cellWidth, cellHeight);
    ctx.stroke();
}
function boardRemoveHints(event)
{
    console.log('boardRemoveHints event ' + event);
    currentEvent = event;
    var text = event.data;
    var hints = text.HintsArray;
    console.log('boardRemoveHints hints: ' + hints + ' oneobject: ' + hints[0]);
    
    for (var i=0; i<hints.length; i++)
    {
        hideHintForACell(hints[i]);
    }
}

board.prototype.calcDimensions = boardCalcDimensions;
board.prototype.clear = boardClear;
board.prototype.drawGrid = boardDrawGrid;
board.prototype.movingObjects = boardMovingObjects;
board.prototype.eatingObjects = boardEatingObjects;
board.prototype.hiLiCells = boardHiLiCells;
board.prototype.hiLiForcedCells = boardHiLiForcedCells;
board.prototype.removeHints = boardRemoveHints;
board.prototype.margin = 50;
board.prototype.reset = boardReset;
board.prototype.draw = boardDraw;
board.prototype.initDraw = boardInitDraw;
board.prototype.drawAtPoints = boardDrawAtPoints;
board.prototype.cellColorPairsObject = boardCellColorPairsObject;
