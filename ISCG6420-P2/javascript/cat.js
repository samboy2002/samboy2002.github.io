class Cat {
    constructor(context, left, top, speed) {
        this.ctx = context;
        this.faceTo = FACE_TO_LEFT;
        this.armTo = ARM_TO_UP;
        this.left = left;
        this.top = top;
        this.speed = speed;

        this.leftEye = new CatEye(this.ctx);
        this.rightEye = new CatEye(this.ctx);
        this.nose = new CatNose(this.ctx);
        this.ears = new CatEars(this.ctx);
        this.arms = new CatArms(this.ctx);
        this.legs = new CatLegs(this.ctx);
        this.net = new CatchNet(this.ctx);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.left, this.top, 40, 0, 2 * Math.PI);
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.closePath();


        this.leftEye.draw(this.left - 15, this.top - 10, this.faceTo);
        this.rightEye.draw(this.left + 15, this.top - 10, this.faceTo);
        this.nose.draw(this.left, this.top + 15);
        this.ears.draw(this.left - 35, this.top - 20);
        this.arms.draw(this.left - 50, this.top + 55, this.faceTo, this.armTo);

        this.legs.draw(this.left - 30, this.top + 150);

        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(this.left - 20, this.top + 35);
        this.ctx.bezierCurveTo(this.left - 100, this.top + 150, this.left + 100, this.top + 150, this.left + 20, this.top + 35);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.stroke();

        // let tail = new CatTail(this.ctx);
        // tail.draw(this.left+35, this.top+100, this.faceTo);

        if (this.faceTo == FACE_TO_LEFT) {
            this.net.draw(this.left - 90, this.top + 30, this.faceTo, this.armTo);
        } else if (this.faceTo = FACE_TO_RIGHT) {
            this.net.draw(this.left + 100, this.top + 30, this.faceTo, this.armTo);
        }
    }

    moveToLeft() {
        this.faceTo = FACE_TO_LEFT;
        if (this.left <= 220) return;

        this.left -= this.speed;
    }

    moveToRight() {
        this.faceTo = FACE_TO_RIGHT;
        if (this.left >= CANVAS_WIDTH - 230) return;

        this.left += this.speed;
    }

    upArm() {
        this.armTo = ARM_TO_UP;
    }
    downArm() {
        this.armTo = ARM_TO_DOWN;
    }

    collisionDetect(ball) {
        // -1 fail, 0 normal, 1 catched
        if (this.arms.collisionDetect(ball)) {
            return -1;
        }

        if (this.legs.collisionDetect(ball)) {
            return -1;
        }

        if (this.net.collisionDetect(ball)) {
            return 1;
        }

        return 0;
    }
}

class CatEye {
    constructor(context) {
        this.ctx = context;
    }

    draw(left, top, faceTo) {
        this.ctx.beginPath();
        this.ctx.arc(left, top, 10, 0, 2 * Math.PI);
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        if (faceTo == FACE_TO_LEFT) {
            this.ctx.arc(left - 2, top + 2, 6, 0, 2 * Math.PI);
        } else if (faceTo == FACE_TO_RIGHT) {
            this.ctx.arc(left + 2, top + 2, 6, 0, 2 * Math.PI);
        }
        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = 'black';
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

class CatNose {
    constructor(context) {
        this.ctx = context;
    }

    draw(left, top) {
        this.ctx.beginPath();
        this.ctx.arc(left, top, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = 'pink';
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(left - 5, top - 3);
        this.ctx.bezierCurveTo(left - 40, top - 15, left - 40, top + 15, left - 5, top + 3);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(left + 5, top - 3);
        this.ctx.bezierCurveTo(left + 40, top - 15, left + 40, top + 15, left + 5, top + 3);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(left - 20, top - 3);
        this.ctx.lineTo(left - 50, top - 20);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(left - 20, top);
        this.ctx.lineTo(left - 50, top);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(left - 20, top + 3);
        this.ctx.lineTo(left - 50, top + 20);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(left + 20, top - 3);
        this.ctx.lineTo(left + 50, top - 20);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(left + 20, top);
        this.ctx.lineTo(left + 50, top);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(left + 20, top + 3);
        this.ctx.lineTo(left + 50, top + 20);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(left, top + 5, 15, 0, Math.PI, false);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(left, top + 18, 10, 0, Math.PI, true);
        this.ctx.fillStyle = 'pink';
        this.ctx.fill();
        this.ctx.stroke();
    }
}

class CatEars {
    constructor(context) {
        this.ctx = context;
    }

    draw(left, top, faceTo) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(left, top);
        this.ctx.lineTo(left, top - 30);
        this.ctx.lineTo(left + 30, top - 20);
        //this.ctx.arc(left, top, 15, 0.5 * Math.PI, 2 * Math.PI);
        this.ctx.fillStyle = 'pink';
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(left + 50, top - 18);
        this.ctx.lineTo(left + 75, top - 30);
        this.ctx.lineTo(left + 70, top + 2);
        // this.ctx.arc(left+70, top, 15, 0.5 * Math.PI, Math.PI, true);
        this.ctx.fillStyle = 'pink';
        this.ctx.fill();
        this.ctx.stroke();
    }
}

class CatArms {
    constructor(context) {
        this.ctx = context;
    }

    draw(left, top, faceTo, armTo) {
        if (faceTo == FACE_TO_LEFT && armTo == ARM_TO_UP) {
            this.leftPath = new Path2D();
            this.leftPath.ellipse(left, top, 50, 15, Math.PI / 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill(this.leftPath);
            this.ctx.stroke(this.leftPath);

            this.rightPath = new Path2D();
            this.rightPath.ellipse(left + 110, top + 30, 50, 15, Math.PI / 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill(this.rightPath);
            this.ctx.stroke(this.rightPath);
        }

        if (faceTo == FACE_TO_LEFT && armTo == ARM_TO_DOWN) {
            this.leftPath = new Path2D();
            this.leftPath.ellipse(left, top, 50, 15, Math.PI / 10, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill(this.leftPath);
            this.ctx.stroke(this.leftPath);

            this.rightPath = new Path2D();
            this.rightPath.ellipse(left + 110, top + 30, 50, 15, Math.PI / 8, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill(this.rightPath);
            this.ctx.stroke(this.rightPath);
        }

        if (faceTo == FACE_TO_RIGHT && armTo == ARM_TO_UP) {
            this.leftPath = new Path2D();
            this.leftPath.ellipse(left, top + 30, 50, 15, -1 * Math.PI / 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill(this.leftPath);
            this.ctx.stroke(this.leftPath);

            this.rightPath = new Path2D();
            this.rightPath.ellipse(left + 110, top, 50, 15, -1 * Math.PI / 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill(this.rightPath);
            this.ctx.stroke(this.rightPath);
        }

        if (faceTo == FACE_TO_RIGHT && armTo == ARM_TO_DOWN) {
            this.leftPath = new Path2D();
            this.leftPath.ellipse(left, top + 30, 50, 15, -1 * Math.PI / 8, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill(this.leftPath);
            this.ctx.stroke(this.leftPath);

            this.rightPath = new Path2D();
            this.rightPath.ellipse(left + 110, top, 50, 15, -1 * Math.PI / 10, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill(this.rightPath);
            this.ctx.stroke(this.rightPath);
        }
    }

    collisionDetect(ball) {
        if (checkCollision(this.ctx, ball, this.leftPath)) return true;
        if (checkCollision(this.ctx, ball, this.rightPath)) return true;

        return false;
    }
}

class CatLegs {
    constructor(context) {
        this.ctx = context;
    }

    draw(left, top) {
        this.leftPath = new Path2D();
        this.leftPath.ellipse(left, top, 20, 50, Math.PI / 10, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white';
        this.ctx.fill(this.leftPath);
        this.ctx.stroke(this.leftPath);

        this.rightPath = new Path2D();
        this.rightPath.ellipse(left + 60, top, 20, 50, -1 * Math.PI / 10, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white';
        this.ctx.fill(this.rightPath);
        this.ctx.stroke(this.rightPath);
    }

    collisionDetect(ball) {
        if (checkCollision(this.ctx, ball, this.leftPath)) return true;
        if (checkCollision(this.ctx, ball, this.rightPath)) return true;

        return false;
    }
}
class CatTail {
    constructor(context) {
        this.ctx = context;
    }

    draw(left, top, faceTo) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 8;
        if (faceTo == FACE_TO_LEFT) {
            this.ctx.moveTo(left, top);
            this.ctx.quadraticCurveTo(left + 50, top + 70, left + 60, top + 20);
        } else if (faceTo == FACE_TO_RIGHT) {
            this.ctx.moveTo(left - 70, top);
            this.ctx.quadraticCurveTo(left - 130, top + 70, left - 130, top + 20);
        }
        this.ctx.stroke();
    }
}

class CatchNet {
    constructor(context) {
        this.ctx = context;
    }

    collisionDetect(ball) {
        if (this.armTo == ARM_TO_UP) return false;

        return checkCollision(this.ctx, ball, this.path);
    }

    draw(left, top, faceTo, armTo) {
        this.faceTo = faceTo;
        this.armTo = armTo;

        this.path = new Path2D();

        if (faceTo == FACE_TO_LEFT && armTo == ARM_TO_UP) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.moveTo(left, top);
            this.ctx.lineTo(left - 50, top - 50);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(left - 115, top - 125);
            this.ctx.lineTo(left - 40, top - 125);
            this.ctx.lineTo(left - 45, top - 55);
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fill();
            this.ctx.stroke();

            // this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.path.ellipse(left - 85, top - 85, 50, 25, Math.PI / 4, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fill(this.path);
            this.ctx.stroke(this.path);
        }

        if (faceTo == FACE_TO_RIGHT && armTo == ARM_TO_UP) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.moveTo(left, top);
            this.ctx.lineTo(left + 50, top - 50);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(left + 115, top - 125);
            this.ctx.lineTo(left + 40, top - 125);
            this.ctx.lineTo(left + 45, top - 55);
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fill();
            this.ctx.stroke();

            // this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.path.ellipse(left + 85, top - 85, 50, 25, -1 * Math.PI / 4, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fill(this.path);
            this.ctx.stroke(this.path);
        }

        if (faceTo == FACE_TO_LEFT && armTo == ARM_TO_DOWN) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.moveTo(left, top + 15);
            this.ctx.lineTo(left - 50, top - 20);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(left - 115, top - 95);
            this.ctx.lineTo(left - 40, top - 95);
            this.ctx.lineTo(left - 45, top - 25);
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fill();
            this.ctx.stroke();

            // this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.path.ellipse(left - 85, top - 55, 50, 25, Math.PI / 4, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fill(this.path);
            this.ctx.stroke(this.path);
        }

        if (faceTo == FACE_TO_RIGHT && armTo == ARM_TO_DOWN) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.moveTo(left, top + 15);
            this.ctx.lineTo(left + 50, top - 20);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(left + 115, top - 95);
            this.ctx.lineTo(left + 40, top - 95);
            this.ctx.lineTo(left + 45, top - 25);
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fill();
            this.ctx.stroke();

            // this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.path.ellipse(left + 85, top - 55, 50, 25, -1 * Math.PI / 4, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'lightgray';
            this.ctx.fill(this.path);
            this.ctx.stroke(this.path);
        }
    }
}

function checkCollision(context, ball, path) {
    if (!path) return false;

    let x = ball.x;
    let y = ball.y;

    if (context.isPointInStroke(path, x, y-ball.radious)) return true;
    if (context.isPointInStroke(path, x-ball.radious, y)) return true;
    if (context.isPointInStroke(path, x+ball.radious, y)) return true;

    return false;
}