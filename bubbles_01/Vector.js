class Vector {
    x;
    y;
    history = [];
    withHistory;
    // withHistory have to be true if you want to have a log of the differents positions of the vector
    constructor(x, y, withHistory = false) {
        this.x = x;
        this.y = y;
        this.withHistory = withHistory;
        if(this.withHistory) {
            this.history.push({'x':x,'y':y});
        }
    }
}

// PROTO //

// save the current position in history before the vector is modified
Vector.prototype.saveHistory = function() {
    if(this.withHistory) {
        if(this.getHistory().x == this.x && this.getHistory().y == this.y) {
            return;
        }
        this.history.push({'x':this.x, 'y':this.y});
    }
}

// get the position loged in this.history at indix i or, the last position loged in history
Vector.prototype.getHistory = function(i) {
    if(i != null && i < this.history.length) {
        return this.history[i];
    } else {
        return this.history[this.history.length - 1];
    }
}
// give the distance between 2 vectors
Vector.prototype.distanceFrom = function(vector) {
    return Math.sqrt( Math.pow((vector.x-this.x), 2) + Math.pow((vector.y-this.y), 2) );
}

// give the norm of the vector
Vector.prototype.magnitude = function() {
    return Math.sqrt( Math.pow((this.x), 2) + Math.pow((this.y), 2) );
}

// move vector compared to the x and y passed in args
Vector.prototype.move = function(x, y) {
    this.saveHistory();
    this.x = x;
    this.y = y;
}

// rotate the vector around another by a given angle and maintain the distance between the 2 vectors
Vector.prototype.rotateAround = function(centerVector, angle) {
    this.saveHistory();
    let dist = this.distanceFrom(centerVector);
    this.x = (Math.cos(angle) * dist) + centerVector.x;
    this.y = (Math.sin(angle) * dist) + centerVector.y;
}

Vector.prototype.add = function(vector) {
    this.saveHistory();
    this.x += vector.x;
    this.y += vector.y;
}

Vector.prototype.sub = function(vector) {
    this.saveHistory();
    this.x -= vector.x;
    this.y -= vector.y;
}

// this one is a kind of scale function
Vector.prototype.mult = function(factor) {
    this.saveHistory();
    this.x *= factor;
    this.y *= factor;
}

// normalise the vector (make its norm = 1)
Vector.prototype.norm = function() {
    this.saveHistory();
    let mag = this.mag();
    this.x = this.x / mag;
    this.y = this.y / mag;
}

// draw the vector on canvas as a circle
Vector.prototype.display = function(ctx, size, fill = true, stroke = false) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    if(fill) {
        ctx.fill();
    }
    if(stroke) {
        ctx.stroke();
    }
    ctx.closePath();
}

// draw the vector on canvas as a 1x1 point
Vector.prototype.show = function(ctx) {
    ctx.rect(this.x, this.y, 1, 1);
    ctx.fill();
}

// draw a line between the current position of the vector and its previous position loged in this.history
Vector.prototype.drawCurrentToPrevious = function(ctx, x, y, skipFirstPlace) {
    let i = this.history.length - 1;
    ctx.moveTo(x, y);
    // skipFirstPlace is used to draw only after the vector have been move one time
    if(i == 0 && skipFirstPlace) {
        this.move(x, y);
    } else {
        ctx.lineTo(this.history[i].x, this.history[i].y);
    }
    this.move(x, y);
}

// draw a shape that poitn coordinates are passed in an array
// args posArray add to be format as an object array  [{'x':x,'y':y},...]
Vector.prototype.drawShape = function(ctx, posArray) {
    ctx.beginPath();
    for(let i = 0; i < posArray.length; i++) {
        this.move(posArray[i].x, posArray[i].y);
        ctx.moveTo(posArray[i].x, posArray[i].y)
        if(i != 0) {
            ctx.lineTo(posArray[i - 1].x, posArray[i - 1].y);
        }
        if(i == posArray.length -1) {
            ctx.moveTo(posArray[0].x, posArray[0].y);
            ctx.lineTo(posArray[i].x, posArray[i].y)
        }
    }
    ctx.closePath();
    ctx.stroke();
}
