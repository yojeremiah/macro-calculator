// DOM ELEMENTS
const loading = document.querySelector('.loading-container');
const results = document.querySelector('.results-container');
const inputForm = document.querySelector('.form');
const errorMsg = document.querySelector('#error-msg');
// INPUTS
const metric = document.querySelector('#metric');
const imperial = document.querySelector('#imperial');
const unitRadios = document.getElementsByName('units');
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const male = document.querySelector('#male');
const female = document.querySelector('#female');
const btnSubmit = document.querySelector('#btn-submit');
const sexRadios = document.getElementsByName('sex');
// OUTPUTS
// Cutting
const cuttingCalsMobile = document.querySelector('#cutting-calories-mobile');
const cuttingProteinMobile = document.querySelector('#cutting-protein-mobile');
const cuttingCarbsMobile = document.querySelector('#cutting-carbs-mobile');
const cuttingFatsMobile = document.querySelector('#cutting-fats-mobile');
const cuttingCals = document.querySelector('#cutting-calories');
const cuttingProtein = document.querySelector('#cutting-protein');
const cuttingCarbs = document.querySelector('#cutting-carbs');
const cuttingFats = document.querySelector('#cutting-fats');
// Maintenance
const maintainCalsMobile = document.querySelector('#maintain-calories-mobile');
const maintainProteinMobile = document.querySelector('#maintain-protein-mobile');
const maintainCarbsMobile = document.querySelector('#maintain-carbs-mobile');
const maintainFatsMobile = document.querySelector('#maintain-fats-mobile');
const maintainCals = document.querySelector('#maintain-calories');
const maintainProtein = document.querySelector('#maintain-protein');
const maintainCarbs = document.querySelector('#maintain-carbs');
const maintainFats = document.querySelector('#maintain-fats');
// Bulking
const bulkingCalsMobile = document.querySelector('#bulking-calories-mobile');
const bulkingProteinMobile = document.querySelector('#bulking-protein-mobile');
const bulkingCarbsMobile = document.querySelector('#bulking-carbs-mobile');
const bulkingFatsMobile = document.querySelector('#bulking-fats-mobile');
const bulkingCals = document.querySelector('#bulking-calories');
const bulkingProtein = document.querySelector('#bulking-protein');
const bulkingCarbs = document.querySelector('#bulking-carbs');
const bulkingFats = document.querySelector('#bulking-fats');

// Test values 
// MALE
// (200lbs, 72in, 24yrs == 2458 cals TDEE)
// (91kg, 183cm, 24yrs == 2458 cals TDEE)
// FEMALE
// (120lbs, 64in, 30yrs == 1595 cals TDEE)
// (54 kg, 163cm, 30yrs == 1585 cals TDEE)

// User-Info Object (for body stat inputs)
const userBodyStats = {
  units: 'metric',
  age: 0,
  height: 0,
  weight: 0,
  sex: 'male'
};

// User-Macros object
const userMacros = {
  tdee: 0,
  cutting: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  },
  maintain: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  },
  bulking: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  },

};

// Initialize form and displays when page loads
window.onload = function() {
  inputForm.reset();
  clearDisplay(loading);
  clearDisplay(results);
}

// Remove the 'display' class from DOM element
function clearDisplay(element) {
  element.classList.remove('display');
}

// Event listener for the submit button
btnSubmit.addEventListener('click', submit);

// Main function (calls all sub-functions)
function submit(e) {
  // Prevent default submit action
  e.preventDefault();

  // Calculate macros if inputs are valid
  if(validate()){
    parseInputs();
    calculateTDEE()
    calculateMacros();
    displayMacros();
    loadResults();
  }
}

// Validate inputs
function validate() {
  let errors = false;
  // Invalid age
  if (age.value === NaN || age.value < 1 || age.value > 123) {
    console.log(`Invalid age: ${age.value}`);
    errors = throwError();
  }
  // Invalid height
  if (height.value === NaN || height.value < 20 || height.value > 273) {
    console.log(`Invalid height: ${height.value}`);
    errors = throwError();
  }
  // Invalid weight
  if (weight.value === NaN || weight.value < 3 || weight.value > 1401) {
    console.log(`Invalid weight: ${weight.value}`);
    errors = throwError();
  }
  // If errors, hide UI elements and return false
  if (errors) {
    clearDisplay(loading);
    clearDisplay(results);
    return false;
  } 
  // If no errors, clear error display and return true
  else {
    errorMsg.style.display = 'none';
    return true;
  }
}

// Throw an error message to the screen
function throwError() {
  errorMsg.style.display = 'block';
  return true;
}

// Parse form inputs for user body stats
function parseInputs() {
  // Store input values in user-info object
  // Units of measurement
  for (let i = 0; i < unitRadios.length; i++) {
    if (unitRadios[i].checked) {
      userBodyStats.units = unitRadios[i].value;
    }
  }
  // Age
  userBodyStats.age = age.value;
  // Height
  userBodyStats.height = height.value;
  // Weight
  userBodyStats.weight = weight.value;
  // Sex
  for (let i = 0; i < sexRadios.length; i++) {
    if (sexRadios[i].checked) {
      userBodyStats.sex = sexRadios[i].value;
    }
  }
}

// Calculate TDEE based on body stats
function calculateTDEE() {
  // Check for units of measurement
  // Metric calculations
  if (userBodyStats.units === 'metric') {
    // Male formula
    if (userBodyStats.sex === 'male') {
      // Metric male BMR calculation
      let BMR = 88 + (13.4 * userBodyStats.weight) + (4.8 * userBodyStats.height) - (5.7 * userBodyStats.age);
      // TDEE (adjust BMR with activity multiplier - 1.25 for estimate)
      userMacros.tdee = 1.25 * BMR;
    }
    // Female formula
    else if (userBodyStats.sex === 'female') {
      // Metric female BMR calculation
      let BMR = 448 + (9.2 * userBodyStats.weight) + (3.1 * userBodyStats.height) - (4.3 * userBodyStats.age);
      // TDEE (adjust BMR with activity multiplier - 1.25 for estimate)
      userMacros.tdee = 1.25 * BMR;
    }
    // Invalid sex
    else {
      console.log(`Invalid sex. "${userBodyStats.sex}" is not a valid selection.`);
    }
  }
  // Imperial calculations
  else if (userBodyStats.units === 'imperial') {
    // Male formula
    if (userBodyStats.sex === 'male') {
      // Imperial male BMR calculation
      let BMR = 88 + (6.1 * userBodyStats.weight) + (12.2 * userBodyStats.height) - (5.7 * userBodyStats.age);
      // TDEE (adjust BMR with activity multiplier - 1.25 for estimate)
      userMacros.tdee = 1.25 * BMR;
    }
    // Female formula
    else if (userBodyStats.sex === 'female') {
      // Imperial female BMR calculation
      let BMR = 448 + (4.2 * userBodyStats.weight) + (7.9 * userBodyStats.height) - (4.3 * userBodyStats.age);
      // TDEE (adjust BMR with activity multiplier - 1.25 for estimate)
      userMacros.tdee = 1.25 * BMR;
    }
    // Invalid sex
    else {
      console.log(`Invalid sex. "${userBodyStats.sex}" is not a valid selection.`);
    }
  }
  // Invalid unit of measurement
  else {
    console.log(`Invalid unit of measurement. "${userBodyStats.units}" is not a valid selection.`);
  }
  calculateMacros();
}

// Calculate total calories and macro breakdowns based on TDEE
function calculateMacros() {
  // Cutting
  // 500 calorie deficit
  userMacros.cutting.calories = Math.floor(userMacros.tdee - 500);
  // 2.2g/kg or 1g/lb protein
  userMacros.cutting.protein = (userBodyStats.units === 'metric') ? Math.floor(userBodyStats.weight * 2.2) : userBodyStats.weight * 1;
  // .25% of total calories for fats (9cals in 1g of fats)
  userMacros.cutting.fats = Math.floor((0.25 * userMacros.cutting.calories) / 9);
  // Remaining calories for carbs (4cals in 1g of carbs)
  userMacros.cutting.carbs = Math.floor((userMacros.cutting.calories - ((userMacros.cutting.protein * 4) + (userMacros.cutting.fats * 9))) / 4);
  

  // Maintenance
  // No calorie deficit
  userMacros.maintain.calories = Math.floor(userMacros.tdee);
  // 2.2g/kg or 1g/lb protein
  userMacros.maintain.protein = (userBodyStats.units === 'metric') ? Math.floor(userBodyStats.weight * 2.2) : userBodyStats.weight * 1;
  // .25% of total calories for fats (9cals in 1g of fats)
  userMacros.maintain.fats = Math.floor((0.25 * userMacros.maintain.calories) / 9);
  // Remaining calories for carbs (4cals in 1g of carbs)
  userMacros.maintain.carbs = Math.floor((userMacros.maintain.calories - ((userMacros.maintain.protein * 4) + (userMacros.maintain.fats * 9))) / 4);

  // Bulking
  // 250 calorie surplus
  userMacros.bulking.calories = Math.floor(userMacros.tdee + 250);
  // 2.2g/kg or 1g/lb protein
  userMacros.bulking.protein = (userBodyStats.units === 'metric') ? Math.floor(userBodyStats.weight * 2.2) : userBodyStats.weight * 1;
  // .25% of total calories for fats (9cals in 1g of fats)
  userMacros.bulking.fats = Math.floor((0.25 * userMacros.bulking.calories) / 9);
  // Remaining calories for carbs (4cals in 1g of carbs)
  userMacros.bulking.carbs = Math.floor((userMacros.bulking.calories - ((userMacros.bulking.protein * 4) + (userMacros.bulking.fats * 9))) / 4);
}

// Display calorie and macro values to the DOM
function displayMacros(){
  // Cutting
  cuttingCals.innerText = userMacros.cutting.calories;
  cuttingCalsMobile.value = `${userMacros.cutting.calories} kcal`;
  cuttingProtein.innerText = userMacros.cutting.protein;
  cuttingProteinMobile.value = `${userMacros.cutting.protein}g`;
  cuttingCarbs.innerText = userMacros.cutting.carbs;
  cuttingCarbsMobile.value = `${userMacros.cutting.carbs}g`;
  cuttingFats.innerText = userMacros.cutting.fats;
  cuttingFatsMobile.value = `${userMacros.cutting.fats}g`;
  // Maintain
  maintainCals.innerText = userMacros.maintain.calories;
  maintainCalsMobile.value = `${userMacros.maintain.calories} kcal`;
  maintainProtein.innerText = userMacros.maintain.protein;
  maintainProteinMobile.value = `${userMacros.maintain.protein}g`;
  maintainCarbs.innerText = userMacros.maintain.carbs;
  maintainCarbsMobile.value = `${userMacros.maintain.carbs}g`;
  maintainFats.innerText = userMacros.maintain.fats;
  maintainFatsMobile.value = `${userMacros.maintain.fats}g`;
  // Bulking
  bulkingCals.innerText = userMacros.bulking.calories;
  bulkingCalsMobile.value = `${userMacros.bulking.calories} kcal`;
  bulkingProtein.innerText = userMacros.bulking.protein;
  bulkingProteinMobile.value = `${userMacros.bulking.protein}g`;
  bulkingCarbs.innerText = userMacros.bulking.carbs;
  bulkingCarbsMobile.value = `${userMacros.bulking.carbs}g`;
  bulkingFats.innerText = userMacros.bulking.fats;
  bulkingFatsMobile.value = `${userMacros.bulking.fats}g`;
}

// Display the loading and results messages
function loadResults() {
  // Clear previous results
  results.classList.remove('display');
  // Display loading for 2 seconds
  loading.classList.add('display');
  setTimeout(function() {
    // Hide loading
    loading.classList.remove('display');
    // Display new results
    results.classList.add('display');
  }, 2000);
}
