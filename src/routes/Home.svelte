<script>
    import {profile, web3} from '../stores/user';
    import {onMount} from 'svelte';

    onMount(async () => {
        console.log($profile);
        console.log($web3);
    });

</script>

<h1>Placeholder Title</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, eaque fugit in incidunt, laboriosam nesciunt quae
    quam qui recusandae reprehenderit, rerum velit? Accusamus debitis dolorem fuga, nam odio perferendis ullam.</p>

