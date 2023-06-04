const FACE_TO_LEFT = 1;
const FACE_TO_RIGHT = 2;
const ARM_TO_UP = 3;
const ARM_TO_DOWN = 4;
const TIME_INTERVAL = 10;
const CANVAS_WIDTH = window.innerWidth-100;
const CANVAS_HEIGHT = 740;

class GameSound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.volume = $('#volume').val();
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
}

class GameArea {
    constructor($container) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.canvas.style.border = '3px solid darkblue';
        this.canvas.style.display = 'block';
        this.canvas.style.margin = 'auto';
        this.canvas.style.backgroundImage = 'url(./images/game_background.avif)';

        $container.append(this.canvas);

        this.context = this.canvas.getContext('2d');
        this.cat = new Cat(this.context, 380, 450, 15);

        this.balls = [];
        this.score = 0;

        this.startSound = new GameSound('./sounds/start.wav');
        this.catchedSound = new GameSound('./sounds/catched.wav');
        this.touchedSound = new GameSound('./sounds/touched.wav');
        this.endSound = new GameSound('./sounds/end.wav');
    }

    createBalls() {
        if (this.balls.length >= 8) return;

        let x = Math.random() * this.canvas.width;
        if (x < 0) x = 0;

        let y = this.canvas.height - 20;
        let speed = CANVAS_HEIGHT / (6000 / TIME_INTERVAL);

        let ball = new Ball(x, y, speed);
        this.balls.push(ball);
    }

    update() {
        this.timer -= TIME_INTERVAL;
        if (this.timer <= 0) {
            this.timeover();
            this.onTimeover();
        }

        this.balls.forEach(ball => {
            switch(this.cat.collisionDetect(ball)) {
                case -1:
                    ball.visiable = false;
                    this.score -= 1;
                    this.touchedSound.play();
                    break;
                case 1:
                    ball.visiable = false;
                    this.score += 1;
                    this.catchedSound.play();
                    break;
            }
        });

        this.balls = this.balls.filter(item => !item.isOutOfBound() && item.visiable);

        this.balls.forEach(item => item.update());
    }

    draw() {
        let message = "Score: " + this.score + '    Timer: ' + this.getTimer();

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = "48px serif";
        this.context.fillStyle = 'black';
        this.context.fillText(message, 10, 50);
        this.cat.draw();
        this.balls.forEach(item => item.draw(this.context));
    }

    welcom() {
        this.context.font = "80px serif";
        this.context.fillStyle = 'red';
        this.context.fillText("Catch a Bugs", this.canvas.width/2-200, this.canvas.height/2-100);
    }

    timeover() {
        this.context.font = "80px serif";
        this.context.fillStyle = 'red';
        this.context.fillText("Time Over", this.canvas.width/2-200, this.canvas.height/2-100);
    }

    onKeydown(key) {
        let isKey = false;
        switch (key) {
            case 'ArrowLeft':
                this.cat.moveToLeft();
                isKey = true;
                break;
            case 'ArrowRight':
                isKey = true;
                this.cat.moveToRight();
                break;
            case ' ':
                isKey = true;
                this.cat.armTo = ARM_TO_DOWN;
                break;
        }

        if (isKey) this.update();

        return isKey;
    }

    onKeyup(key) {
        let isKey = false;
        switch (key) {
            case ' ':
                this.cat.armTo = ARM_TO_UP;
                isKey = true;
                break;
        }
        this.update();
        return isKey;
    }

    getTimer() {
        let m = parseInt(this.timer / (60 * 1000));
        let s = parseInt((this.timer % (60 * 1000)) / 1000);
        let ms = parseInt((this.timer % (60 * 1000)) % 1000);

        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;
        if (ms < 10) ms = '0' + ms;

        return m + ':' + s + ':' + ms;
    }

    start(time) {
        this.timer = time > 10 ? time : time * 60 * 1000;
        console.log('Start Game', this.timer);

        this.startSound.play();
        this.refreshInterval = setInterval(() => {
            this.update();
            this.draw();
        }, TIME_INTERVAL);

        this.createBalls();

        this.ballInterval = setInterval(()=>{
            this.createBalls();
        }, 3000);
    }

    stop() {
        clearInterval(this.refreshInterval);
        clearInterval(this.ballInterval);
    }

    resume() {
        this.start(this.timer);
    }

    restart(time) {
        this.balls = [];
        this.start(time);
        this.score = 0;
    }
}

$(document).ready(function () {

    let gameArea = new GameArea($('#gameArea'));
    gameArea.onTimeover = function() {
        gameArea.stop();
        gameArea.endSound.play();
        $('#btnPause').hide();
        $('#btnResume').hide();
        $('#btnRestart').show();
    }
    gameArea.welcom();

    // gameArea.start();
    $('#btnStart').on('click', ()=>{
        gameArea.start($('#selGameTime').val());
        $('#btnPause').show();
        $('#btnStart').hide();
    });

    $('#btnPause').on('click', ()=>{
        gameArea.stop();
        $('#btnPause').hide();
        $('#btnResume').show();
        $('#btnRestart').show();
    });

    $('#btnResume').on('click', ()=>{
        gameArea.resume();
        $('#btnPause').show();
        $('#btnResume').hide();
        $('#btnRestart').hide();
    });

    $('#btnRestart').on('click', ()=>{
        $('#btnPause').show();
        $('#btnResume').hide();
        $('#btnRestart').hide();
        gameArea.stop();
        gameArea.restart($('#selGameTime').val());
    });

    $(window).on('keydown', e => {
        if (gameArea.onKeydown(e.key)) {
            e.preventDefault();
        }
    });
    $(window).on('keyup', e => {
        if (gameArea.onKeyup(e.key)) {
            e.preventDefault();
        }
    });
});