document.addEventListener('DOMContentLoaded', function () {
    const teams = document.querySelectorAll('.team-btn');
    const optionsBtn = document.getElementById('options-btn');
    const options = document.getElementById('options');
    const optionButtons = document.querySelectorAll('.option');
    const timerDisplay = document.getElementById('timer');

    const nextQuestionBtn = document.getElementById('next-question'); // Add this line


    let selectedTeam = null;
    let timerInterval;
    let timerSeconds = 16; // Set the initial time to 15 seconds


// Event listeners for team buttons
teams.forEach(team => {
    team.addEventListener('click', function () {

        const teamAudio = new Audio('../sounds/teamsSelection.mp3');
        selectedTeam = team.getAttribute('data-team');
        // Remove existing selected class from all buttons
        teams.forEach(btn => {
            btn.classList.remove('selected');
        });
        // Add selected class to the clicked button
        team.classList.add('selected');
        teamAudio.play();
    });
});




  // ****************Old Timer 👇******************


    // Add event listener for starting or resetting the timer based on the button's class
    const timerControlBtn = document.getElementById('start-timer-control');
    const timerControlBtn2 = document.getElementById('reset-timer-control');
    timerControlBtn2.style.display = 'none';
    const optionsAudio = new Audio('../sounds/Timer 15 sec.mp3');
        
    timerControlBtn.addEventListener('click', function() {
        timerControlBtn.style.display = 'none';
        timerControlBtn2.style.display = 'block';
        resetTimer();    
        startTimer();
        optionsAudio.play();
    });

    timerControlBtn2.addEventListener('click', function() {
        timerControlBtn2.style.display = 'none';
        timerControlBtn.style.display = 'block';
        resetTimer();    
        optionsAudio.pause();
    });
    
    // const startTimerBtn = document.getElementById('start-timer');

   // Variable to track if the timer is running

    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
        optionsAudio.load();
        optionsAudio.play();
        // startTimerBtn.textContent = 'Stop Timer'; // Change button text to 'Stop Timer'
    }
    
    function stopTimer() {
        console.log(timerDisplay); // Log timerDisplay to check if it's null
        clearInterval(timerInterval);
        timerRunning = false;
        optionsAudio.pause();
        // startTimerBtn.textContent = 'Start Timer'; // Change button text to 'Start Timer'
    }
    
    
    function updateTimer() {
        timerSeconds--;
        if (timerSeconds < 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
            return;
        }
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        timerDisplay.textContent = `${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    function resetTimer() {
        clearInterval(timerInterval);
        timerSeconds = 16; // Reset timer to initial value
        updateTimer(); 
        optionsAudio.pause();// Update timer display
        // startTimerBtn.textContent = 'Start Timer'; // Change button text to 'Start Timer'
    }
    
    // const startTimerBtn = document.getElementById('start-timer');
    
    // timerControlBtn.addEventListener('click', function () {
        // if (timerRunning) {
        //     stopTimer();
        // } else {
        //     startTimer();
        // }
    //         resetTimer();
    //         startTimer();
       
    //  });
    
    
    // Add event listener for the reset button
    // const resetTimerBtn = document.getElementById('reset-timer');
    // resetTimerBtn.addEventListener('click', resetTimer);
    


 // ****************Timer 👆******************







    // ****************Questions 👇******************
    const questions = [
        {
            question: "Q1. It’s safe to take paracetamol with other types of painkiller that contain paracetamol",
            options: ['True','False'],
            correctOption: 1,
            images: ["../images/sonic.webp","../images/sonic.webp"],
            ref: ["Ref: NHS;2023;1-8;Paracetamol for adults"],
            optionLabels : ['A', 'B', 'C', 'D']

        },
        {
            question: "Q2. Paracetamol is safe to take in pregnancy and while breastfeeding, at recommended doses",
            options: ["True", "False"],
            correctOption: 0,
            images: ["../images/sonic.webp","../images/sonic.webp"],
            ref: ["Ref: NHS;2023;1-8;Paracetamol for adults"],
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q3. _____ can increase the risk of Gastrointestinal (GI) bleeding, myocardial infarction, and stroke from the very first day of use",
            options: ["Nimesulide", "Acetaminophen", "NSAIDS"],
            correctOption: 2,
            images: ["../images/sonic.webp","../images/sonic.webp","../images/sonic.webp"],
            ref: ["Ref: Davis A;British Journal of General Practice;2016;66;172-173"],
            optionLabels : ['A', 'B', 'C', 'D']

        }


    ];


    
    let currentQuestionIndex = 0;

    const questionDisplay = document.getElementById('question');
    const optionsDisplay = document.getElementById('options');
    const btn_result = document.getElementById('result');
    btn_result.style.display='none';

    displayQuestion();
    function displayQuestion() {
        try {
            const currentQuestion = questions[currentQuestionIndex];
            questionDisplay.textContent = currentQuestion.question;
            optionsDisplay.innerHTML = ''; // Clear previous options
    
            currentQuestion.options.forEach((option, index) => {
                const optionBtn = document.createElement('button');
                optionBtn.textContent = option;
                optionBtn.classList.add('option');
                optionBtn.dataset.index = index; // Store the index of the option
                optionBtn.addEventListener('click', handleOptionClick);
    
                const optionDiv = document.createElement('div');
                optionDiv.classList.add('option-div');
    
                const optionImg = document.createElement('img');
                optionImg.src = currentQuestion.images[index]; // Assuming 'currentQuestion.images' is your object array
                optionImg.classList.add('option-image');
                optionDiv.appendChild(optionImg); // Append image to div

                optionImg.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevent the click event from propagating
                });
    
                const optionLabel = document.createElement('p'); // Create a <p> element for the label
                optionLabel.textContent = currentQuestion.optionLabels ? currentQuestion.optionLabels[index] : String.fromCharCode(65 + index);
                optionLabel.classList.add('option-label'); // Add a class for styling
                optionDiv.appendChild(optionLabel); // Append label to div
    
                optionBtn.appendChild(optionDiv); // Append div to button
                optionsDisplay.appendChild(optionBtn); // Append button to optionsDisplay


                
                optionLabel.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevent the click event from propagating on label
                });
           
                  // Update the footer reference

                  changeFooterText(currentQuestion.ref);



                  // Changing the ref
      
                  function changeFooterText(newText) {
                      const footerParagraph = document.querySelector('footer p');
                      if (footerParagraph) {
                          footerParagraph.textContent = newText;
                      } else {
                          console.error('Footer paragraph not found.');
                      }
                  }
           
            });
    
            optionsDisplay.style.display = 'grid'; // Show options
        } catch (error) {
            questionDisplay.style.display = 'none';
            optionsDisplay.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
            btn_result.style.display = 'block';
        }
    }
    
    
    

    


    var popupContainer = document.getElementById('popupContainer');
    var popupContainer2 = document.getElementById('popupContainer2');
    
        function handleOptionClick(event) {




            if (selectedTeam === null) {
                alert("Please select a team first!");
                return;
            }



            const selectedOptionIndex = parseInt(event.target.dataset.index);
            const currentQuestion = questions[currentQuestionIndex];
            const teamKey1 = `Game2 Table ${selectedTeam}`; // Construct team key
            const teamKey2 = `Table ${selectedTeam}`; // Construct team key for total score
            const optionButtons = document.querySelectorAll('.option');
            const wrongAudio = new Audio('../sounds/wrong-answer-Buzzer.mp3'); // Load the wrong answer sound file
            const successAudio = new Audio('../sounds/success.mp3'); // Load the success sound file
            
            let score = parseInt(localStorage.getItem(teamKey1)) || 0; // Retrieve current score from localStorage
            let score2 = parseInt(localStorage.getItem(teamKey2)) || 0; // Retrieve current score from localStorage
        
            if (selectedOptionIndex === currentQuestion.correctOption) {
                // Handle correct answer
                event.target.style.backgroundColor = '#93ff2c'; // Change background color to green
                score += 10; // Add 10 to the current score
                score2 += 10; // Add 10 to the current score
                successAudio.play(); // Play the success sound
                showPopup2()
                // popupContainer.style.display= 'block';
              
                
            } else {
                // Handle incorrect answer
                event.target.style.backgroundColor = '#ff0000'; // Change background color to red
                event.target.style.color = '#fff'; // Change text color to white
                wrongAudio.play(); // Play the wrong answer sound
                showPopup() 
                
            }
        
            localStorage.setItem(teamKey1, score); // Update score in localStorage
            localStorage.setItem(teamKey2, score2); // Update score in localStorage
        
            
                stopTimer();
            
        }
        
         // Function to show the popup container and hide it after 3 seconds
      function showPopup() {
        popupContainer.style.display = "block";
        setTimeout(function() {
          popupContainer.style.display = "none";
        }, 3000); // 3000 milliseconds = 3 seconds
      }
    
      function showPopup2() {
        popupContainer2.style.display = "block";
        setTimeout(function() {
          popupContainer2.style.display = "none";
        }, 3000); // 3000 milliseconds = 3 seconds
      }
    
        
    
        // Event listener for options button
        // Event listener for options button
    // optionsBtn.addEventListener('click', function () {
    
      
    //     if (optionsDisplay.style.display === 'none') {
    //         optionsDisplay.style.display = 'grid';
    //         optionsBtn.textContent = 'Show Options';
            
    //     } else {
    //         optionsDisplay.style.display = 'none';
    //         optionsBtn.textContent = 'Show Options';
    //     }
    // });
    
    
    
        // Event listener for next question button
        nextQuestionBtn.addEventListener('click', function () {
    
    
    // teams.forEach(btn => {
    //             btn.classList.remove('selected');
    //         });
            
        const questionAudio = new Audio('../sounds/next-question.mp3');
        
    
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
                
                resetTimer();
                questionAudio.play();
            } else {
                // currentQuestionIndex = 0; // Reset to the first question
                displayQuestion();
            }
        });
    
        // ****************Questions 👆******************
    
    
        // Event listener for the Reset Score button
    const resetScoreBtn = document.getElementById('reset-score');
    resetScoreBtn.addEventListener('click', function() {
        localStorage.clear(); // Clear localStorage data
    });
    
    
    
    
    
    });