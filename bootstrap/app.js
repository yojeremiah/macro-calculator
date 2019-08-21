// DOM ELEMENTS
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
const maintainProteinMobile = document.querySelector(
  '#maintain-protein-mobile'
);
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

// User-Info Object (for body stat inputs)
const userBodyStats = {
  units: 'metric',
  age: 0,
  height: 0,
  weight: 0,
  sex: 'male'
};

// Event listener for the submit button
btnSubmit.addEventListener('click', parseInputs);

// Parse form inputs for user body stats
// Store input values in user-info object
function parseInputs(e) {
  // Prevent default submit action
  e.preventDefault();
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
  console.log(userBodyStats);
}
