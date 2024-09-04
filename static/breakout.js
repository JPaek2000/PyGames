document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('breakoutCanvas');
    const ctx = canvas.getContext('2d');

    // Game variables
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 30;
    let ballRadius = 10;
    let dx = 2;
    let dy = -2;

    // Paddle variables
    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;

    // Event listeners for paddle movement
    document.addEventListener('keydown', (e) => {
        if (e.key === 'a' && paddleX > 0) { // Move left with 'A'
            paddleX -= 7;
        } else if (e.key === 'd' && paddleX < canvas.width - paddleWidth) { // Move right with 'D'
            paddleX += 7;
        }
    });

    // Main game loop
    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the ball
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();

        // Draw the paddle
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();

        // Update ball position
        ballX += dx;
        ballY += dy;

        // Ball collision detection
        if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
            dx = -dx;
        }
        if (ballY + dy < ballRadius) {
            dy = -dy;
        } else if (ballY + dy > canvas.height - ballRadius) {
            // Check if the ball hits the paddle
            if (ballX > paddleX && ballX < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                // Game over
                document.location.reload();
            }
        }

        requestAnimationFrame(draw);
    }

    draw(); // Start the game loop
});