// canvas context reset
ctx.fillStyle = "#FFF4";
ctx.strokeStyle = "#FFF";
//


var bubbles = [];
// number of bubbles at the begining of animation
var nbBubbles = 2500;

// populating array bublles with nbBubbles value, each bubble is given an random x and y coordinate with a size of 5px
for(let i = 0; i <= nbBubbles; i++) {
    bubbles.push(new Bubble(getRandom(0, width), getRandom(0, height), 5));
}

// update the color of each bubble compared to its size
function checkColor(bubble) {
    if(bubble.radius >= 15) {
        bubble.fillColor = "rgba(255, 255, 0, .2)";
    }
    if(bubble.radius >= 35) {
        bubble.fillColor = "rgba(20, 255, 255, .3)";
    }
    if(bubble.radius >= 45) {
        bubble.fillColor = "rgba(255, 0, 120, .4)";
    }
}

function draw() {
    // clear the canvas for animation style purpose
    clear();
    for(let i = 0; i < bubbles.length; i++) {
        // draw bubble on the canvas
        bubbles[i].display(ctx);
        // updates bubbles position for the next aniamtion frame
        bubbles[i].update(.5, .5);
        // verify if the bubble is about to go out the canvas limit
        bubbles[i].edge(width, height);

        // this two imbricated loops check if bubbles intersects with another one
        // if so, the largest bubble absorb the smallest growing its radius and the smallest is erased of the array
        // with a splice(), once it's done, it checks if the color of the bubble must be updated
        for(let j = i+1; j < bubbles.length; j++) {
            if(bubbles[i] !== bubbles[j]) {
                checkColor(bubbles[i]);
                checkColor(bubbles[j]);

                bubbles[i].merge(bubbles[j]);
                // when a bubble is absorbed, its size is set to 0px
                if(bubbles[i].radius == 0 || bubbles[j].radius == 0) {
                    let b = (bubbles[i].radius == 0) ? i : j;
                    bubbles.splice(b, 1);
                    i++;
                    j++;
                }

            }
        }
    }
    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
