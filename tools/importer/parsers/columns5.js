/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER: Matches EXACTLY as in the example
  const headerRow = ['Columns (columns5)'];

  // Extract the columns from the correct part of the source html
  // Find the main columns area: .featurebox elements inside .tsg-rwd-content-page-parsys
  const parsys = element.querySelector('.tsg-rwd-content-page-parsys');
  let columnEls = [];
  if (parsys) {
    columnEls = Array.from(parsys.querySelectorAll(':scope > .featurebox'));
  }

  // If no columns found, do nothing
  if (columnEls.length === 0) return;

  // For each column: extract ALL visible content preserving semantic HTML
  // Each .featurebox contains a heading and a caption table
  const contentRow = columnEls.map((featurebox) => {
    const cellContent = [];
    // Heading (h3)
    const heading = featurebox.querySelector('h3');
    if (heading) cellContent.push(heading);
    // Caption content: table with image/text
    const caption = featurebox.querySelector('.tsg-rwd-featurebox-caption');
    if (caption) {
      // Instead of pushing the whole caption, push its children (table)
      // This ensures all text and images are included and keeps semantic structure
      Array.from(caption.children).forEach(child => cellContent.push(child));
    }
    // Make sure that if no heading/caption, we still include whatever is present
    if (cellContent.length === 0) {
      Array.from(featurebox.children).forEach(child => cellContent.push(child));
    }
    return cellContent;
  });

  // Only create table if the second row has actual cells
  if (contentRow.length > 0) {
    const cells = [headerRow, contentRow];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}
