/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must exactly match example
  const headerRow = ['Columns (columns4)'];
  // Get all direct <li> of the <ul> (they are the columns)
  const ul = element.querySelector('ul');
  let columnCells = [];
  if (ul) {
    const lis = ul.querySelectorAll(':scope > li');
    columnCells = Array.from(lis).map(li => {
      // Each li contains a <p><a>...</a></p> so we extract just the anchor element
      const a = li.querySelector('a');
      return a ? a : '';
    });
  }
  if (columnCells.length === 0) {
    columnCells = [''];
  }
  // Table: first row is the header, second is the columns (one per menu item, no list wrapping)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnCells
  ], document);
  element.replaceWith(table);
}
