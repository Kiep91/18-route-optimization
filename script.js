document.getElementById("optimize-btn").onclick = function() {
  const customers = document.querySelectorAll('.customer');
  let points = [];
  customers.forEach(function(el) {
    const rect = el.getBoundingClientRect();
    points.push({x: rect.left + rect.width/2, y: rect.top + rect.height/2});
  });

  const vehicleRect = document.getElementById("vehicle").getBoundingClientRect();
  let current = { x: vehicleRect.left + vehicleRect.width/2, y: vehicleRect.top + vehicleRect.height/2 };

  points.sort(function(a, b) {
    let dA = Math.hypot(a.x - current.x, a.y - current.y);
    let dB = Math.hypot(b.x - current.x, b.y - current.y);
    return dA - dB;
  });

  let totalDistance = 0;
  for(let i = 0; i < points.length; i++) {
    if(i === 0) {
      totalDistance += Math.hypot(points[i].x - current.x, points[i].y - current.y);
    } else {
      totalDistance += Math.hypot(points[i].x - points[i-1].x, points[i].y - points[i-1].y);
    }
  }

  document.getElementById("score").innerText = totalDistance.toFixed(2);
};
