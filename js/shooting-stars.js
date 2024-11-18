class ShootingStar {
    constructor() {
        this.reset();
        this.active = false;
    }

    reset() {
        const startFromLeft = Math.random() > 0.5;
        this.x = startFromLeft ? 0 : width;
        this.y = Math.random() * height * 0.5;
        this.length = 80 + Math.random() * 40;
        this.speed = 20 + Math.random() * 10;
        this.angle = startFromLeft ? 
            (Math.PI / 6) + (Math.random() * Math.PI / 8) :
            (Math.PI * 5/6) - (Math.random() * Math.PI / 8);
        this.opacity = 0;
        this.active = true;
    }

    update() {
        if (!this.active) return;

        if (this.opacity < 1) this.opacity += 0.1;
        
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < -this.length || this.x > width + this.length ||
            this.y < -this.length || this.y > height + this.length) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;

        const gradient = ctx.createLinearGradient(
            this.x, this.y,
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();
    }
}