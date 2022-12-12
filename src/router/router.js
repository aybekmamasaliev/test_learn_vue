import Main from "@/pages/Main.vue"
import UserPage from "@/pages/UserPage.vue"
import About from "@/pages/About.vue"
import CurrentPost from "@/pages/CurrentPost.vue"
import PostPageWithStore from "@/pages/PostPageWithStore"
import { createRouter, createWebHashHistory } from "vue-router"
const routes=[
    {
        path:"/",
        component: Main
    },
    {
        path:"/posts",
        component: UserPage
    },
    {
        path:"/about",
        component:About
    },
    {
        path:"/posts/:id",
        component:CurrentPost
    },
    {
        path:"/store",
        component:PostPageWithStore
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;