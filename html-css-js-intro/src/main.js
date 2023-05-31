import CompanyService from "./service/CompanyService.js";
import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import statisticsConfig from "./config/statistics-config.json" assert{type: 'json'}
import employeesConfig from "./config/employees-config.json" assert{type: 'json'}
import { range } from "./util/number-functions.js";
import Spinner from "./ui/Spinner.js";
const N_EMPLOYEES = 100;
//employee model
//{id: number of 9 digits, name: string, birthYear: number,
// gender: female | male, salary: number, department: QA, Development, Audit, Accounting, Management}
const sections = [
    { title: "Empolyees", id: "employees-table-place" },
    { title: "Add Employee", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];

const spin = new Spinner();
const { minSalary, maxSalary, departments, minYear, maxYear} = employeesConfig;
const {age, salary} = statisticsConfig;
const statisticsIndex = sections.findIndex(s => s.title == "Statistics");
const employeeIndex = sections.findIndex(s => s.title == "Empolyees");
const employeeColumns = [
    {field: 'id', headerName: 'ID'},
    {field: 'name', headerName: 'Name'},
    {field: 'birthYear', headerName: 'Birth Year'},
    {field: 'gender', headerName: 'Gender'},
    {field: 'salary', headerName: 'Salary (ILS)'},
    {field: 'department', headerName: 'Department'}
];

const statisticsColumns = [
    {field: 'min', headerName: "Min value"},
    {field: 'max', headerName: "Max value"},
    {field: 'count', headerName: "Count"}
]

const menu = new ApplicationBar("menu-place", sections, menuHandler );
const companyService = new CompanyService();
const employeeForm = new EmployeeForm("employees-form-place");
const employeeTable = new DataGrid("employees-table-place", employeeColumns);
const ageStatistics = new DataGrid("age-statistics-place", statisticsColumns );
const salaryStatistics = new DataGrid("salary-statistics-place", statisticsColumns );

async function menuHandler(index) {
    if(index == statisticsIndex) {
        ageStatistics.clearTable();
        salaryStatistics.clearTable();
        spin.start();
        const ageT = await companyService.getStatistics(age.field, age.interval);
        const salT = await companyService.getStatistics(salary.field, salary.interval);
        salaryStatistics.fillData(salT);
        ageStatistics.fillData(ageT);
        spin.stop();
} else if (index == employeeIndex) {
   employeeTable.clearTable();
    spin.start();
    employeeTable.fillData(await companyService.getAllEmployees());
    spin.stop();
}
}

async function run() {
    while (true) {
        await employeeForm.buttonHasPressed();
        const employee = getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments);
        await companyService.addEmployee(employee);
    }

}
range(0, N_EMPLOYEES).forEach(() =>
 companyService.addEmployee(getRandomEmployee(minSalary, maxSalary, minYear,
     maxYear, departments)));

run();