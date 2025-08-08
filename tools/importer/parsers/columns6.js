/* global WebImporter */
export default function parse(element, { document }) {
  // Get all the direct column divs
  const columns = Array.from(element.querySelectorAll(':scope > .tsg-rwd-main-footer-menu'));
  const colsRow = [];

  columns.forEach((col) => {
    // Check if this column is the social/legal one
    const socialFrame = col.querySelector('.tsg-rwd-footer-social-frame');
    if (socialFrame) {
      // For the third column, combine social and legal in a single cell
      const wrapper = document.createElement('div');
      // Social header
      const socialHeader = socialFrame.querySelector('h3');
      if (socialHeader) wrapper.appendChild(socialHeader);
      // Social icons
      const socialIcons = socialFrame.querySelector('.tsg-rwd-social-media-icons');
      if (socialIcons) wrapper.appendChild(socialIcons);
      // Legal
      const legalFrame = socialFrame.querySelector('.tsg-rwd-footer-legal-resources-frame');
      if (legalFrame) {
        const legalHeader = legalFrame.querySelector('h3');
        if (legalHeader) wrapper.appendChild(legalHeader);
        const legalList = legalFrame.querySelector('ul');
        if (legalList) wrapper.appendChild(legalList);
      }
      colsRow.push(wrapper);
    } else {
      // For the first two columns, just use the whole column div, preserving all headings and lists
      colsRow.push(col);
    }
  });

  // Correct header row: a single cell
  const tableRows = [
    ['Columns (columns6)'], // header row is a single cell
    colsRow // columns row, each column in a separate cell
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
