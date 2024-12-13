class TypingTest {
    constructor() {
        this.words = [];
        this.currentWordIndex = 0;
        this.startTime = 0;
        this.timeLimit = 60;
        this.timer = null;
        this.isTestActive = false;
        this.correctWords = 0;
        this.incorrectWords = 0;
        
        // DOM elements
        this.wordDisplay = document.getElementById('word-display');
        this.inputField = document.getElementById('input-field');
        this.timeDisplay = document.getElementById('time');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.restartBtn = document.getElementById('restart-btn');
        this.resultsDiv = document.getElementById('results');
        
        // Results elements
        this.finalWpmDisplay = document.getElementById('final-wpm');
        this.finalAccuracyDisplay = document.getElementById('final-accuracy');
        this.correctWordsDisplay = document.getElementById('correct-words');
        this.incorrectWordsDisplay = document.getElementById('incorrect-words');
        
        // Event listeners
        this.inputField.addEventListener('input', this.handleInput.bind(this));
        this.restartBtn.addEventListener('click', this.restart.bind(this));
        
        // Initialize
        this.initialize();
    }
    
    initialize() {
        this.words = getRandomWords();
        this.displayWords();
        this.inputField.value = '';
        this.inputField.disabled = false;
        this.currentWordIndex = 0;
        this.correctWords = 0;
        this.incorrectWords = 0;
        this.timeLimit = 60;
        this.timeDisplay.textContent = this.timeLimit;
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '100';
        this.resultsDiv.style.display = 'none';
        this.isTestActive = false;
        if (this.timer) clearInterval(this.timer);
    }
    
    displayWords() {
        this.wordDisplay.innerHTML = this.words
            .map((word, index) => `<span class="word ${index === this.currentWordIndex ? 'current' : ''}">${word}</span>`)
            .join('');
    }
    
    startTimer() {
        this.startTime = Date.now();
        this.timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
            const remainingTime = this.timeLimit - elapsedTime;
            
            if (remainingTime <= 0) {
                this.endTest();
            } else {
                this.timeDisplay.textContent = remainingTime;
                this.updateWPM(elapsedTime);
            }
        }, 1000);
    }
    
    handleInput(event) {
        if (!this.isTestActive) {
            this.isTestActive = true;
            this.startTimer();
        }
        
        const inputValue = event.target.value;
        const currentWord = this.words[this.currentWordIndex];
        
        if (inputValue.endsWith(' ')) {
            // Word completed
            const typedWord = inputValue.trim();
            const wordElement = this.wordDisplay.children[this.currentWordIndex];
            
            if (typedWord === currentWord) {
                wordElement.classList.add('correct');
                this.correctWords++;
            } else {
                wordElement.classList.add('incorrect');
                this.incorrectWords++;
            }
            
            this.currentWordIndex++;
            this.inputField.value = '';
            
            if (this.currentWordIndex < this.words.length) {
                this.displayWords();
                this.updateAccuracy();
            }
        }
    }
    
    updateWPM(elapsedTime) {
        const minutes = elapsedTime / 60;
        const wpm = Math.round((this.correctWords + this.incorrectWords) / minutes);
        this.wpmDisplay.textContent = wpm;
    }
    
    updateAccuracy() {
        const totalWords = this.correctWords + this.incorrectWords;
        const accuracy = totalWords === 0 ? 100 : Math.round((this.correctWords / totalWords) * 100);
        this.accuracyDisplay.textContent = accuracy;
    }
    
    endTest() {
        clearInterval(this.timer);
        this.isTestActive = false;
        this.inputField.disabled = true;
        
        // Calculate final stats
        const minutes = this.timeLimit / 60;
        const finalWpm = Math.round((this.correctWords + this.incorrectWords) / minutes);
        const finalAccuracy = Math.round((this.correctWords / (this.correctWords + this.incorrectWords)) * 100);
        
        // Update results display
        this.finalWpmDisplay.textContent = finalWpm;
        this.finalAccuracyDisplay.textContent = finalAccuracy;
        this.correctWordsDisplay.textContent = this.correctWords;
        this.incorrectWordsDisplay.textContent = this.incorrectWords;
        
        // Show results
        this.resultsDiv.style.display = 'block';
    }
    
    restart() {
        this.initialize();
    }
}

// Start the typing test when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
});
