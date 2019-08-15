<style>
    .card {
        max-width: 300px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .card-title {
        text-shadow: 2px 2px #000;
    }

    .card img {
        height: 200px;
    }
</style>

<div class="card">
    <div class="card-image">
        <img src="https://source.unsplash.com/random/300x{(Math.random() * 100).toFixed(0)}">
        <span class="card-title">Card Title</span>
    </div>
    <div class="card-content">
        <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
    </div>
    <div class="card-action">
        <a href="#">This is a link</a>
    </div>
</div>
