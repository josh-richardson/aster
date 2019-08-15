<script>
    import "../node_modules/materialize-css/dist/css/materialize.min.css";
    import '../node_modules/materialize-css/dist/js/materialize.min.js';
    import Navbar from "./components/Navbar.svelte";


    import Campaigns from "./routes/Campaigns.svelte"
    import About from "./routes/About.svelte"
    import Login from './routes/Login.svelte'
    import NewCampaign from './routes/NewCampaign.svelte'
    import Campaign from './routes/Campaign.svelte'
    import Router from 'svelte-spa-router'


    document.title = "Aster - Decentralized Crowdfunding!";

    const routes = {
        '/': Campaigns,
        "/about": About,
        "/login": Login,
        "/new": NewCampaign,
        "/campaign/:id": Campaign
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


