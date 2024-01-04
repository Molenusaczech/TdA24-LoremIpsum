// https://codingartistweb.com/2021/06/double-range-slider-html-css-javascript/
let sliderOne;
let sliderTwo;
let displayValOne;
let displayValTwo;
let minGap = 0;
let sliderTrack;
let sliderMaxValue;
let percent1;
let percent2;

function slideOne(){
    console.log(sliderOne.value);
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}

function initSlider() {
    
    return
    sliderOne = document.getElementById("slider-1");
    sliderTwo = document.getElementById("slider-2");
    displayValOne = document.getElementById("range1");
    displayValTwo = document.getElementById("range2");
    sliderTrack = document.querySelector(".slider-track");
    sliderMaxValue = document.getElementById("slider-1").max;
    
    sliderOne.addEventListener("input", slideOne);
    sliderTwo.addEventListener("input", slideTwo);

    console.log(sliderOne);

    slideOne();
    slideTwo();



}

export { initSlider };