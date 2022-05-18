let delta = 0;
let time = performance.now();

let audio = document.getElementById("media-player-audio");
let elements = [document.getElementsByClassName("b-hero-page-content")[0]];

let x = [0];
let y = [0];
let width = [0];
let height = [0];
let background_color = [0];
let text = [0];
let border_radius = [0];

// @REFACTOR?
for (let i = 1; i < 8; i++) {
    elements.push(document.createElement("div"));
    elements[i].style.position = "absolute";
    elements[i].style.opacity = "0";
    elements[i].style.margin = "0px";
    elements[i].style.padding = "0px";
    elements[i].style.border = "none";
    elements[i].style.left = "0px";
    elements[i].style.top = "0px";
    elements[i].style.width = "0px";
    elements[i].style.height = "0px";
    elements[i].style.zIndex = "0";
    elements[i].style.overflow = "hidden";
    elements[0].append(elements[i]);

    x.push(0);
    y.push(0);
    width.push(0);
    height.push(0);
    background_color.push([255, 255, 255, 1]);
    text.push("");
    border_radius.push(0);
}

// ELEMENTS
let rt = 0; // ROOT
let pb = 1; // PLAY BUTTON
let pr = 2; // PROGRESS BAR
let pi = 3; // PROGRESS INDICATOR
let ph = 4; // PLAYHEAD
let tc = 5; // TIME CURRENT
let tl = 6; // TIME LEFT

// TIME
let tma = 0; // TIME MAX
let tcu = 0; // TIME CURRENT
let mm = 0; // MINUTES MAX
let mc = 0; // MINUTES CURRENT
let sm = 0; // SECONDS MAX
let sc = 0; // SECONDS CURRENT

let loaded = 0;
let playing = 0;
let select = true;

// EVENTS
let click = 0;
let drag = 0;
let mouse_pos = 0;
let play = 0;
let pause = 0;
let stop = 0;

// WINDOW
window.addEventListener("mouseup", function (event) { drag = 0; select = true; });
window.addEventListener("mousemove", function (event) {
    mouse_pos = (event.pageX - x[rt]);
});
window.onselectstart = function (e) { return select; }

// ELEMENTS
elements[pb].addEventListener("mousedown", function (event) {
    if (playing === 1) { playing = 0; pause = 1; }
    else { playing = 1; play = 1; }
});

elements[pr].addEventListener("mousedown", function (event) { click = 1; });
elements[pi].addEventListener("mousedown", function (event) { click = 1; });
elements[ph].addEventListener("mousedown", function (event) { drag = 1; select = false; });

// REMOVE DEFAULT DRAG
elements[pb].addEventListener('dragstart', (event) => { event.preventDefault() });
elements[pi].addEventListener('dragstart', (event) => { event.preventDefault() });
elements[ph].addEventListener('dragstart', (event) => { event.preventDefault() });

// AUDIO
audio.addEventListener("play", function (event) { playing = 1; play = 1; });
audio.addEventListener("pause", function (event) { playing = 0; pause = 1; });
let load = setInterval(function () {
    if (isNaN(audio.duration) === false) {
        tma = audio.duration;
        let a = tma / 60;
        mm = Math.floor(a);
        sm = Math.floor(tma);
        loaded = 1;
        clearInterval(load);
    }
}, 10);






// @DONE
function init_player() {

    // PLAY BUTTON [pb]
    background_color[pb] = [200, 200, 200, 0];
    elements[pb].style.backgroundImage = 'url("scripts/play.png")';
    elements[pb].style.backgroundRepeat = "no-repeat";
    elements[pb].style.backgroundPosition = "center";
    elements[pb].style.backgroundSize = "cover";

    // PROGRESS BAR [pr]
    background_color[pr] = [200, 200, 200, 1];
    border_radius[pr] = 10;

    // PROGRESS INDICATOR [pi]
    background_color[pi] = [240, 175, 11, 1];
    border_radius[pi] = 10;
    width[pi] = 0;

    // PLAYHEAD [ph]
    background_color[ph] = [240, 175, 11, 1];
    elements[ph].style.zIndex = "1";
    elements[ph].style.boxShadow = "0.3px 0.3px 2px gray";
    border_radius[ph] = 10;

    // TIME CURRENT [tc]
    text[tc] = "0.00";
    background_color[tc] = [200, 200, 200, 0];
    elements[tc].style.width = "auto";
    elements[tc].style.height = "auto";

    // TIME LEFT [tl]
    text[tl] = "-0.00";
    background_color[tl] = [200, 200, 200, 0];
    elements[tl].style.width = "auto";
    elements[tl].style.height = "auto";
}








function update_player() {

    // ROOT [rt]
    let root = elements[0].getBoundingClientRect();
    x[rt] = root.x;
    y[rt] = root.y;
    width[rt] = root.width;
    height[rt] = root.height;

    // PLAY BUTTON [pb]
    width[pb] = 90;
    height[pb] = 90;
    x[pb] = (width[rt] * 0.5) - (width[pb] * 0.5);
    y[pb] = (height[rt] * 0.5) - (height[pb] * 0.5);

    // PROGRESS BAR [pr]
    x[pr] = 50;
    height[pr] = 7;
    y[pr] = height[rt] - (height[pr] / 2);
    width[pr] = (width[rt] - x[pr]) - 50;

    // PROGRESS INDICATOR [pi]
    height[pi] = 7;
    x[pi] = 50;
    y[pi] = height[rt] - (height[pi] / 2);

    if (click === 1) { width[pi] = mouse_pos - x[pi]; }
    if (drag === 1) { width[pi] = mouse_pos - x[pi]; }
    if (width[pi] > width[pr]) { width[pi] = width[pr]; }
    else if (width[pi] < 0) { width[pi] = 0; }

    // PLAYHEAD [ph]
    width[ph] = 12;
    height[ph] = 12;
    x[ph] = (x[pi] + width[pi]) - (width[ph] * 0.5);
    y[ph] = height[rt] - (height[ph] * 0.5);

    // TIME CURRENT [tc]
    x[tc] = 50;
    y[tc] = (y[pr] - height[tc]) - 5;
    width[tc] = elements[tc].clientWidth;
    height[tc] = elements[tc].clientHeight;

    // TIME LEFT [tl]
    height[tl] = elements[tl].clientHeight;
    width[tl] = elements[tl].clientWidth;
    x[tl] = (x[pr] + width[pr] - width[tl]);
    y[tl] = (y[pr] - height[tl]) - 5;
}




function update_audio() {

    if (click === 1) {
        tcu = tma * (width[pi] / width[pr]);
        audio.currentTime = tcu;
    }

    else if (drag === 1) {
        pause = 1;
        playing = 0;
        tcu = tma * (width[pi] / width[pr]);
        audio.currentTime = tcu;
    }
    else if (playing === 1) {
        tcu = audio.currentTime;
    }

    if (play === 1) {
        elements[pb].style.backgroundImage = 'url("scripts/pause.png")';
        audio.play();
        play = 0;
    }

    else if (pause === 1) {
        elements[pb].style.backgroundImage = 'url("scripts/play.png")';
        audio.pause();
        pause = 0;
    }

    else if (stop === 1) {
        audio.pause();
        audio.currentTime = 0;
        tcu = 0;
    }

    // UPDATE PLAYER
    width[pi] = width[pr] * (tcu / tma);

    // MIN
    let a = tcu / 60;
    mc = Math.floor(a);
    // SEC
    let b = (a - mc) * 60;
    sc = Math.floor(b);

    text[tc] = "" + mc + "." + sc;
    if (b < 10) { text[tc] = "" + mc + ".0" + sc; }

    // MIN
    let c = (tma - tcu) / 60;
    let d = Math.floor(c);
    // SEC
    let e = (sm - (d * 60)) - (sc + (mc * 60));

    text[tl] = "-" + d + "." + e;
    if (e < 10) { text[tl] = "-" + d + ".0" + e; }

}



function init_dom() {
    for (let i = 1; i < elements.length; i++) {
        elements[i].style.opacity = "1";
    }
}


function update_dom() {

    // RENDER ELEMENTS
    for (let i = 1; i < elements.length; i++) {
        elements[i].style.transform = "translate(" + x[i] + "px, " + y[i] + "px)";
        if (i === tc || i === tl) {
            elements[i].style.width = "auto";
            elements[i].style.height = "auto";
        }
        else {
            elements[i].style.width = width[i] + "px";
            elements[i].style.height = height[i] + "px";
        }
        elements[i].style.backgroundColor =
            "rgba(" + background_color[i][0] +
            "," + background_color[i][1] +
            "," + background_color[i][2] +
            "," + background_color[i][3] + ")";
        elements[i].textContent = text[i];
        elements[i].style.borderRadius = border_radius[i] + "px";
    }

    // RESET EVENTS
    click = 0;
}


function update() {

    let new_time = performance.now();
    delta = new_time - time;
    time = new_time;

    update_player();
    if (loaded === 1) { update_audio(); }
    update_dom();

    window.requestAnimationFrame(update);
}

// RUN
init_player();
update_player();
init_dom();
update_dom();
update();

