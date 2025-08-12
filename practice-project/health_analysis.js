    
const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const patients = [];

// function to fetch user entered data
function addPatient() {
    // variables that store the info the user inputted
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    // checks if all things are valid (filled-in)
    if (name && gender && age && condition) {
        patients.push({ name, gender: gender.value, age, condition });
        // call to a function that will clear the form fields
        resetForm();
        // call to a function that will generate a report
        generateReport();
    }
}


// function that resets the form
function resetForm() {
    // references the places in the document that had stored the user input
    // and resets them to blank fields
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
}


function generateReport() {
    const numPatients = patients.length;
    // counter for all patients
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
        // counter for males
        Male: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
        },
        //counter for females
        Female: {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
        },
    };

    // increments conditions and updates the counters
    for (const patient of patients) {
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;
    }

        report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
        report.innerHTML += `Conditions Breakdown:<br>`;
    for (const condition in conditionsCount) {
        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

        report.innerHTML += `<br>Gender-Based Conditions:<br>`;
    for (const gender in genderConditionsCount) {
        report.innerHTML += `${gender}:<br>`;
        for (const condition in genderConditionsCount[gender]) {
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
        }
    }
}

// listener for the addPatient button
addPatientButton.addEventListener("click", addPatient);


// will store the parsed JSON data
let healthConditions = [];

// attempt to fetch from the JSON file
fetch('./health_analysis.json')
    .then(response => {
    console.log("Received response object.");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })  
    .then(data => {
        healthConditions = data.conditions;
        console.log('Data loaded successfully:', healthConditions);
    })
    .catch(error => {
        console.error('There was a problem fetching the file:', error);
    });


// searches and fetches from the JSON file
function searchCondition() {
    console.log("Search Condition function was called.");
    // store the user condition
    const input = document.getElementById('conditionInput').value;
    const searchTerm = input.trim().toLowerCase();

    const foundCondition = healthConditions.find(condition => 
        condition.name.toLowerCase() === searchTerm
    );

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (foundCondition) {
        resultDiv.innerHTML = `
            <h2>${foundCondition.name}</h2>
            <img src="${foundCondition.imagesrc}" alt="${foundCondition.name}">
            
            <h3>Symptoms</h3>
            <ul>
                ${foundCondition.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
            </ul>

            <h3>Prevention</h3>
            <ul>
                ${foundCondition.prevention.map(item => `<li>${item}</li>`).join('')}
            </ul>
            
            <h3>Treatment</h3>
            <p>${foundCondition.treatment}</p>
        `;
    } else {
        resultDivDiv.innerHTML = `<p>No information found for "${input}". Please check your spelling.</p>`;
    }
}


// add a listener to the search button
document.getElementById('btnSearch').addEventListener('click', searchCondition);



