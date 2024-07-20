let totalProjects = 0
let totalPiscine = 0
let totalExercise = 0

export function calcTotal(transactions) {
    let totalXP = 0;
  
    transactions.forEach((transaction) => {
      totalXP += transaction.amount;
    });
  
    // Convert the final total to KB
    let totalXPInKB = (totalXP / 1000).toFixed(2);
  
    totalProjects = totalXPInKB
    document.getElementById("total-xp-projects").textContent = `Projects: ${totalXPInKB} KB`;
  }
  
export function calcPiscine(transactions) {
    let totalXP = 0;
  
    transactions.forEach((transaction) => {
      totalXP += transaction.amount;
    });
  
    // Convert the final total to KB
    let totalXPInKB = (totalXP / 1000).toFixed(2);
  
    totalPiscine = totalXPInKB
    document.getElementById("total-xp-piscine").textContent = `Piscines: ${totalXPInKB} KB`;
  }
  

  export function calcExercise(transactions) {
    let totalXP = 0;
  
    transactions.forEach((transaction) => {
      totalXP += transaction.amount;
    });
  
    // Convert the final total to KB
    let totalXPInKB = (totalXP / 1000).toFixed(2);
   let totalEverything = (parseFloat(totalPiscine) + parseFloat(totalProjects));
    totalExercise = totalXPInKB;
    document.getElementById("total-xp-exercises").textContent = `Exercise: ${totalXPInKB} KB`;
    document.getElementById("total-xp").textContent = `${totalEverything} KB`;
  }
  

  export function calcEverything(number){
 
      let rank;
      let levelsRemaining;
    
      switch (true) {
        case (number >= 0 && number <= 9):
          rank = 'Aspiring';
          levelsRemaining = 10 - number;
          break;
        case (number >= 10 && number <= 19):
          rank = 'Beginner';
          levelsRemaining = 20 - number;
          break;
        case (number >= 20 && number <= 29):
          rank = 'Apprentice';
          levelsRemaining = 30 - number;
          break;
        case (number >= 30 && number <= 39):
          rank = 'Assistant';
          levelsRemaining = 40 - number;
          break;
        case (number >= 40 && number <= 49):
          rank = 'Beginner';
          levelsRemaining = 50 - number;
          break;
        case (number >= 50 && number <= 54):
          rank = 'Junior';
          levelsRemaining = 55 - number;
          break;
        case (number >= 55 && number <= 59):
          rank = 'Confirmed';
          levelsRemaining = 60 - number;
          break;
        case (number === 60):
          rank = 'Full Stack';
          levelsRemaining = 0;
          break;
        default:
          rank = 'Unknown';
          levelsRemaining = 'N/A';
      }
    
  document.getElementById('ranking').innerHTML = rank
  document.getElementById('rank-left').innerHTML = levelsRemaining;
    


  }

  export function calculateTotalAmount(transactions) {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }
  
  export function calculateRatio(auditsMade, auditsReceived) {
    if (auditsReceived === 0) {
      return 0;  // To handle division by zero
    }
    return (auditsMade / auditsReceived).toFixed(2);
  }
  