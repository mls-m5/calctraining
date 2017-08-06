"use strict";


generateBackground();


let termaEl = document.getElementById("terma");
let termbEl = document.getElementById("termb");
let hintEl = document.getElementById("hint")
let opEl = document.getElementById("op");
let inputEl = document.getElementById("input");

function getCharFromEvent(e) {
    var keynum;

    if(window.event){
        // IE
        keynum = e.keyCode;
    } else if(e.which){
        // Netscape/Firefox/Opera
        keynum = e.which;
    }
    
    if (typeof keynum == "undefined") {
        return "none";
    }
    
    return String.fromCharCode(keynum);
};

class Calc {
    constructor() {
        this.timeout = 0;
        this.newNumber();
    }

    newNumber() {
        this.terma = Math.round(Math.random() * 10);
        this.termb = Math.round(Math.random() * 10);



        termaEl.textContent = this.terma;
        termbEl.textContent = this.termb;
        hintEl.textContent = "(" + (this.terma * this.termb) + ")";

        moveSliderule(this.terma, this.termb);

        inputEl.value = "";

        this.setHintTimer();
    }

    setHintTimer() {
        let self = this;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = 0;
            // console.log("timeout cleared " + this.timeout);
        }

        this.timeout = setTimeout(function() {
            // console.log("timeout triggered " + self.timeout);
            self.timeout = 0;
            hintEl.style.display = "";
        }, 2000);

        hintEl.style.display = "none";

        // console.log("timeout set " + this.timeout);
    }

    operator(a, b) {
        return a * b;
    }

    returnPressed(input) {
        if (input == this.operator(this.terma, this.termb)) {
            this.newNumber();
        }
    }

}

let calc = new Calc();

inputEl.addEventListener("keypress", function(event) {
    let c = getCharFromEvent(event);

    if (c == " ") {
        let text = inputEl.value;
        text = text.trim();
        calc.returnPressed(text);


        // prevent default behaviour
        event.preventDefault();
        return false;
    }
    else if ("0123456789".indexOf(c) == -1) {
        event.preventDefault();
        return false;
    }

    return true;
});

inputEl.addEventListener("change", function(event) {
    let text = inputEl.value;

    calc.returnPressed(text);

    console.log(text);
});

