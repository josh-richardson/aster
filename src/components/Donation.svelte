<script>
    export let donation
</script>

<style>
.donation-top {
    display: flex;
}

    .donation-top p {
        margin: auto 0 auto 5px;
        max-width: calc(100% - 35px);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .donation {
        margin-top: 15px;
        margin-bottom: 10px;
        overflow: hidden;
        border-bottom: 1px solid #d8d8d8;
    }

    .donation > p {
        margin-bottom: 15px;
    }

    .donation:last-of-type {
        border-bottom: none;
    }



</style>


<div class="donation">
    <div class="donation-top">
        <svg class="user-icon" width="30" height="30" data-jdenticon-value={donation.from} />
        <p>{donation.from}</p>
    </div>
    <p>{donation.amount.toFixed(2)} ETH</p>


</div>
