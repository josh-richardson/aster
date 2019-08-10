<script>
    import {onMount} from 'svelte';
    import FileDrop from '../components/FileDrop.svelte'
    import Materialize from "materialize-css";

    let validatedFile = undefined;
    let isMetaMaskInstalled = false;
    let isMetaMaskLocked = true;

    const droppedFile = e => {
        e.preventDefault();
        validatedFile = true;
    };

    onMount(async () => {
        if (typeof window.ethereum !== 'undefined') {
            isMetaMaskInstalled = true;
        }
    });

    const onLoginClick = async e => {
        console.log(ethereum);
        try {
            const accounts = await window.ethereum.enable();
            const account = accounts[0];
            console.log(account);
        } catch (e) {
            Materialize.toast({
                html: "There was a problem authenticating with MetaMask. Please try again.",
                classes: "yellow darken-4"
            });
        }
    }

</script>

<style>
    .drop-wrapper {
        margin-bottom: 10px;
    }

    .error-p {
        text-align: right;
        color: rgba(255, 25, 0, 0.65);
    }
</style>


<h1>Aster Login</h1>
<p>You'll need to drop an Arweave keyfile, and allow access to your MetaMask wallet. Aster requires both to function
    properly.</p>

<div class="drop-wrapper">
    <FileDrop class="file-drop" on:droppedFile={droppedFile} success={validatedFile}
              initialText="Please drop a keyfile here, or click to select!"
              successText="Great! Please authenticate with MetaMask now!"
              failureText="That doesn't look like an Arweave keyfile"/>
</div>
{#if !isMetaMaskInstalled}
    <p class="error-p">This application requires the MetaMask browser extension to function properly. Please install it
        on your
        browser.</p>
{/if}
<button class="btn waves-effect waves-light right" disabled="{isMetaMaskInstalled ? '': 'disabled'}"
        on:click={onLoginClick}>Login with MetaMask
</button>
