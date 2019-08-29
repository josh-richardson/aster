<script>
    import FundingStage from "../components/FundingStage.svelte";
    import asterContract from "../constants";
    let currentStage = 1;
    let stages = [
        {
            number: 1,
            name: "",
            description: ""
        }
    ];

    let formState = {
        campaignName: "",
        tagline: "",
        description: "",
        target: "",
        raiseDuration: "",
        deliveryDuration: "",
        name: "",
        location: ""
    };

    const newStageClick = () => {
        return stages = [...stages, {number: ++currentStage, name: "", description: ""}];
    };
    const deleteItem = e => {
        stages = stages.filter(s => s.number !== e.detail);
        currentStage--;
    };

    const createButtonClicked = () => {
        console.log(asterContract);
    }

</script>


<style>
    .correct {
        font-size: 2.75em;
    }

    .stages {
        margin-bottom: 56px;
        margin-top: 30px;
    }
</style>


<div class="row">
    <h1>New Campaign</h1>
    <p>To create a new campaign, please fill in the following details:</p>


    <div class="input-field col l6 s12">
        <input id="campaign_name" type="text" class="validate" bind:value={formState.campaignName}>
        <label for="campaign_name">Campaign Name</label>
    </div>

    <div class="input-field col l6 s12">
        <input id="tagline" type="text" class="validate" bind:value={formState.tagline}>
        <label for="tagline">Tagline</label>
        <span class="helper-text">A short sentence describing your campaign</span>
    </div>

    <div class="input-field col l12 s12">
        <textarea id="description" class="materialize-textarea" bind:value={formState.description}></textarea>
        <label for="description">Description (multiline)</label>
        <span class="helper-text">A longer description of your campaign. It should contain all the necessary information to communicate your roadmap and vision.</span>
    </div>

    <div class="input-field col l12 s12">
        <input id="target" type="text" class="validate" bind:value={formState.target}>
        <label for="target">Target to raise</label>
        <span class="helper-text">The amount of ETH to raise (e.g. 0.5, or 150)</span>
    </div>

    <div class="input-field col l6 s12">
        <input id="raiseDuration" type="text" class="validate" bind:value={formState.raiseDuration}>
        <label for="raiseDuration">Duration (days)</label>
        <span class="helper-text">The amount of time to raise the given amount of money</span>
    </div>

    <div class="input-field col l6 s12">
        <input id="deliveryDuration" type="text" class="validate" bind:value={formState.deliveryDuration}>
        <label for="deliveryDuration">Delivery period (days)</label>
        <span class="helper-text">The amount of time it will take for you to deliver after funding</span>
    </div>

    <div class="input-field col l6 s12">
        <input id="name" type="text" class="validate" bind:value={formState.name}>
        <label for="name">Your name</label>
        <span class="helper-text">Optional, but will increase credibility</span>
    </div>
    <div class="input-field col l6 s12">
        <input id="location" type="text" class="validate" bind:value={formState.location}>
        <label for="location">Your location</label>
        <span class="helper-text">Optional, but will increase credibility</span>
    </div>


</div>

<div class="row stages">

    <h4>Stages:</h4>
    <p>Campaigns have multiple stages after having been funded. At each stage, funders will be able to vote based on
        evidence provided by you as to whether or not to release the next round of funding. Every stage must have been
        completed by the time the delivery period you specified previously has elapsed.</p>

    {#each stages as stage}
        <FundingStage stage={stage} on:delete={deleteItem} last={stage===stages.slice(-1)[0]}></FundingStage>
    {/each}
    <button class="btn btn-floating btn-large waves-effect waves-light green darken-2 right"
            on:click={newStageClick}><span
            class="correct">+</span></button>
</div>

<div class="row">
    <button class="btn right waves-effect waves-light green darken-2" on:click={createButtonClicked}>Create Campaign!</button>
</div>
