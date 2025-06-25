const ctx = document.getElementById('chart').getContext('2d');

new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Productive', 'Unproductive', 'Neutral'],
    datasets: [{
      data: [60, 30, 10], // Dummy values in minutes
      backgroundColor: ['#4CAF50', '#F44336', '#FFC107']
    }]
  },
  options: {
    responsive: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 12 }
        }
      }
    }
  }
});