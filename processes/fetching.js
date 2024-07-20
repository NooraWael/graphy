import {createAuditChart, renderSkillsRadarChart,renderTechSkillsRadarChart,createSvgChart,createSvgLineGraph} from "../charts/charts.js";
import { queryGetUserInfo, querySkills,techSkill,getLevel } from "./query.js";
import {calcTotal,calcPiscine,calcExercise,calcEverything,calculateTotalAmount,calculateRatio} from "./mathing.js";
import {getXPProject} from "./xps.js";

export async function fetchSkillsData(token) {
    try {
      const skillsResponse = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: querySkills })
      });
  
      if (!skillsResponse.ok) {
        throw new Error(`HTTP error! Status: ${skillsResponse.status}`);
      }
  
      const skillsData = await skillsResponse.json();
  
      const transactions = skillsData.data.user[0].transactions;
      const skills = transactions.map(transaction => ({
        name: transaction.type.replace('skill_', ''),
        amount: transaction.amount
      }));
  
      renderSkillsRadarChart(skills);
  
    } catch (error) {
      console.error('Error fetching skills data:', error);
      document.getElementById('profile-info').textContent = 'Error fetching skills data: ' + error.message;
    }
  }
  

  export async function fetchtechSkillsData(token) {
    try {
      const skillsResponse = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: techSkill })
      });
  
      if (!skillsResponse.ok) {
        throw new Error(`HTTP error! Status: ${skillsResponse.status}`);
      }
  
      const skillsData = await skillsResponse.json();
      console.log(skillsData);
  
      const transactions = skillsData.data.user[0].transactions;
      const skills = transactions.map(transaction => ({
        name: transaction.type.replace('skill_', ''),
        amount: transaction.amount
      }));
  
      console.log(skills)
      renderTechSkillsRadarChart(skills);
  
    } catch (error) {
      console.error('Error fetching skills data:', error);
      document.getElementById('profile-info').textContent = 'Error fetching skills data: ' + error.message;
    }
  }
  

// Fetching data function
export async function fetchTotalXp(token, username) {
    const qstring = `{
    user(where: {login: {_eq: "${username}"}}) {
      transactions(
        where: {_and: [{object: {type: {_eq: "project"}}}, {user: {login: {_eq: "${username}"}}}, {type: {_eq: "xp"}}]}
        order_by: {amount: desc}
      ) {
        amount
        object {
          name
        }
      }
    }
  }`;



  const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: qstring })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  createSvgChart( data.data.user[0].transactions);
  calcTotal(data.data.user[0].transactions);
  totalPiscine(username,token);
  totalExercise(username,token);
}


async function totalPiscine(username,token){
  const qstring = `{
    user(where: {login: {_eq: "${username}"}}) {
      transactions(
        where: {_and: [{object: {type: {_eq: "piscine"}}}, {user: {login: {_eq: "${username}"}}}, {type: {_eq: "xp"}}]}
        order_by: {amount: desc}
      ) {
        amount
        object {
          name
        }
      }
    }
  }`;



  const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: qstring })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
calcPiscine(data.data.user[0].transactions)
}


async function totalExercise(username,token){
  const qstring = `{
    user(where: {login: {_eq: "${username}"}}) {
      transactions(
        where: {_and: [{object: {type: {_eq: "exercise"}}}, {user: {login: {_eq: "${username}"}}}, {type: {_eq: "xp"}}]}
        order_by: {amount: desc}
      ) {
        amount
        object {
          name
        }
      }
    }
  }`;



  const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: qstring })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
calcExercise(data.data.user[0].transactions)
}

export async function fetchLevel(token){
  const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: getLevel })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const amount = data.data.transaction[0].amount;
  document.getElementById('level-number').innerHTML = amount

  calcEverything(amount)
}


export async function fetchTotalXpTime(token, username) {
  const qstring = `{
    progress(
      where: {
        user: { login: { _eq: "${username}" } }
        isDone: { _eq: true }
        object: { type: { _eq: "project" } }
      }
      order_by: { createdAt: asc }  # Ensure results are ordered by date
  
    ) {
      grade
      createdAt
      object {
        id
        name
      }
    }
  }`;


  const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: qstring })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data)
  processDataForLineGraph(data.data.progress);
  
}


function processDataForLineGraph(progressData) {
  const dataByDate = {};

  progressData.forEach((entry) => {
    if (entry.grade > 1) {
      const date = new Date(entry.createdAt).toISOString().split('T')[0];  // Format date as YYYY-MM-DD
      const xp = getXPProject(entry.object.name);  // Get the XP for the project

      if (!dataByDate[date]) {
        dataByDate[date] = { xp: 0, projects: [] };
      }
      dataByDate[date].xp += xp;  // Add the XP to the date
      dataByDate[date].projects.push(entry.object.name);
    }
  });

  const dates = Object.keys(dataByDate);
  const xpValues = dates.map(date => (dataByDate[date].xp / 1000).toFixed(2));  // Convert to KB if necessary
  const projects = dates.map(date => dataByDate[date].projects.join(", "));  // Combine project names for the same date

createSvgLineGraph(dates,xpValues,projects);
}



export async function fetchAuditsReceived(token, username) {
  const query = `{
    user(where: {login: {_eq: "${username}"}}) {
      transactions(
        where: {
          user: {login: {_eq: "${username}"}},
          type: {_eq: "down"},
          object: {type: {_eq: "project"}}
        },
        order_by: {createdAt: asc}
      ) {
        amount
        createdAt
      }
    }
  }`;

  const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.user[0].transactions;
}

export async function fetchAuditsMade(token, username) {
  const query = `{
    user(where: {login: {_eq: "${username}"}}) {
      transactions(
        where: {
          user: {login: {_eq: "${username}"}},
          type: {_eq: "up"},
          object: {type: {_eq: "project"}}
        },
        order_by: {createdAt: asc}
      ) {
        amount
        createdAt
      }
    }
  }`;

  const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.user[0].transactions;
}


export async function displayAuditRatio(token, username) {
  try {
    const auditsReceived = await fetchAuditsReceived(token, username);
    const auditsMade = await fetchAuditsMade(token, username);

    const totalReceived = calculateTotalAmount(auditsReceived);
    const totalMade = calculateTotalAmount(auditsMade);

    const ratio = calculateRatio(totalMade, totalReceived);

    document.getElementById('audit-made-value-right').textContent = `${(totalMade / 1000).toFixed(2)} KB`;
    document.getElementById('audit-received-value-right').textContent = `${(totalReceived / 1000).toFixed(2)} KB`;
    document.getElementById('audit-ratio').textContent = ratio;
    document.getElementById('audit-message').textContent = ratio < 1 ? 'Make more audits!' : 'Good job!';

    // Adjust bar widths based on total amounts
    document.getElementById('audit-made-bar').style.width = `${(totalMade / (totalMade + totalReceived)) * 100}%`;
    document.getElementById('audit-received-bar').style.width = `${(totalReceived / (totalMade + totalReceived)) * 100}%`;
  } catch (error) {
    console.error('Error fetching audit data:', error);
  }
}
