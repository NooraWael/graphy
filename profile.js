import { queryGetUserInfo, querySkills,techSkill } from "./processes/query.js";
import {createAuditChart, renderSkillsRadarChart} from "./charts/charts.js";
import {fetchSkillsData,fetchtechSkillsData,fetchTotalXp,fetchLevel,fetchTotalXpTime,fetchAuditsReceived,fetchAuditsMade,displayAuditRatio} from "./processes/fetching.js";
import {calculateTotalAmount,calculateRatio} from "./processes/mathing.js";

document.addEventListener('DOMContentLoaded', () => {
  // Get the modal
  const modal = document.getElementById("ranks-modal");

  // Get the button that opens the modal
  const btn = document.getElementById("see-all-ranks");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  const logoutButton = document.getElementById("logout-button");

  // Function to handle logout
  function handleLogout() {
    // Remove username, password, and token from session storage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    sessionStorage.removeItem('token');
    // Redirect to login page or perform any other logout actions
    window.location.href = 'login.html'; // Change 'login.html' to your login page
  }

  // Add event listener to logout button
  logoutButton.addEventListener('click', handleLogout);
});

async function fetchProfileData() {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (!username || !password) {
      document.getElementById('profile-info').textContent = 'No credentials found. Please log in again.';
      return;
    }
    let token = await getToken(username, password);
    if (!token) {
      document.getElementById('profile-info').textContent = 'Login failed. Please check your credentials.';
      return;
    }
    console.log('Newly fetched token:', token);
    sessionStorage.setItem('token', token); // Store the new token for subsequent requests
  



  try {
    const response = await fetch('https://learn.reboot01.com/api/graphql-engine/v1/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: queryGetUserInfo })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);

    const user = responseData.data.user;
    console.log(user)
    document.getElementById('profile-info').innerHTML = `
      <h3>${user[0].attrs.firstName + " " + user[0].attrs.lastName} </h3>
      <p>${user[0].login}</p> 
      <p>Email: ${user[0].email}</p>
      <p>Campus : ${user[0].campus}</p>
    `;

   createAuditChart(user[0].validAudits.aggregate.count, user[0].failedAudits.aggregate.count);

   localStorage.setItem("username",user[0].login)

   
   await fetchSkillsData(token);
   await fetchtechSkillsData(token);
   await fetchTotalXp(token,username)
   await fetchLevel(token);
   await fetchTotalXpTime(token,username);
   await displayAuditRatio(token,username);

  } catch (error) {
    console.error('Error fetching profile data:', error);
    document.getElementById('profile-info').textContent = 'Error fetching profile data: ' + error.message;
  }

}

fetchProfileData();

async function getToken(username, password) {
  const credentials = btoa(`${username}:${password}`); // Base64 encode the credentials
  try {
    const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }

    const token = await response.json(); // Assume the response is directly the token
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}
