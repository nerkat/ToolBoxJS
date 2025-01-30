import './loader.component'; // Loader Component
// sectionUtils.js

// Global function to refresh a section by ID
export async function refreshSection(sectionId) {
  // show loader
  const sectionElement = document.querySelector('#shopify-section-\${sectionId}');
  sectionElement.style.position = 'relative';
  let loader = document.createElement('loading-spinner');
  sectionElement.appendChild(loader);

  try {
    const url = '/?section_id=\${sectionId}';
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to fetch section: \${response.statusText}');

    const sectionHtml = await response.text();
    if (!sectionElement) throw new Error('Section with ID \${sectionId} not found on the page.');

    sectionElement.innerHTML = '';
    sectionElement.innerHTML = sectionHtml;
    console.log('Section \${sectionId} refreshed successfully.');
  } catch (error) {
    console.error("Error refreshing section:", error);
  }

}
