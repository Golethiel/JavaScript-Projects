// list of dictionaries with id, name, age, department, and salary
const employees = [
      { id: 1, name: 'John Doe', age: 30, department: 'IT', salary: 50000, specialization:'JavaScript' },
      { id: 2, name: 'Alice Smith', age: 28, department: 'HR', salary: 45000, specialization:'Python' },
      { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance', salary: 60000, specialization:'Java' },
      //... More employee records can be added here
    ];
// Function to display all employees
function displayEmployees(data) {
const totalEmployees = employees.map((employee, index) => `<p>${employee.id}: ${employee.name}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`).join('');
        document.getElementById('employeesDetails').innerHTML = totalEmployees;
    }
// Function to calculate employees' total salaries
function calculateTotalSalaries() {
      const totalSalaries = employees.reduce((acc, employee) => acc + employee.salary, 0);
      alert(`Total Salaries: $${totalSalaries}`);
    }
// Function to display employees' details based on department
function displayHREmployees() {
     const hrEmployees = employees.filter(employee => employee.department === 'HR');
      const hrEmployeesDisplay = hrEmployees.map((employee, index) => `<p>${employee.id}: ${employee.name}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`).join('');
      document.getElementById('employeesDetails').innerHTML = hrEmployeesDisplay;
}
// Function to display employees' details based on ID
function findEmployeeById(employeeId) {
      const foundEmployee = employees.find(employee => employee.id === employeeId);
      if (foundEmployee) {
      document.getElementById('employeesDetails').innerHTML =`<p>${foundEmployee.id}: ${foundEmployee.name}: ${foundEmployee.name} - ${foundEmployee.department} - $${foundEmployee.salary}</p>`;
      }
      else{
        document.getElementById('employeesDetails').innerHTML = 'no employee has been found with this ID';
       }
   }
// Function to display the details of employees who have a specialization in JavaScript
function findBySpecialization(language) {
      const specializedEmployee = employees.find(employee => employee.specialization === language);
      if (specializedEmployee) {
      document.getElementById('employeesDetails').innerHTML = `<p>${specializedEmployee.id}: ${specializedEmployee.name}: ${specializedEmployee.name} - ${specializedEmployee.department} - $${specializedEmployee.salary}</p>`;
      }
      else{
        document.getElementById('employeeDetails').innerHTML = 'no employee has been found with a JavaScript specialization'
      }
}