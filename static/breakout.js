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

    // Block variables
    const blockRowCount = 5;
    const blockColumnCount = 6;
    const blockWidth = 75;
    const blockHeight = 20;
    const blockPadding = 10;
    const blockOffsetTop = 30;
    const blockOffsetLeft = 30;
    let blocks = [];

    // Initialize blocks
    for (let c = 0; c < blockColumnCount; c++) {
        blocks[c] = [];
        for (let r = 0; r < blockRowCount; r++) {
            blocks[c][r] = { x: 0, y: 0, visible: true };
        }
    }

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

        // Draw the blocks
        for (let c = 0; c < blockColumnCount; c++) {
            for (let r = 0; r < blockRowCount; r++) {
                if (blocks[c][r].visible) {
                    let blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft;
                    let blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop;
                    blocks[c][r].x = blockX;
                    blocks[c][r].y = blockY;

                    // Set block color based on row and column
                    let blockColor;
                    if ((c + r) % 3 === 0) {
                        blockColor = '#FF0000'; // Red
                    } else if ((c + r) % 3 === 1) {
                        blockColor = '#0000FF'; // Blue
                    } else {
                        blockColor = '#00FF00'; // Green
                    }

                    ctx.beginPath();
                    ctx.rect(blockX, blockY, blockWidth, blockHeight);
                    ctx.fillStyle = blockColor;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }

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

        // Collision detection with the blocks
        for (let c = 0; c < blockColumnCount; c++) {
            for (let r = 0; r < blockRowCount; r++) {
                let block = blocks[c][r];
                if (block.visible) {
                    if (
                        ballX > block.x &&
                        ballX < block.x + blockWidth &&
                        ballY - ballRadius < block.y + blockHeight &&
                        ballY + ballRadius > block.y
                    ) {
                        dy = -dy; // Reverse ball direction
                        block.visible = false; // Hide the block
                    }
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw(); // Start the game loop
});
