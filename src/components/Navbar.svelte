<script>

    import {link} from 'svelte-spa-router'
    import active from 'svelte-spa-router/active'
    import { profile } from '../stores/user';


</script>


<style>
    #logo-container {
        margin-left: 10px;
    }

    a {
        color: black;
    }

    .brand-logo {
        color: black;
    }

    a:hover {
        text-decoration: none;
    }

    a:visited {
        color: black;
    }

    :global(a.active) {
        background-color: rgba(0, 0, 0, 0.15);
    }

    .logo-image {
        margin-top: 8px;
        margin-left: 8px;
        max-height: 50px;
    }


</style>


<nav class="grey lighten-5" role="navigation">
    <img class="logo-image"
         src="data:image/png;base64,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"
         alt="logo"/>
    <a id="logo-container" href="#!" class="brand-logo">Aster</a>
    <ul class="right hide-on-med-and-down">
        <li><a href="/" use:link use:active>Campaigns</a></li>
        <li><a href="/about" use:link use:active>About</a></li>
        {#if $profile}
            <li><a href="/new" use:link use:active>New Campaign</a></li>
            <li><a href="/profile" use:link use:active>Profile</a></li>
        {:else}
            <li><a href="/login" use:link use:active>Log In</a></li>
        {/if}
    </ul>
    <ul id="nav-mobile" class="sidenav">
        <li><a href="/" use:link use:active>Campaigns</a></li>
        <li><a href="/about" use:link use:active>About</a></li>
        {#if $profile}
            <li><a href="/new" use:link use:active>New Campaign</a></li>
            <li><a href="/profile" use:link use:active>Profile</a></li>
        {:else}
            <li><a href="/login" use:link use:active>Log In</a></li>
        {/if}
    </ul>
    <a href="#!" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>

</nav>
