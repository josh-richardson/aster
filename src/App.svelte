<script>
    import "../node_modules/materialize-css/dist/css/materialize.min.css";
    import '../node_modules/materialize-css/dist/js/materialize.min.js';
    import Navbar from "./components/Navbar.svelte";


    import Home from "./routes/Home.svelte"
    import About from "./routes/About.svelte"
    import Login from './routes/Login.svelte'
    import NewCampaign from './routes/NewCampaign.svelte'
    import Router from 'svelte-spa-router'


    document.title = "Aster - Decentralized Crowdfunding!";

    const routes = {
        '/': Home,
        "/about": About,
        "/login": Login,
        "/new": NewCampaign
    };
    export let url = "";

    export let name;
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>

<Navbar />
<div class="container">
    <Router {routes} />
</div>


