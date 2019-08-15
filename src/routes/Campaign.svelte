<script>
    import {campaigns} from '../stores/application';

    export let params = {};
    $: campaign = $campaigns.filter(c => c.id === params.id)[0];
</script>


<style>


    .subtext {
        color: #646464;
        font-size: 0.8em;
    }

    .campaign-image {
        max-width: 100%;
        border-radius: 6px;
    }

    .campaign-desc {
        text-align: justify;
    }

    .campaign-container {
        display: flex;
    }

    .campaign-donations {
        margin-left: 40px;
        min-width: 340px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 5px 12px 8px rgba(0,0,0,0.15);
        padding-left: 20px;
        padding-right: 20px;
    }

    .user-details {
        display: flex;
        margin-bottom: 25px;
    }
    .user-details > p {
        margin: auto 0 auto 5px;
    }

    .btn {
        width: 100%;
    }



</style>

{#if campaign}
    <h1>{campaign.title}</h1>


    <div class="user-details">
        <svg class="user-icon" width="40" height="40" data-jdenticon-value={campaign.raiser} />
        <p>A campaign by {campaign.username} <span class="subtext">({campaign.raiser})</span>
            from {campaign.location}</p>
    </div>
    <div class="campaign-container">
        <div class="campaign-details">



            <img class="campaign-image" src="data:image/png;base64,{campaign.splash}" alt="campaign splash">
            <h5>{campaign.tagline}</h5>
            <p class="campaign-desc">{campaign.description}</p>
        </div>
        <div class="campaign-donations">
            <h5>1 ETH <span class="subtext"> raised of {campaign.target} ETH target</span></h5>
            <div class="progress">
                <div class="determinate" style="width: 70%"></div>
            </div>

            <button class="btn waves-effect waves-light green darken-2">Donate Now!</button>


            <p>Donations:</p>
        </div>

    </div>
{:else}
    <p>I'm either still loading, or you campaign was not found :(</p>
{/if}
