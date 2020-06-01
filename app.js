var express = require('express');
var PDFDocument = require('pdfkit');
var fs = require('fs');
var doc = new PDFDocument;
var app = express();

app.post('/:filename/:nonprofitName/:address/:ein/:donor/:amount/', (req, res) => {
  var doc = new PDFDocument()
  let filename = req.params.filename;
  // Stripping special characters
  filename = encodeURIComponent(filename) + '.pdf'
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  let npName = req.params.nonprofitName;
  let donorName = req.params.donor;
  let amountDon = req.params.amount;
  let EinNumb = req.params.ein;
  let npAddress = req.params.address;
  let dateStamp = Date.now();
  doc.y = 300
  doc.text("Organization’s Name: " + npName, 50, 25)
  doc.text("Organization’s Address:" + npAddress, 50, 50)
  doc.text("Organization’s EIN: " + EinNumb, 50, 75)
  doc.text("Charitable Contribution Receipt", 250, 120)
  doc.text("Donor’s Name: " + donorName, 50, 175)
  doc.text("Card Donation Amount: $" + amountDon, 50, 200)
  doc.text("Date of Contribution: " + dateStamp, 50, 225)
  doc.text("This donation receipt is automated by WebPledge.org", 50, 275)
  doc.text("Thank you very much for your donation.", 50, 300)
  doc.text("Notice: No Goods Or Services Were Provided In Return For This Donation", 50, 325)
  doc.pipe(res) // sends file as response
  doc.end()
})


var server = app.listen(5000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
