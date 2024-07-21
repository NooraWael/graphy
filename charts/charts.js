export function createAuditChart(validAudits, failedAudits) {
  var number = document.getElementById('audit-number');
  let total  = validAudits + failedAudits
  number.innerHTML = "Total Audits: " + total
    var ctx = document.getElementById('myPieChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Valid Audits', 'Failed Audits'],
            datasets: [{
                label: 'Audit Results',
                data: [validAudits, failedAudits],
                backgroundColor: [
                    '#a16eff',  // purple
                    '#f95f9c'   // pink
                ],
                borderColor: [
                    '#ffffff',  // white border
                    '#ffffff'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },
            },
            cutout: '50%'  // This makes it a donut chart by cutting out the center
        }
    });
}


export function renderSkillsRadarChart(skills) {
    const labels = skills.map(skill => skill.name);
    const data = skills.map(skill => skill.amount);
  
    var ctx = document.getElementById('skillsRadarChart').getContext('2d');
    var skillsRadarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Skills Completion Rate',
          data: data,
          backgroundColor: 'rgba(161, 110, 255, 0.2)', // Light purple
          borderColor: 'white', // Purple
          borderWidth: 1,
          pointBackgroundColor: 'rgba(161, 110, 255, 1)', // Purple for points
          pointBorderColor: '#fff', // White border for points
          pointHoverBackgroundColor: '#fff', // White hover color for points
          pointHoverBorderColor: 'rgba(161, 110, 255, 1)' // Purple border on hover
        }]
      },
      options: {
        elements: {
            line: {
              borderWidth: 4
            }
          },
        responsive: true,
        scale: {
          ticks: {
            beginAtZero: true,
            max: 100, // Assuming the completion rate is a percentage
            stepSize: 20, // Adjust as necessary
            display: false // Hide the numbers
          },
          pointLabels: {
            fontSize: 30, // Larger font size for better readability
            fontColor: '#e0e0e0', // White color for the labels
            fontStyle: 'bold' // Make the labels bold
          }
        },
        legend: {
          labels: {
            fontColor: '#e0e0e0' // White color for the legend
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var value = dataset.data[tooltipItem.index];
              var label = data.labels[tooltipItem.index];
              return label + ': ' + value;
            }
          }
        }
      }
    });
  }
  

  export function renderTechSkillsRadarChart(skills) {
    const labels = skills.map(skill => skill.name);
    const data = skills.map(skill => skill.amount);
  
    var ctx = document.getElementById('techskillsRadarChart').getContext('2d');
    var skillsRadarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Skills Completion Rate',
          data: data,
          backgroundColor: 'rgba(161, 110, 255, 0.2)', // Light purple
          borderColor: 'white', // Purple
          borderWidth: 1,
          pointBackgroundColor: 'rgba(161, 110, 255, 1)', // Purple for points
          pointBorderColor: '#fff', // White border for points
          pointHoverBackgroundColor: '#fff', // White hover color for points
          pointHoverBorderColor: 'rgba(161, 110, 255, 1)' // Purple border on hover
        }]
      },
      options: {
        elements: {
            line: {
              borderWidth: 4
            }
          },
        responsive: true,
        scale: {
          ticks: {
            beginAtZero: true,
            max: 100, // Assuming the completion rate is a percentage
            stepSize: 20, // Adjust as necessary
            display: false // Hide the numbers
          },
          pointLabels: {
            fontSize: 30, // Larger font size for better readability
            fontColor: '#e0e0e0', // White color for the labels
            fontStyle: 'bold' // Make the labels bold
          }
        },
        legend: {
          labels: {
            fontColor: '#e0e0e0' // White color for the legend
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var value = dataset.data[tooltipItem.index];
              var label = data.labels[tooltipItem.index];
              return label + ': ' + value;
            }
          }
        }
      }
    });
  }


  export function createSvgChart(transactions) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", 700); // Increase width for better layout
    svg.setAttribute("height", 300);
  
    // Limit to the first 6 projects
    const limitedTransactions = transactions.slice(0, 7);
    const maxAmount = Math.max(...limitedTransactions.map(t => t.amount));
    const barWidth = 40;
    const barGap = 20;
    const chartHeight = 200;
    const margin = 70; // Increase margin for y-axis labels
  
    limitedTransactions.forEach((transaction, index) => {
      const barHeight = (transaction.amount / maxAmount) * chartHeight;
  
      // Convert amount from bytes to KB
      const amountKB = (transaction.amount / 1000).toFixed(2);
  
      // Create bar
      const rect = document.createElementNS(svgNamespace, "rect");
      rect.setAttribute("x", margin + index * (barWidth + barGap));
      rect.setAttribute("y", chartHeight - barHeight + margin);
      rect.setAttribute("width", barWidth);
      rect.setAttribute("height", barHeight);
      rect.setAttribute("fill", "#a16eff");
      
      // Create hover effect
      rect.addEventListener('mouseover', function() {
        const tooltip = document.createElementNS(svgNamespace, "text");
        tooltip.setAttribute("id", "tooltip");
        tooltip.setAttribute("x", margin + index * (barWidth + barGap) + barWidth / 2);
        tooltip.setAttribute("y", chartHeight - barHeight + margin - 20);
        tooltip.setAttribute("fill", "#ffffff");
        tooltip.setAttribute("text-anchor", "middle");
        tooltip.setAttribute("font-size", "14px");
        tooltip.textContent = `${amountKB} KB - ${transaction.object.name}`;
        svg.appendChild(tooltip);
      });
  
      rect.addEventListener('mouseout', function() {
        const tooltip = document.getElementById("tooltip");
        if (tooltip) {
          svg.removeChild(tooltip);
        }
      });
  
      svg.appendChild(rect);
    });
  
    // Create y-axis labels
    for (let i = 0; i <= maxAmount; i += maxAmount / 5) {
      const y = chartHeight - (i / maxAmount) * chartHeight + margin;
      const text = document.createElementNS(svgNamespace, "text");
      text.setAttribute("x", margin - 10); // Adjust position for better visibility
      text.setAttribute("y", y + 5); // Adjust position for better visibility
      text.setAttribute("fill", "#ffffff");
      text.setAttribute("text-anchor", "end");
      text.setAttribute("font-size", "12px");
      text.textContent = (i / 1000).toFixed(0) + ' KB';
      svg.appendChild(text);
  
      const line = document.createElementNS(svgNamespace, "line");
      line.setAttribute("x1", margin);
      line.setAttribute("x2", 600 - margin);
      line.setAttribute("y1", y);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "#ffffff");
      line.setAttribute("stroke-width", "0.5");
      svg.appendChild(line);
    }
  
    document.getElementById("svg-chart").appendChild(svg);
  
  
  
  }


export function createSvgLineGraph(dates, xpValues, projects) {
  const svgNamespace = "http://www.w3.org/2000/svg";
  const svg = document.getElementById('xp-line-chart');
  svg.innerHTML = '';  // Clear existing content

  const width = svg.getAttribute('width');
  const height = svg.getAttribute('height');
  const padding = 40;

  const maxXP = Math.max(...xpValues);
  const xScale = (width - 2 * padding) / (dates.length - 1);
  const yScale = (height - 2 * padding) / maxXP;

  // Draw axes
  const xAxis = document.createElementNS(svgNamespace, "line");
  xAxis.setAttribute('x1', padding);
  xAxis.setAttribute('y1', height - padding);
  xAxis.setAttribute('x2', width - padding);
  xAxis.setAttribute('y2', height - padding);
  xAxis.setAttribute('stroke', '#ffffff');
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS(svgNamespace, "line");
  yAxis.setAttribute('x1', padding);
  yAxis.setAttribute('y1', height - padding);
  yAxis.setAttribute('x2', padding);
  yAxis.setAttribute('y2', padding);
  yAxis.setAttribute('stroke', '#ffffff');
  svg.appendChild(yAxis);

  // Draw x-axis labels
  for (let i = 0; i < dates.length; i++) {
    if (i % Math.ceil(dates.length / 10) === 0 || i === dates.length - 1) {  // Show labels at regular intervals
      const x = padding + i * xScale;
      const text = document.createElementNS(svgNamespace, "text");
      text.setAttribute('x', x);
      text.setAttribute('y', height - padding + 20);
      text.setAttribute('fill', '#ffffff');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '10px');
      text.textContent = dates[i];
      svg.appendChild(text);
    }
  }

  // Draw line
  const linePath = document.createElementNS(svgNamespace, "path");
  let pathData = `M ${padding} ${height - padding - xpValues[0] * yScale}`;
  for (let i = 1; i < dates.length; i++) {
    const x = padding + i * xScale;
    const y = height - padding - xpValues[i] * yScale;
    pathData += ` L ${x} ${y}`;
  }
  linePath.setAttribute('d', pathData);
  linePath.setAttribute('fill', 'none');
  linePath.setAttribute('stroke', '#a16eff');
  linePath.setAttribute('stroke-width', '2');
  svg.appendChild(linePath);

  // Draw points
  for (let i = 0; i < dates.length; i++) {
    const x = padding + i * xScale;
    const y = height - padding - xpValues[i] * yScale;

    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 4);
    circle.setAttribute('fill', '#a16eff');
    svg.appendChild(circle);

    // Add hover effect
   // Add hover effect
circle.addEventListener('mouseover', function() {
  const tooltip = document.createElementNS(svgNamespace, "text");
  tooltip.setAttribute('id', 'tooltip');
  
  // Adjust x position if the tooltip is near the right edge
  let tooltipX = x;
  if (x > width - padding - 50) {
    tooltipX = x - 100;  // Adjust to move left if near the right edge
  }
  
  tooltip.setAttribute('x', tooltipX);
  tooltip.setAttribute('y', y - 20);
  tooltip.setAttribute('fill', '#ffffff');
  tooltip.setAttribute('text-anchor', 'middle');
  tooltip.setAttribute('font-size', '12px');
  tooltip.textContent = `${xpValues[i]} KB - ${projects[i]}`;
  svg.appendChild(tooltip);
});

circle.addEventListener('mouseout', function() {
  const tooltip = document.getElementById('tooltip');
  if (tooltip) {
    svg.removeChild(tooltip);
  }
});

  }
}