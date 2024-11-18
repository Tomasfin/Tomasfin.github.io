// Star class implementation
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseSize = 1 + Math.random() * 0.5;
        this.size = this.baseSize;
        this.isTwinkling = false;
        this.twinkleStartTime = 0;
        this.twinkleDuration = 3000;
        this.maxGlow = 1.8;
        this.glowProgress = 0;
        this.growing = true;
    }

    draw() {
        if (this.isTwinkling) {
            const elapsed = Date.now() - this.twinkleStartTime;
            const progress = elapsed / this.twinkleDuration;

            if (this.growing) {
                this.glowProgress = Math.min(1, progress * 2);
                if (this.glowProgress >= 1) this.growing = false;
            } else {
                this.glowProgress = Math.max(0, 1 - (progress - 0.5) * 2);
            }

            const eased = this.glowProgress < 0.5
                ? 2 * this.glowProgress * this.glowProgress
                : 1 - Math.pow(-2 * this.glowProgress + 2, 2) / 2;
            
            const currentGlow = 1 + (this.maxGlow - 1) * eased;
            this.size = this.baseSize * currentGlow;

            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 1.5
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${eased * 0.8})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${eased * 0.2})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            ctx.fill();

            if (progress >= 1) {
                this.isTwinkling = false;
                this.size = this.baseSize;
                this.growing = true;
                this.glowProgress = 0;
            }
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.isTwinkling 
            ? `rgba(255, 255, 255, ${0.8 + (this.glowProgress * 0.2)})` 
            : 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    }

    startTwinkle() {
        if (!this.isTwinkling) {
            this.isTwinkling = true;
            this.twinkleStartTime = Date.now();
            this.growing = true;
            this.glowProgress = 0;
        }
    }
}