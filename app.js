// app.js

// Function to switch between screens
function switchScreens(currentScreen, nextScreen) {
  currentScreen.style.opacity = 0;
  setTimeout(() => {
    currentScreen.style.display = 'none';
    nextScreen.style.display = 'block';
    setTimeout(() => {
      nextScreen.style.opacity = 1;
    }, 50);
  }, 500);
}

// Handle customization form submission
document.getElementById('customizationForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  // Collect customization values
  const goal = document.getElementById('goal').value;
  const strengths = document.getElementById('strengths').value;
  const weaknesses = document.getElementById('weaknesses').value;

  // Store the values in local storage (or a global variable for now)
  localStorage.setItem('goal', goal);
  localStorage.setItem('strengths', strengths);
  localStorage.setItem('weaknesses', weaknesses);

  // Switch to the decision screen
  const currentScreen = document.getElementById('customizationScreen');
  const nextScreen = document.getElementById('decisionScreen');
  switchScreens(currentScreen, nextScreen);
});

// Handle decision input and generate advice
document.getElementById('decisionSubmit').addEventListener('click', function () {
  const decision = document.getElementById('decision').value;
  
  if (!decision) {
    alert("Please enter a decision to proceed.");
    return;
  }
  
  // For now, generate simple advice based on stored customization data
  const goal = localStorage.getItem('goal');
  const strengths = localStorage.getItem('strengths');
  const weaknesses = localStorage.getItem('weaknesses');

  let advice = `Based on your goal of "${goal}", and your strengths in "${strengths}", you should consider focusing on overcoming your weaknesses like "${weaknesses}" to make an informed decision.`;

  // Set the advice on the advice screen
  document.getElementById('insight').innerHTML = `<p>${advice}</p>`;

  // Switch to the advice screen
  const currentScreen = document.getElementById('decisionScreen');
  const nextScreen = document.getElementById('adviceScreen');
  switchScreens(currentScreen, nextScreen);
});

// Go back to the decision screen
document.getElementById('backButton').addEventListener('click', function () {
  const currentScreen = document.getElementById('adviceScreen');
  const nextScreen = document.getElementById('decisionScreen');
  switchScreens(currentScreen, nextScreen);
});
