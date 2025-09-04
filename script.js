
let leaderboard = [];
let selectedRoute = [];

function updateLeaderboard() {
    leaderboard.sort((a, b) => b.score - a.score);
    if (leaderboard.length > 10) leaderboard = leaderboard.slice(0, 10);
    let lb = document.getElementById('leaderboard');
    lb.innerHTML = leaderboard.map(entry => `<li>${entry.name} - ${entry.phone} Score: ${entry.score}</li>`).join('');
}

window.onload = function() {
    document.getElementById('start-game').onclick = function() {
        let name = document.getElementById('player-name').value;
        let phone = document.getElementById('player-phone').value;
        if (name && phone) {
            document.getElementById('start-screen').style.display = 'none';
            document.getElementById('game-screen').style.display = 'block';
        }
    };
    
    document.querySelectorAll('.customer').forEach(item => {
        item.onclick = function() {
            // Add customer to route if not already added
            if (!selectedRoute.includes(item.id)) {
                selectedRoute.push(item.id);
                // Draw line logic here if needed.
                item.style.backgroundColor = 'yellow';
            }
            // End game if 18th is selected
            if (selectedRoute.length === 18) {
                // Calculate simple score for demo
                let score = selectedRoute.length * 10; 
                document.getElementById('score').innerText = score;
                // Add to leaderboard with dummy phone ending and score
                let name = document.getElementById('player-name').value;
                let phone = document.getElementById('player-phone').value.slice(-4);
                leaderboard.push({name: name, phone: phone, score: score});
                updateLeaderboard();
                alert('Game over! Your score: ' + score);
            }
        };
    });

    document.getElementById('reset-btn').onclick = function() {
         selectedRoute = [];
         document.getElementById('score').innerText = '0';
         document.getElementById('game-screen').style.display = 'none';
         document.getElementById('start-screen').style.display = 'block';
         document.querySelectorAll('.customer').forEach(item => item.style.backgroundColor = '');
    };
};
