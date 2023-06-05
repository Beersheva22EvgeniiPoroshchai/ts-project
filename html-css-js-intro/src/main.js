import CompanyService from "./service/CompanyService.js";
import CompanyServiceJson from "./service/CompanyServiceJson.js";
import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import statisticsConfig from "./config/statistic-config.json" assert{type: 'json'}
import employeesConfig from "./config/employees-config.json" assert{type: 'json'}
import serviceConfig from "./config/service-config.json" assert{type: 'json'}
import { range } from "./util/number-functions.js";
import Spinner from "./ui/Spinner.js";
import Poller from "./service/Poller.js";
const N_EMPLOYEES = 1;
let curIndex;


//employee model
//{id: number of 9 digits, name: string, birthYear: number,
// gender: female | male, salary: number, department: QA, Development, Audit, Accounting, Management}
const sections = [
    { title: "Employees", id: "employees-table-place" },
    { title: "Add Employee", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];
const { minSalary, maxSalary, departments, minYear, maxYear } = employeesConfig;
const { age, salary } = statisticsConfig;
const employeeColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'birthYear', headerName: 'Birth Year' },
    { field: 'gender', headerName: 'Gender' },
    { field: 'salary', headerName: 'Salary, NIS' },
    { field: 'department', headerName: 'Department' },
  ];

const statisticsColumns = [
    { field: 'min', headerName: "Min value" },
    { field: 'max', headerName: "Max value" },
    { field: 'count', headerName: "Count" }
]
//objects
const menu = new ApplicationBar("menu-place", sections, menuHandler);
const companyService = serviceConfig.url? new CompanyServiceJson(serviceConfig.url) : new CompanyService();
const employeeForm = new EmployeeForm("employees-form-place", employeesConfig);
const employeeTable = new DataGrid("employees-table-place", employeeColumns, delEmplFromObj, openUpdForm);
const ageStatistics = new DataGrid("age-statistics-place", statisticsColumns);
const salaryStatistics = new DataGrid("salary-statistics-place", statisticsColumns);
const spinner = new Spinner("spinner-place");
const poller = new Poller (5000, callbackFn, serviceConfig.url) 

employeeForm.addHandler(async (employee) => {
    await action(companyService.addEmployee.bind(companyService, employee));
})

async function menuHandler(index) {
    switch (index) {
        case 0: {
            curIndex = index;
            await buildAllEmplTable();
            break;
        }
        case 1: {
            curIndex = index;
            document.getElementById('update-table-place').hidden = true;
            break;
        }
        case 2: {
            curIndex = index;
            await buildStatisticEmplTable();
            break;
        }
    }

}

async function buildStatisticEmplTable() {
    const ageStatisticsData = await action(companyService.
        getStatistics.bind(companyService, age.field, age.interval));
    ageStatistics.fillData(ageStatisticsData);
    const salaryStatisticsData = await action(companyService.getStatistics.bind(companyService,
        salary.field, salary.interval));
    salaryStatistics.fillData(salaryStatisticsData);
}

async function buildAllEmplTable() {
    const employees = await action(companyService.getAllEmployees.bind(companyService));
    employeeTable.fillData(employees);
    employeeTable.hideButton();
}

async function action(serviceFn) {
    spinner.start();
    const res = await serviceFn();
    spinner.stop();
    return res;
    
}
function createRandomEmployees() {
    const promises = range(0, N_EMPLOYEES).map(() =>
    companyService.addEmployee(getRandomEmployee(minSalary, maxSalary, minYear,
        maxYear, departments)));
return Promise.all(promises)
}

async function delEmplFromObj (id) {
    await action(companyService.delEmplById.bind(companyService, id));
    
}

async function openUpdForm (id) {
const employeeUpdForm = new EmployeeForm("update-table-place", employeesConfig, updFn);
const elemById = await action(companyService.getEmplById.bind(companyService, id));
employeeUpdForm.createUpdForm(elemById)
employeeUpdForm.updHandler(id);
}

async function updFn (obj, id) {
    await action(companyService.updEmplById.bind(companyService, obj, id));
}


async function callbackFn() {
    switch (curIndex) {
        case 0: {
            buildAllEmplTable();
            break;
         }
            case 2: {
                buildStatisticEmplTable();
            break;
            }
        }    
    }  

 poller.start();


action(createRandomEmployees);