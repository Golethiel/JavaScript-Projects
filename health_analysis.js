    
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


// searches and fetches from the JSON file
function searchCondition() {
    // store the user condition
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // attempt to fetch from the JSON file
    fetch('health_analysis.json')
        .then(response => response.json())
        .then(data => {
        const condition = data.conditions.find(item => item.name.toLowerCase() === input);

        // if the condition is in the file,
        // the information is initialized in variables
        if (condition) {
            const symptoms = condition.symptoms.join(', ');
            const prevention = condition.prevention.join(', ');
            const treatment = condition.treatment;

            resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
            resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

            // the information is displayed in the webpage
            resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
            resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
            resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
        } else {
            // message to display if the condition is not in the file
            resultDiv.innerHTML = 'Condition not found.';
        }
        })
        // default error handling
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

// add a listener to the search button
btnSearch.addEventListener('click', searchCondition);



