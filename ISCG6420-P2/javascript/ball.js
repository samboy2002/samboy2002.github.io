class Ball {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.minRadious = 6;
        this.maxRadious = 20;
        this.visiable = true;
        this.radious = this.minRadious;
        this.growSpeed = (this.maxRadious - this.minRadious) / (5000 / TIME_INTERVAL);
        this.speed = speed;
        this.liveTime = 0;
    }

    isOutOfBound() {
        return this.y + this.radious < 0;
    }

    update() {
        this.liveTime += TIME_INTERVAL;

        if (this.radious < this.maxRadious) {
            this.radious += this.growSpeed;
        }

        if (this.liveTime > 12000) {
            this.y -= this.speed;
        }
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radious, 0, 2 * Math.PI);
        if (this.liveTime < 5000) {
            context.fillStyle = 'yellow';
        } else if (this.liveTime < 8000) {
            let grd = context.createRadialGradient(this.x, this.y, this.radious * ((this.liveTime-5000)/3000), this.x, this.y, this.radious);
            grd.addColorStop(0, 'red');
            grd.addColorStop(1, 'yellow');
            
            context.fillStyle = grd;
        } else {
            context.fillStyle = 'red';
        }
        
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'darkblue';
        context.stroke();
        context.closePath();
    }
}