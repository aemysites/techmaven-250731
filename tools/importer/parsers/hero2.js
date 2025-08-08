/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Hero'];

  // --- IMAGE ROW ---
  // Find the seal/logo image
  let imageRowContent = null;
  const sealImg = element.querySelector('.tsg-rwd-site-state-seal img');
  if (sealImg) {
    imageRowContent = sealImg;
  }

  // --- CONTENT ROW ---
  // Get the site name (title), tagline (subheading), and possible CTA (not present here)
  const siteNameDiv = element.querySelector('.nameplate-website-name');
  const siteTaglineDiv = element.querySelector('.nameplate-website-tagline');

  // Prepare content cell: always reference existing elements
  const contentRowContent = document.createElement('div');

  // If there is a name, add as heading
  if (siteNameDiv) {
    // If the name is wrapped in an <a>, use the <a> for text, but add as H1 for the Hero style
    const siteNameLink = siteNameDiv.querySelector('a');
    if (siteNameLink) {
      const h1 = document.createElement('h1');
      h1.textContent = siteNameLink.textContent.trim();
      contentRowContent.appendChild(h1);
    } else if (siteNameDiv.textContent.trim()) {
      const h1 = document.createElement('h1');
      h1.textContent = siteNameDiv.textContent.trim();
      contentRowContent.appendChild(h1);
    }
  }
  // If there is a tagline, add as subheading (paragraph)
  if (siteTaglineDiv && siteTaglineDiv.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = siteTaglineDiv.textContent.trim();
    contentRowContent.appendChild(p);
  }

  // Compose the table rows as per block specification
  const rows = [
    headerRow,
    [imageRowContent || ''],
    [contentRowContent]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
