import App from './App.svelte';
import "jdenticon";

const app = new App({
	target: document.body,
});

window.jdenticon_config = {
	replaceMode: "observe"
};

window.app = app;

export default app;
