function getRandom(min, max) {
        min = (min >= 0 && max > 1) ? Math.ceil(min) : min;
        max = (max > 1) ? max | 0 : max;
        return ((Math.random() * (max - min +1)) | 0) + min;
}

function getRandomFloat(min, max) {
        return (Math.random() * (max - min +1)) + min;
}

function getRandomColor(min, max, alpha) {
    min = (min == null) ? 0 : min;
    max = (max == null) ? 255 : max;
    let r = getRandom(min, max);
    let g = getRandom(min, max);
    let b = getRandom(min, max);
    if(alpha != null && alpha >= 0 && alpha <= 1) {
        return "rgba("+r+","+g+","+b+","+alpha+")";
    }
    return "rgb("+r+","+g+","+b+")";
}
