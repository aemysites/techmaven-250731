/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we reference existing elements and retain all text content
  // The block name is 'Columns (columns4)' as a single-cell header
  const headerRow = ['Columns (columns4)'];

  // Find the menu container and all immediate li children
  const ul = element.querySelector('ul');
  let menuCells = [];
  if (ul) {
    const lis = ul.querySelectorAll(':scope > li');
    menuCells = Array.from(lis).map(li => {
      // Each cell contains the anchor only, preserve formatting and attributes
      const a = li.querySelector('a');
      return a ? a : '';
    });
  }
  // If list is empty, create an empty cell for layout integrity
  if (menuCells.length === 0) {
    menuCells = [''];
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    menuCells
  ], document);
  element.replaceWith(table);
}
