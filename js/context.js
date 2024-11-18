let canvas, ctx, width, height;

function initCanvas() {
    canvas = document.getElementById('stars');
    ctx = canvas.getContext('2d');
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}