const btnInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log("beforeinstall triggered");
    window.deferredPrompt = event;
    btnInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
btnInstall.addEventListener('click', async () => {
    console.log("user clicked save")
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        console.log("no prompt event triggered");
        return;
      }
    promptEvent.prompt();
    window.deferredPrompt = null;
    btnInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("app installed finished");
    btnInstall.classList.toggle("hidden", true);
    window.deferredPrompt = null;
});
