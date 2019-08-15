<script>
    export let params = {};

    import {onMount} from 'svelte';

    onMount(async () => {
        console.log(params);
    });
</script>


<style>


</style>


<h1>Awesome Campaign</h1>
<p>I want to fund a new house for my dog! {params.id}</p>
