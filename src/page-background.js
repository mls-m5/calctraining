"use strict";


function createAluminumBackground(offset, noise) {
    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    var width = canvas.width;
    var height = canvas.height;
    window.context = canvas.getContext('2d');

    var imageData = context.createImageData(100, 100);

    var data = imageData.data;

    var value;
    for (var i = 0; i < data.length; i += 4) {
        value = Math.random() * noise + offset;
        data[i] = value;
    }

    var brushedData = [];

    var brushWidth = 20;
    for (var x = 0; x < width; ++x) for (var y = 0; y < height; ++y) {
        var b = 0;
        for (var w = 0; w < brushWidth; ++w) {
            //Count a vertical average
            b += data[((x + w) % width + y * width) * 4];
        }
        b /= brushWidth;
        brushedData[x + y * width] = b;
    }

    var value;
    for (var i = 0; i < data.length; ++i) {
        value = brushedData[i];
        var di = i * 4;
        data[di] = value;
        data[di+1] = value;
        data[di + 2] = value;
        data[di + 3] = 255;
    }

    context.putImageData(imageData, 0, 0);

    return canvas;
}

function generateBackground() {
    var c1 = createAluminumBackground(150, 20);
    document.body.style.backgroundImage = "url(" + c1.toDataURL() + ")";
}

