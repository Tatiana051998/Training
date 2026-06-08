const questions = [
            {
                text: "Сколько будет 5 + 3?",
                type: "choice",
                options: ["6", "7", "8", "9"],
                correct: "8"
            },
            {
                text: "Сколько будет 10 - 4?",
                type: "text",
                correct: "6"
            },
            {
                text: "Сколько будет 3 × 4?",
                type: "choice",
                options: ["10", "11", "12", "13"],
                correct: "12"
            },
            {
                text: "Сколько будет 15 ÷ 3?",
                type: "text",
                correct: "5"
            },
            {
                text: "Сколько будет 7 + 8?",
                type: "choice",
                options: ["13", "14", "15", "16"],
                correct: "15"
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let bestScore = localStorage.getItem('bestScoreMath') || 0;

        // Показываем лучший результат на старте
        if (bestScore > 0) {
            document.getElementById('bestScoreDisplay').innerHTML = `🏆 Лучший результат: ${bestScore} из ${questions.length}`;
        }

        function startTest() {
            currentQuestion = 0;
            score = 0;
            
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('resultScreen').style.display = 'none';
            document.getElementById('testScreen').style.display = 'block';
            
            showQuestion();
        }

        function showQuestion() {
            if (currentQuestion >= questions.length) {
                endTest();
                return;
            }
            
            const question = questions[currentQuestion];
            const container = document.getElementById('questionContainer');
            const feedbackDiv = document.getElementById('feedback');
            feedbackDiv.innerHTML = '';
            
            let html = `<div class="question-text">${currentQuestion + 1}. ${question.text}</div>`;
            
            if (question.type === "choice") {
                html += `<div class="options">`;
                question.options.forEach(option => {
                    html += `<div class="option" onclick="checkAnswer('${option}')">${option}</div>`;
                });
                html += `</div>`;
            } else {
                html += `<input type="number" id="textAnswer" class="input-answer" placeholder="Введите число..." onkeypress="handleEnter(event)">`;
                html += `<button class="btn" onclick="checkTextAnswer()">Ответить</button>`;
            }
            
            container.innerHTML = html;
        }

        function checkAnswer(answer) {
            const question = questions[currentQuestion];
            const isCorrect = answer === question.correct;
            
            if (isCorrect) {
                score++;
                showFeedback(true, answer, question.correct);
            } else {
                showFeedback(false, answer, question.correct);
            }
            
            setTimeout(() => {
                currentQuestion++;
                showQuestion();
            }, 1500);
        }

        function checkTextAnswer() {
            const input = document.getElementById('textAnswer');
            const answer = input.value.trim();
            
            if (answer === "") {
                alert("Пожалуйста, введите ответ!");
                return;
            }
            
            const question = questions[currentQuestion];
            const isCorrect = answer === question.correct;
            
            if (isCorrect) {
                score++;
                showFeedback(true, answer, question.correct);
            } else {
                showFeedback(false, answer, question.correct);
            }
            
            setTimeout(() => {
                currentQuestion++;
                showQuestion();
            }, 1500);
        }

        function handleEnter(event) {
            if (event.key === 'Enter') {
                checkTextAnswer();
            }
        }

        function showFeedback(isCorrect, userAnswer, correctAnswer) {
            const feedbackDiv = document.getElementById('feedback');
            const className = isCorrect ? 'correct' : 'incorrect';
            const message = isCorrect 
                ? `✅ Правильно! ${userAnswer} - верный ответ!`
                : `❌ Неправильно! Ваш ответ: ${userAnswer}. Правильный ответ: ${correctAnswer}`;
            
            feedbackDiv.innerHTML = `<div class="feedback ${className}">${message}</div>`;
            
            // Прокрутка к фидбеку
            feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function endTest() {
            document.getElementById('testScreen').style.display = 'none';
            document.getElementById('resultScreen').style.display = 'block';
            
            const percentage = (score / questions.length) * 100;
            document.getElementById('scoreDisplay').innerHTML = `${score} из ${questions.length}<br><span style="font-size: 18px;">${percentage}%</span>`;
            
            // Сохраняем лучший результат
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem('bestScoreMath', bestScore);
                document.getElementById('bestScoreDisplay').innerHTML = `🏆 Новый рекорд! Лучший результат: ${bestScore} из ${questions.length}`;
            } else {
                document.getElementById('bestScoreDisplay').innerHTML = `🏆 Лучший результат: ${bestScore} из ${questions.length}`;
            }
        }

        function restartTest() {
            startTest();
        }