<script>
    import {onMount} from 'svelte';
    import FileDrop from '../components/FileDrop.svelte'
    import * as User from '../stores/user';
    import Materialize from "materialize-css";
    import Web3 from "web3";
    import {push} from 'svelte-spa-router'
    import {arweave} from "../constants";


    let validatedAccount = undefined;
    let validatedFile = undefined;
    let validatedWallet = undefined;
    let isMetaMaskInstalled = false;
    let isMetaMaskLocked = true;

    const droppedFile = e => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onloadend = () => {
            try {
                const wallet = JSON.parse(reader.result);
                arweave.wallets.jwkToAddress(wallet).then((address) => {
                    validatedAccount = address;
                    validatedWallet = wallet;
                    validatedFile = true;
                })
            } catch (e) {
                validatedFile = false;
            }
        };
        console.log(e);
        reader.readAsBinaryString(e.detail);
    };

    onMount(async () => {
        if (typeof window.ethereum !== 'undefined') {
            isMetaMaskInstalled = true;
        }
    });

    const onLoginClick = async e => {
        try {
            const web3 = new Web3(window.ethereum, null, {});
            const accounts = await window.ethereum.enable();
            User.profile.set({ethereum: {account: accounts[0]}, arweave: {wallet: validatedWallet, account: validatedAccount}});
            User.web3.set(web3);
            push("/");
            Materialize.toast({
                html: "Login successful!",
                classes: "green darken-4"
            });
        } catch (e) {
            console.log(e);
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
              successText="Great! Please login with MetaMask now!"
              failureText="That doesn't look like an Arweave keyfile"/>
</div>
{#if !isMetaMaskInstalled}
    <p class="error-p">This application requires the MetaMask browser extension to function properly. Please install it
        on your browser and refresh.</p>
{/if}
<button class="btn waves-effect waves-light right orange darken-2"
        disabled="{isMetaMaskInstalled && validatedFile ? '': 'disabled'}"
        on:click={onLoginClick}>Login with MetaMask
</button>
