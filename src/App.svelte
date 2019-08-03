<script>
    import "../node_modules/materialize-css/dist/css/materialize.min.css";
    import '../node_modules/materialize-css/dist/js/materialize.min.js';
    import Navbar from "./components/Navbar.svelte";

    import Home from "./routes/Home.svelte"
    import About from "./routes/About.svelte"

    import Router from 'svelte-spa-router'

    const routes = {
        '/': Home,
        "/about": About,
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

<Navbar></Navbar>

<Router {routes} />
