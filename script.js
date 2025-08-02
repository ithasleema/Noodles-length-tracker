const noodleDatabase = {
  "Maggi": 50,
  "Yippee": 60,
  "Top Ramen": 45,
  "Knorr": 40,
  "Samyang": 80,
  "Indomie": 66,
  "Buldak": 55,
  "Shin Ramyeon": 70
};

const form = document.getElementById('noodleForm');
const brandSelect = document.getElementById('brandSelect');
const brandOutput = document.getElementById('brandOutput');
const lengthOutput = document.getElementById('lengthOutput');
const chartCanvas = document.getElementById('chartCanvas');

// 🌓 Auto dark mode based on hour
const hour = new Date().getHours();
if (hour >= 18 || hour <= 6) {
  document.body.classList.add('dark');
}

// 📈 Chart.js - build comparison chart
const chart = new Chart(chartCanvas, {
  type: 'bar',
  data: {
    labels: Object.keys(noodleDatabase),
    datasets: [{
      label: 'Noodle Length (cm)',
      data: Object.values(noodleDatabase),
      backgroundColor: '#6c63ff',
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// 🔁 Load saved brand from localStorage
const savedBrand = localStorage.getItem('selectedBrand');
if (savedBrand) {
  brandSelect.value = savedBrand;
  displayLength(savedBrand);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const brand = brandSelect.value;

  if (brand && noodleDatabase[brand]) {
    localStorage.setItem('selectedBrand', brand);
    displayLength(brand);
  }
});

function displayLength(brand) {
  const length = noodleDatabase[brand];
  brandOutput.textContent = `Brand: ${brand}`;
  lengthOutput.textContent = `Noodle Length: ${length} cm`;
}
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const brand = brandSelect.value;

  if (brand && noodleDatabase[brand]) {
    localStorage.setItem('selectedBrand', brand);
    displayLength(brand);
  }

  const file = imageUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';

      // Simulated noodle length detection
      const baseLength = noodleDatabase[brand] || 30;
      const variation = Math.floor(Math.random() * 6) - 3; // -3 to +2
      lengthOutput.textContent = `Estimated Length from Image: ${baseLength + variation} cm (approx)`;
    };
    reader.readAsDataURL(file);
  }
});
