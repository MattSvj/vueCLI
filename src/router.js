import Vue from "vue";
import Router from "vue-router";
import BlogDetails from "./components/BlogDetails.vue";
import NotFound from "./components/NotFound.vue";
import Project from "./components/Project.vue";
import ProjectDetails from "./components/ProjectDetails.vue";
import MainPage from "./components/MainPage.vue";
import Blog from "./components/Blog.vue";
import RequestForm from './components/RequestForm.vue';

Vue.use(Router);

export default new Router({
  mode: "history", // Используем history mode для чистых URL
  routes: [
    {
      path: "/",
      name: "Home",
      component: MainPage
    },
    {
      path: '/request',
      name: 'Request',
      components: {
        default: RequestForm,
        form: MainPage,
      }
    },
    {
      path: "/Blog",
      name: "Blog",
      component: Blog
    },
    {
      path: "/BlogDetails",
      name: "BlogDetails",
      component: BlogDetails
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    },
    {
        path: "/Project",
        name: "Project",
        component: Project
    },
    {
        path: "/ProjectDetails",
        name: "ProjectDetails",
        component: ProjectDetails
    }
  ]
});
