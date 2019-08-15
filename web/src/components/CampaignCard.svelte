
<script>

    export let campaign;
    import {link} from 'svelte-spa-router'
</script>


<style>
    .card {
        max-width: 300px;
        width: 300px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .card-title {
        text-shadow: 2px 2px #000;
    }

    .card img {
        height: 200px;
    }

    .card-link {
        text-decoration: none;
        color: black;
    }

    .card-action {
        display: flex;
    }

    .card-action > p {
        display: block;
        margin: auto 0 auto 10px;
    }



</style>

<a use:link class="card-link" href="/campaign/{campaign.id}">
    <div class="card">
        <div class="card-image">
            <img src="data:image/png;base64,{campaign.thumb}" alt="campaign main image">
            <span class="card-title">{campaign.title}</span>
        </div>
        <div class="card-content">
            <p>{campaign.tagline}</p>
        </div>
        <div class="card-action">
            <svg class="user-icon" width="40" height="40" data-jdenticon-value={campaign.raiser} />
            <p>{campaign.username}</p>
        </div>
    </div>
</a>
