// CANVAS SETUP
const scene = document.querySelector("#canvas");
const scale = window.devicePixelRatio;
const xRatio = scale * 1;
const yRatio = scale * 1;
scene.width = document.getElementsByTagName("body")[0].clientWidth * xRatio;
scene.height = document.getElementsByTagName("body")[0].clientHeight * yRatio;
const ctx = scene.getContext('2d');
const width = scene.clientWidth;
const height = scene.clientHeight;

// CANVAS SETUP END

// permet d'effacer ou recouvrir le canvas avec un alpha teinté suivant l'argument passé
function clear(x, y, alpha) {
    let xO = 0;
    let yO = 0;
    // utiliser x et y en argument en cas de tranlastion du canvas par exemple
    if( x != null && y != null) {
        xO = x;
        yO = y;
    }
    if(alpha != null) {
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,"+alpha+")";
        ctx.fillRect(xO, yO, width, height);
        ctx.restore();
    } else {
        ctx.clearRect(xO, yO, width, height);
    }

}
