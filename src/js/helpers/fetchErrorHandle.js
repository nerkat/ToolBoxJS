import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js';

if (!window.fetch.isWrapped) {
    let activeRequests = 0;

    // Create and style the loading bar
    const loadingBar = document.createElement('sl-progress-bar');
    loadingBar.style.position = 'fixed';
    loadingBar.style.top = '0';
    loadingBar.style.left = '0';
    loadingBar.style.width = '100%';
    loadingBar.style.zIndex = '1000';
    loadingBar.style.display = 'none'; // Initially hidden
    loadingBar.indeterminate = true; // Show an indeterminate progress bar
    document.body.appendChild(loadingBar);

    const originalFetch = window.fetch;

    window.fetch = async function (...args) {
        // Show the loading bar at the start of each fetch request
        if (activeRequests === 0) loadingBar.style.display = 'block';
        activeRequests += 1;

        try {
            const response = await originalFetch(...args);

            if (!response.ok) {
                throw new Error('HTTP error! Status: \${response.status}');
            }

            return response;
        } catch (error) {
            showErrorToast(error.message); // Show the error toast
            throw error;
        } finally {
            // Hide the loading bar after all requests are complete
            activeRequests -= 1;
            if (activeRequests === 0) loadingBar.style.display = 'none';
        }
    };

    // Flag to ensure fetch is only wrapped once
    window.fetch.isWrapped = true;
}

// Helper function to create and show the toast
function showErrorToast(message) {
    const alert = document.createElement('sl-alert');
    alert.variant = 'danger';
    alert.duration = 5000; // Display for 5 seconds
    alert.innerHTML = '<strong>Error:</strong> \${message}';

    document.body.appendChild(alert); // Add the toast to the DOM
    alert.toast(); // Trigger the toast to show
}
