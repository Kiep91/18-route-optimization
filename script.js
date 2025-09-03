window.onload = function() {
  const mapArea = document.getElementById('map-area');
  
  // Create 18 customer elements randomly placed
  for(let i=0; i<18; i++){
    let customer = document.createElement('div');
    customer.className = 'customer draggable';
    customer.innerText = '📍';
    customer.style.left = (Math.random()* (mapArea.offsetWidth - 20)) + 'px';
    customer.style.top = (Math.random()* (mapArea.offsetHeight - 20)) + 'px';
    mapArea.appendChild(customer);
  }
  
  // Drag and Drop functionality
  let dragged = null;
  document.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('draggable')){
      dragged = e.target;
    }
  });
  document.addEventListener('mousemove', function(e){
    if(dragged){
      dragged.style.left = (e.pageX - mapArea.offsetLeft - 10) + 'px';
      dragged.style.top = (e.pageY - mapArea.offsetTop - 10) + 'px';
    }
  });
  document.addEventListener('mouseup', function(){
    dragged = null;
  });
  
  // Optimize and animate route drawing
  document.getElementById("optimize-btn").onclick = function() {
    const customers = document.querySelectorAll('.customer');
    const canvas = document.getElementById('routeCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = mapArea.offsetWidth;
    canvas.height = mapArea.offsetHeight;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    let points = [];
    customers.forEach(function(el) {
      points.push({
        x: parseFloat(el.style.left) + 10,
        y: parseFloat(el.style.top) + 10
      });
    });
    
    // sort by distance to starting point
    const vehicle = document.getElementById("vehicle");
    let current = { x: parseFloat(vehicle.style.left || 0) + 10, y: parseFloat(vehicle.style.top || 0) + 10};
    points.sort(function(a, b) {
      let dA = Math.hypot(a.x - current.x, a.y - current.y);
      let dB = Math.hypot(b.x - current.x, b.y - current.y);
      return dA - dB;
    });
    
    // prepare route animation
    let routePoints = [ {x: parseFloat(vehicle.style.left || 0) + 10, y: parseFloat(vehicle.style.top || 0) + 10} ];
    routePoints.push(...points);
    
    // animate drawing lines
    let totalDistance = 0;
    let idx = 1;
    ctx.beginPath();
    ctx.moveTo(routePoints[0].x, routePoints[0].y);
    function drawNextLine() {
      if (idx < routePoints.length) {
        ctx.lineTo(routePoints[idx].x, routePoints[idx].y);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        totalDistance += Math.hypot(routePoints[idx].x - routePoints[idx-1].x,
                                  routePoints[idx].y - routePoints[idx-1].y);
        idx++;
        setTimeout(drawNextLine, 300);
      } else {
        document.getElementById("score").innerText = totalDistance.toFixed(2);
      }
    }
    drawNextLine();
  };
};