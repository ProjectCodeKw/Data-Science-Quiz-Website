// Data Science Quizzes - Quiz Logic

/**
 * Initialize quiz with answers and explanations
 * @param {Object} answers - Object mapping question IDs to correct answers
 * @param {Object} explanations - Object mapping question IDs to explanations
 */
function initQuiz(answers, explanations) {
    window.quizAnswers = answers;
    window.quizExplanations = explanations;
}

/**
 * Submit quiz and show results
 */
function submitQuiz() {
    const answers = window.quizAnswers;
    const explanations = window.quizExplanations;

    if (!answers || !explanations) {
        console.error('Quiz not initialized properly');
        return;
    }

    let correct = 0;
    const total = Object.keys(answers).length;

    for (let q in answers) {
        const questionNum = q.substring(1);
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const feedback = document.getElementById(`f${questionNum}`);

        if (!feedback) continue;

        if (selected) {
            if (selected.value === answers[q]) {
                correct++;
                feedback.className = 'feedback correct';
                feedback.innerHTML = '<strong>Correct!</strong> ' + explanations[q];
            } else {
                feedback.className = 'feedback incorrect';
                feedback.innerHTML = '<strong>Incorrect.</strong> ' + explanations[q];
            }
        } else {
            feedback.className = 'feedback incorrect';
            feedback.innerHTML = '<strong>No answer selected.</strong> ' + explanations[q];
        }
        feedback.style.display = 'block';
    }

    // Display score
    const percentage = ((correct / total) * 100).toFixed(1);
    const scoreDiv = document.getElementById('score');

    let gradeClass = 'needs-work';
    if (percentage >= 80) gradeClass = 'excellent';
    else if (percentage >= 60) gradeClass = 'good';

    scoreDiv.innerHTML = `
        <h2>Quiz Complete!</h2>
        <div class="percentage ${gradeClass}">${percentage}%</div>
        <p>You scored <strong>${correct}</strong> out of <strong>${total}</strong> questions.</p>
    `;
    scoreDiv.style.display = 'block';

    // Scroll to top to see score
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Make submitQuiz available globally
window.submitQuiz = submitQuiz;
