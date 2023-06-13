import MoviesPersistService from "./service/MoviesPersistService.js";
import MainScreen from "./ui/MainScreen.js";
import barConfig from "./config/bar-config.json" assert{type: 'json'};
import ApplicationBar from "./ui/ApplicationBar.js";
import DetailsModal from "./ui/DetailsModal.js";
import Pagination from "./ui/Pagination.js";
import SignUpForm from "./ui/SignUpForm.js";
import SignInForm from "./ui/SignInForm.js";
import ServiceRegistration from "./service/ServiceRegistration.js";
import SearchForm from "./ui/SearchForm.js";

let curUser;
let sectForMenu = checkLocalStorage();


const parentElement =  document.getElementById("movies-galery");
const childElements = Array.from(parentElement.children);

const menu = new ApplicationBar('menu-place', sectForMenu, menuHandler);
const API_KEY = '2c46288716a18fb7aadcc2a801f3fc6b';
const moviesPersistService = new MoviesPersistService(API_KEY);
const genres = await moviesPersistService.getGenres();
const nameGenres = genres.genres.map(elmn => elmn.name);
const startPage = await moviesPersistService.getAllMovies();

const mainScreen = new MainScreen(childElements[0], getDetailsForMovie);
const detailsModal = new DetailsModal("movie-details-place");
const pagination = new Pagination(childElements[1], rebuild) //mainScreen.buildMainCollection.bind(mainScreen));
const totalPages = await mainScreen.buildMainCollection(startPage);
pagination.addPagination(totalPages);

const signUpForm = new SignUpForm("signUp-form-place", signUpfn);
const signInForm = new SignInForm("signIn-form-place", signInFn);
const serviceRegistr = new ServiceRegistration('http://localhost:3500/users');
const searchForm = new SearchForm("search-form-place", searchByGenreFn, nameGenres);



async function searchByGenreFn(obj)  {
   const chooseGenreId = genres.genres.filter(elem => elem.name == obj.genre);
   const listMoviesByFilter = await moviesPersistService.getFilteredMovies(chooseGenreId[0]);
   const totalPagedByFiltered = await mainScreen.buildMainCollection(listMoviesByFilter);
   pagination.addPagination(totalPagedByFiltered,1,moviesPersistService.getFilteredMovies.bind(moviesPersistService,chooseGenreId[0]));
   }


function checkLocalStorage() {
    let res;
const user = JSON.parse(localStorage.getItem("currentUser"));
if (user == null) {
    res = barConfig.sections_in;
} else {
    res = barConfig.sections_out;
    curUser = user;
}
return res;
}

async function signUpfn (obj) {

    const existsObj = await serviceRegistr.getUserByName(obj.name);
    
    if (existsObj.length != 0) {
        alert(`User with name ${obj.name} already exists. Please, choose new username`);
    } else {
        serviceRegistr.addUser(obj);
        alert(`Congratulations, ${obj.name}. You are registered`);
     
    }
     
}
    

async function signInFn (obj) {
     
    const existsObjSignIn = await serviceRegistr.userSignIn(obj.name, obj.password);
   
if (existsObjSignIn.length > 0 ) {
    alert(`Welcome, ${obj.name} to the Cinema City portal`)
    localStorage.setItem("currentUser", JSON.stringify(existsObjSignIn[0]));
    curUser = existsObjSignIn[0];
    location.reload(); 


} else {
    alert(`Wrong name or password! Or follow to the registration form`);
}

}

async function menuHandler(index){
    switch (index){
        case 0: {
            const popularMovie = await moviesPersistService.getAllMovies();
            const totalPages = await mainScreen.buildMainCollection(popularMovie);
            pagination.addPagination(totalPages,1,moviesPersistService.getAllMovies.bind(moviesPersistService));

            // const employees = await action (companyService.getAllEmployees.bind(companyService));
            // employeeTable.fillData(employees, companyService.removeById.bind(companyService), openAndUpdate.bind(companyService));
            break;
        }
    
        case 1:{
            searchForm.createSearchForm();
            break; 
        }
        case 2:{
            if (curUser != undefined) {
                localStorage.removeItem("currentUser");
                location.reload(); 
            } else {
                signInForm.createSignInForm();
                
            }
            
            break; 
        }
        case 3:{
            
            signUpForm.createSignUpForm();
            break; 
        }
    }
}


async function getDetailsForMovie(id){
    const details = await moviesPersistService.getMovieById(id)
    detailsModal.getMovieDetails(details);

}

async function rebuild (page, func = moviesPersistService.getAllMovies.bind(moviesPersistService)){
    const newPage = await func(page);
    const total = await mainScreen.buildMainCollection(newPage,page);
    pagination.addPagination(total, page);
}

checkLocalStorage();