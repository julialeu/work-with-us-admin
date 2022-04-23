import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import CreateJobVacancyView from "../views/CreateJobVacancyView.vue";
import CreateCompanyView from "../views/CreateCompanyView.vue";
import ListJobVacanciesView from "../views/ListJobVacanciesView.vue";
import ListMyCompaniesView from "../views/ListMyCompaniesView.vue";
import EditJobVacancyView from "../views/EditJobVacancyView.vue";
import EditCompanyView from "../views/EditCompanyView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardView,
        },

        {
            path: "/my-companies",
            name: "my-companies",
            component: ListMyCompaniesView,
        },

        {
            path: "/create-company",
            name: "create-company",
            component: CreateCompanyView,
        },

        {
            path: "/edit-company",
            name: "edit-company",
            component: EditCompanyView,
        },

        {
            path: "/create-job-vacancy",
            name: "create-job-vacancy",
            component: CreateJobVacancyView,
        },

        {
            path: "/list-job-vacancies",
            name: "list-job-vacancies",
            component: ListJobVacanciesView,
        },

        {
            path: "/edit-job-vacancy/:uuid",
            name: "edit-job-vacancy",
            component: EditJobVacancyView,
        }
    ],
});

export default router;
