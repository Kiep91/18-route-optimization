document.addEventListener('DOMContentLoaded', function() {
    let selectedRoute = [];
    const customers = document.querySelectorAll('.customer');
    const vehicle = document.getElementById('vehicle');
    
    customers.forEach(customer => {
        customer.addEventListener('click', function() {
            // Add clicked customer to route if not already selected
            const id = customer.getAttribute('data-id');
            if (!selectedRoute.includes(id)) {
                selectedRoute.push(id);
                customer.style.border = '2px solid red'; // mark as selected
            }
            // Calculate distance and animate route
            let totalDistance = 0;
            for (let i = 0; i < selectedRoute.length; i++) {
                let current = document.querySelector(`.customer[data-id="${selectedRoute[i]}"]`);
                let rect = current.getBoundingClientRect();
                if (i > 0) {
                    let prev = document.querySelector(`.customer[data-id="${selectedRoute[i-1]}"]`);
                    let prevRect = prev.getBoundingClientRect();
                    totalDistance += Math.hypot(rect.left - prevRect.left, rect.top - prevRect.top);
                }
            }
            document.getElementById('score').innerText = totalDistance.toFixed(2);
            // Move vehicle to last selected customer location
            if(selectedRoute.length > 0) {
                let lastCustomer = document.querySelector(`.customer[data-id="${selectedRoute[selectedRoute.length-1]}"]`);
                vehicle.style.left = lastCustomer.style.left;
                vehicle.style.top = lastCustomer.style.top;
            }
        });
    });
});
