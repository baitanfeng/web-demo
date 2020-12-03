PDFJS.getDocument('./attachment.pdf')
  .then(function(pdf) {
    return pdf.getPage(1);
  })