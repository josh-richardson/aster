<script>
    import {createEventDispatcher} from "svelte";
    let dispatch = createEventDispatcher();

    export let initialText, successText, failureText, success;

    const onDrop = e => {
        e.preventDefault();
        dispatch("droppedFile", e.dataTransfer.files[0]);
    };
    const onDragEvent = e => {
        e.stopPropagation();
        e.preventDefault();
    };
    const onClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            dispatch("droppedFile", e.target.files[0]);
        };
        input.click();
    }
</script>

<style>
    .file-drop {
        outline: 1px dashed rgba(0, 0, 0, .35);
        border-radius: 5px;
        padding: 20px;
        background-color: #f5f5f5;
        outline-offset: -10px;
        text-align: center;
        cursor: pointer;
    }

    .success {
        background-color: rgba(150, 255, 121, 0.2);
    }

    .failure {
        background-color: rgba(170, 0, 0, 0.15);
    }
</style>

<div class="file-drop {success === true && 'success'} {success === false && 'failure'}" on:drop={onDrop}
     on:dragenter={onDragEvent}
     on:dragover={onDragEvent}
     on:click={onClick}
>
    <p>{success == undefined ? initialText : (success ? successText : failureText) }</p>
</div>
