<script>
    import "../node_modules/materialize-css/dist/css/materialize.min.css";
    import * as M from 'materialize-css/dist/js/materialize';

    import Navbar from "./components/Navbar.svelte";
    import {campaigns} from './stores/application';

    import Campaigns from "./routes/Campaigns.svelte"
    import About from "./routes/About.svelte"
    import Login from './routes/Login.svelte'
    import NewCampaign from './routes/NewCampaign.svelte'
    import Campaign from './routes/Campaign.svelte'
    import Router from 'svelte-spa-router'
    import {devCampaigns} from './constants_dev';

    import {onMount} from 'svelte';

    onMount(async () => {
        M.AutoInit();
        campaigns.set(devCampaigns);
    });


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

    :global(.user-icon) {
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.3);
        min-width: 30px;
    }

</style>

<Navbar/>
<div class="container">
    <Router {routes}/>
</div>


