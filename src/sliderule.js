


c1 = document.getElementById("c1");
c2 = document.getElementById("c2");
indicator = document.getElementById("indicator");
inda = document.getElementById("inda");
indb = document.getElementById("indb");

ctx1 = c1.getContext("2d");
ctx2 = c2.getContext("2d");

function transformX(x) {
    return Math.log(x) * 100;
}

function drawTicks(ctx, y, orientation) {
    if (typeof y === "undefined") {
        y = 0;
    }
    if (typeof orientation === "undefined") {
        orientation = 1;
    }

    function drawTick(i, size, width) {
        if (typeof size === "undefined") {
            size = 1;
        }
        if (typeof width === "undefined") {
            width = 1;
        }
        let x = transformX(i);
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,size * 10);
        ctx.stroke();
    }

    function drawText(i, text) {
        if (typeof text === "undefined") {
            text = i;
        }
        let x = transformX(i);
        ctx.fillText(text, x, 10);
    }

    let ticks = [];
    let sizes = [];
    let width = [];

    ctx.font = "10px Arial";

    ctx.save();

    for (let i = 1; i <= 9; ++i) {
        drawText(i);
        drawText(i * 10, i);
    }

    ctx.translate(0, y);
    ctx.scale(1, orientation);

    for (let i = 1; i <= 10; ++i) {
        drawTick(i);
        drawTick(1 + i / 10, .5);
        drawTick(10 * i);
        drawTick(10 + i, .5);
    }


    drawTick(1, 2, 3);
    drawTick(10, 2, 3);
}


drawTicks(ctx1,20, -1);
drawTicks(ctx2);

function moveSliderule(a, b) {
    if (a === 0) {
        a = .001;
    }
    if (b === 0) {
        b = .001;
    }
    c2.style.marginLeft = transformX(a) + "px";
    inda.textContent = a;
    indb.textContent = b;
    indicator.style.marginLeft = transformX(a * b) + "px";
}
