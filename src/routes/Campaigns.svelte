<script>
    import {profile, web3} from '../stores/user';
    import {campaigns} from '../stores/application';
    import {onMount} from 'svelte';
    import CampaignCard from "../components/CampaignCard.svelte";

    onMount(async () => {
        console.log($profile);
        console.log($web3);
        campaigns.set([1, 2, 3, 4])
    });



</script>

<style>
    .campaigns-container {
        flex-direction: row;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: auto;
        padding-top: 20px;
    }
</style>

<h1>Campaigns</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, eaque fugit in incidunt, laboriosam nesciunt quae
    quam qui recusandae reprehenderit, rerum velit? Accusamus debitis dolorem fuga, nam odio perferendis ullam.</p>


<div class="campaigns-container">

    {#each $campaigns as item}
        <CampaignCard campaign={item} />
    {/each}

</div>

