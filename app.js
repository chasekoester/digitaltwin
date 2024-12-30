const API_KEY = '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';  // Replace with your actual OpenAI API key

// Function to get advice from OpenAI API
async function getAIAdvice(userDecision, userGoals) {
    const url = 'https://api.openai.com/v1/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    };

    const data = {
        model: 'gpt-4', // Or 'gpt-3.5-turbo' for GPT-3
        prompt: `You are a wise advisor. A person with the following goals: "${userGoals}" is considering this decision: "${userDecision}". What advice would you give to help them make the best choice?`,
        max_tokens: 150,
        temperature: 0.7,  // Adjust this for more creativity or accuracy
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        const result = await response.json();
        const advice = result.choices[0].text.trim();  // Extract advice from the response

        // Display the advice in the UI
        document.getElementById('ai-advice').innerText = advice;
        document.getElementById('decision-screen').style.display = 'none';  // Hide the decision screen
        document.getElementById('advice-screen').style.display = 'block';  // Show the advice screen
    } catch (error) {
        console.error("Error fetching AI advice:", error);
    }
}

// Function to handle the goal submission
document.getElementById('submit-goals').addEventListener('click', () => {
    const userGoals = document.getElementById('user-goals').value;

    if (userGoals.trim() === '') {
        alert("Please enter your goals.");
        return;
    }

    // Store user goals and move to the decision screen
    sessionStorage.setItem('userGoals', userGoals);
    document.getElementById('goal-screen').style.display = 'none';  // Hide the goal screen
    document.getElementById('decision-screen').style.display = 'block';  // Show the decision screen
});

// Function to handle the decision submission
document.getElementById('submit-decision').addEventListener('click', () => {
    const userDecision = document.getElementById('user-decision').value;
    const userGoals = sessionStorage.getItem('userGoals');

    if (userDecision.trim() === '') {
        alert("Please enter a decision.");
        return;
    }

    getAIAdvice(userDecision, userGoals);
});

// Back to the goal screen
document.getElementById('back-to-goals').addEventListener('click', () => {
    document.getElementById('advice-screen').style.display = 'none';
    document.getElementById('goal-screen').style.display = 'block';
});
