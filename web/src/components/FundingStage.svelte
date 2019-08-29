<script>
    import * as helpers from "../helpers";
    import {createEventDispatcher} from "svelte";
    import {sample} from "lodash";

    let dispatch = createEventDispatcher();
    let dispatchDelete = () => dispatch("delete", stage.number);

    let potentialStageNames = ["fabrication", "production", "shipping", "material acquisition"];

    export let stage = {};
    export let removeItem = {};
    export let last = false;

    $: stageWithOrdinal = helpers.getNumberWithOrdinal(stage.number);
</script>


<style>
    .stage {
        margin-top: 20px;
        margin-bottom: 20px;
        box-shadow: 0 5px 12px 8px rgba(80, 80, 80, 0.05);
        padding: 10px;
        border-radius: 10px;
        overflow: hidden;
    }

    .remove-button {
        position: absolute;
        transform: translateX(-100%);
        background: none !important;
        border: none;
        color: #039be5;
        padding: 0 !important;
        cursor: pointer;
    }

    .remove-button:hover {
        text-decoration: underline;
    }
</style>


<div class="stage">
    {#if stage.number !== 1 && last}
        <button role="link" class="right remove-button" on:click={dispatchDelete}>Remove</button>
    {/if}

    <div class="input-field col l4 s12">
        <input id="stageName-{stage.number}" type="text" class="validate" bind:value={stage.name}>
        <label for="stageName-{stage.number}">{stageWithOrdinal} stage name</label>
        <span class="helper-text">A name for the {stageWithOrdinal} stage (e.g: {sample(potentialStageNames)})</span>
    </div>
    <div class="input-field col l8 s12">
        <input id="stageDescription-{stage.number}" type="text" class="validate" bind:value={stage.description}>
        <label for="stageDescription-{stage.number}">{stageWithOrdinal} stage
            description</label>
        <span class="helper-text">A one-sentence description of the {stageWithOrdinal} delivery stage</span>
    </div>
</div>
