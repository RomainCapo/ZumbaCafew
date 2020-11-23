import { createWebHistory, createRouter } from "vue-router";
import Home from '@/components/pages/Home.vue'
import About from '@/components/pages/About.vue'
import VocabRichness from '@/components/pages/VocabRichness.vue'
import WordFrequency from '@/components/pages/WordFrequency.vue'

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/vocab_richness",
        name: "VocabRichness",
        component: VocabRichness,
    },
    {
        path: "/word_frequency",
        name: "WordFrequency",
        component: WordFrequency,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;