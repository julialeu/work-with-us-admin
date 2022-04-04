import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import CreateJobVacancyView from "../views/CreateJobVacancyView.vue";
import ListJobVacanciesView from "../views/ListJobVacanciesView.vue";
import EditJobVacancyView from "../views/EditJobVacancyView.vue";

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
        },

        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue"),
        },
    ],
});

export default router;
