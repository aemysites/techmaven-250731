/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with featureboxes which are the columns
  const parsys = element.querySelector('.tsg-rwd-content-page-parsys');
  let columns = [];
  if (parsys) {
    columns = Array.from(parsys.querySelectorAll(':scope > .featurebox'));
  }
  // Fallback: get all direct <div>s if no featureboxes found
  if (columns.length === 0) {
    columns = Array.from(element.querySelectorAll(':scope > div'));
  }
  if (columns.length > 0) {
    // The header row must be a SINGLE cell array
    const headerRow = ['Columns (columns5)'];
    // The columns (second row) is the array of featurebox divs
    const cells = [headerRow, columns];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
