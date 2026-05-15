// Common Chart Configuration
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { display: false }
        },
        y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { display: false }
        }
    },
    elements: {
        line: {
            tension: 0.4,
            borderWidth: 2,
            borderColor: '#22D3EE',
            fill: true,
            backgroundColor: (context) => {
                const chart = context.chart;
                const {ctx, chartArea} = chart;
                if (!chartArea) return null;
                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, 'rgba(34, 211, 238, 0)');
                gradient.addColorStop(1, 'rgba(34, 211, 238, 0.1)');
                return gradient;
            }
        },
        point: { radius: 0 }
    }
};

// Hero Chart
const ctxHero = document.getElementById('heroChart');
if (ctxHero) {
    new Chart(ctxHero, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => i),
            datasets: [{
                data: [45, 42, 48, 35, 30, 25, 22, 20, 18, 15, 12, 10, 8, 7, 6, 5, 5, 4, 4, 3]
            }]
        },
        options: chartDefaults
    });
}

// Dashboard Preview Chart
const ctxDash = document.getElementById('dashboardPreviewChart');
if (ctxDash) {
    new Chart(ctxDash, {
        type: 'line',
        data: {
            labels: Array.from({length: 50}, (_, i) => i),
            datasets: [{
                data: Array.from({length: 50}, () => Math.floor(Math.random() * 20) + 80),
                borderColor: '#0EA5E9'
            }]
        },
        options: {
            ...chartDefaults,
            scales: {
                x: { grid: { display: false }, ticks: { color: '#94A3B8' } },
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94A3B8' } }
            }
        }
    });
}
