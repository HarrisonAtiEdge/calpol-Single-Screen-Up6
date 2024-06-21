// document.addEventListener('DOMContentLoaded', function () {
    const teams = document.querySelectorAll('.team-btn');
    const optionsBtn = document.getElementById('options-btn');
    
    const options = document.getElementById('options');
    const optionButtons = document.querySelectorAll('.option');
    const timerDisplay = document.getElementById('timer');

    const nextQuestionBtn = document.getElementById('next-question'); // Add this line
    const teamContainer = document.getElementById('forBuzzerTables');

    let selectedTeam = null;
    let timerInterval;
    let timerSeconds = 16; // Set the initial time to 15 seconds

    teamContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('team-btn')) {
            const team = event.target;
            const teamAudio = new Audio('../sounds/teamsSelection.mp3');
            selectedTeam = team.getAttribute('data-team');
            console.log('Team selected:', selectedTeam);

            // Remove existing selected class from all buttons
            const teams = document.querySelectorAll('.team-btn');
            teams.forEach(btn => {
                btn.classList.remove('selected');
            });

            // Add selected class to the clicked button
            team.classList.add('selected');
            teamAudio.play();
        }
    });





// Event listeners for team buttons
teams.forEach(team => {
    team.addEventListener('click', function () {

        const teamAudio = new Audio('../sounds/teamsSelection.mp3');
        selectedTeam = team.getAttribute('data-team');

        console.log(selectedTeam)
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
        updateTimer(); // Update timer display
        optionsAudio.pause();
        // startTimerBtn.textContent = 'Start Timer'; // Change button text to 'Start Timer'
    }
    
    

 // ****************Timer 👆******************







    // ****************Questions 👇******************
    const questions = [
        {  
            question: "Q1. _____ is included in the WHO Model List for pain and palliative care?",
            options: ["Mefanamic Acid", "Ibuprofen", "Paracetamol", "Nimesulide"],
            correctOption: 2,
            images: ["../images/../images/sonic.webp","../images/sonic.webp","../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref:	World Health Organization Model List of Essential Medicines – 23rd List, 2023. Geneva: World Health Organization; 2023 (WHO/MHP/HPS/EML/2023.02). Licence: CC BY-NC-SA 3.0 IGO.",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q2. Mefenamic acid is not recommended to be used in children owing to its serious side effects.",
            options: ["False", "True"],
            correctOption: 1,
            images: ["../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref: Indian Academy of Pediatrics (IAP) Fever: General Management",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q3. According to National Health Services (NHS), which drug is considered as a painkiller to treat aches and pain and to reduce a high temperature?",
            options: ["Paracetamol", "Ibuprofen", "Mefanamic Acid", "Nimesulide"],
            correctOption: 0,
            images: ["../images/sonic.webp","../images/sonic.webp","../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref: NHS;2023;1-8;Paracetamol for adults",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q4. Paracetamol has low risk of adverse reactions and proven analgesic efficacy.",
            options: ["True", "False"],
            correctOption: 0,
            images:  ["../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref: Misiolek, H;Anaesthesiology Intensive Therapy;2014;46;221-244",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q5. Paracetamol can be taken with or without food.",
            options: ["False", "True"],
            correctOption: 1,
            images:  ["../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref:	NHS;2023;1-8;Paracetamol for adults",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q6. Increase the dose or take double dose of Paracetamol if your pain is very bad.",
            options: ["False", "True"],
            correctOption: 0,
            images:  ["../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref:	NHS;2023;1-8;Paracetamol for adults",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q7. In children 5 years and under, the most accurate way to take a temperature is through:",
            options: ["Oral (Mouth)", "Axillary (Arm)", "Rectum"],
            correctOption: 2,
            images: ["../images/sonic.webp","../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref:	Indian Academy of Pediatrics (IAP) Fever: General Management",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q8. When the body detects any infection or inflammation, the brain responds by raising the body temperature to help fight the condition.",
            options: ["True", "False"],
            correctOption: 0,
            images:  ["../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref:	Indian Academy of Pediatrics (IAP) Fever: General Management",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q9. A rectal temperature of over 38°C (100.4°F)is considered as fever is considered as Fever",
            options: ["False", "True"],
            correctOption: 1,
            images:  ["../images/sonic.webp","../images/sonic.webp"],
            ref: "Ref:	Indian Academy of Pediatrics (IAP) Fever: General Management",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q10. Fever is body’s defense mechanism and can occur in response to following conditions:",
            options: ["Postvaccination",
                      "Infections (viral, bacterial and fungal)",
                      "Dehydration",
                      "All of these"],
            correctOption: 3,
            images: ["../images/sonic.webp","../images/sonic.webp","../images/sonic.webp","../images/sonic.webp"],
            ref: "Ref:	Indian Academy of Pediatrics (IAP) Fever: General Management",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q11. In children who are unable to take paracetamol orally, your doctor may decide to.",
            options: ["give paracetamol through IV",
                      "give paracetamol suppository through rectal route",
                      "give paracetamol drops"],
            correctOption: 1,
            images:  ["../images/sonic.webp","../images/sonic.webp","../images/sonic.webp"],
            ref: "Ref:	Indian Academy of Pediatrics (IAP) Fever: General Management",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q12. The purpose of fever medicine is not to bring down the temperature to normal level, but to provide symptomatic relief to child by reducing pain and discomfort.",
            options: ["False", "True"],
            correctOption: 1,
            images:  ["../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref:	Indian Academy of Pediatrics (IAP) Fever: General Management",
            optionLabels : ['A', 'B', 'C', 'D']
        
        },
        {
            question: "Q13. Around 50% of patients with common cold experience muscles aches and pains (myalgia)",
            options: ["True", "False"],
            correctOption: 0,
            images:  ["../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref:	Eccles R;The Lancet Infectious Diseases; 2005;5;718-725",
            optionLabels : ['A', 'B', 'C', 'D']
        },
        {
            question: "Q14. Analgesic of choice for episodic use in patients with impaired renal functions",
            options: ["Acetaminophen", "NSAIDs"],
            correctOption: 0,
            images:  ["../images/sonic.webp","../images/sonic.webp"],
            ref:  "Ref:	Blondell RD;American family physician;2013;87;766-772",
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
                    event.stopPropagation(); // Prevent the click event from propagating on img
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
        else{
        const selectedOptionIndex = parseInt(event.target.dataset.index);
        const currentQuestion = questions[currentQuestionIndex];
        const teamKey1 = `Game1 Table ${selectedTeam}`; // Construct team key
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

        selectedTeam = null;

            
    } 
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

    




    // Event listener for next question button
    nextQuestionBtn.addEventListener('click', function () {
        var h1 = teamContainer.querySelector('h1');
       
        teamContainer.innerHTML="";
        teamContainer.appendChild(h1);

        buzzerStarted = false;
        toShowListBtn.innerHTML='Start Buzzer';
        count = 0;

    teams.forEach(btn => {
            btn.classList.remove('selected');
        });
        
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
      // Define the keys you want to remove
      const keysToRemove = ['Game1 Table 1', 'Game1 Table 2', 'Game1 Table 3', 'Game1 Table 4', 'Game1 Table 5', 'Game1 Table 6', 'Game1 Table 7', 'Game1 Table 8',
      'Game1 Table 9', 'Game1 Table 10','Game1 Table 11', 'Game1 Table 12',  'Game1 Table 13', 'Game1 Table 14', 'Game1 Table 15', 'Game1 Table 16', 'Game1 Table 17', 'Game1 Table 18',
      'Game1 Table 19', 'Game1 Table 20','Game1 Table 21', ];
  
      // Loop through the keys and remove them from localStorage
      keysToRemove.forEach(key => {
          localStorage.removeItem(key);
      });
  });


// });