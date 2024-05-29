const express = require('express')
const router = new express.Router()
const mongoose = require('mongoose');
const fs = require('fs')
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs')
const path = require('path')
const Events = require('../models/events')
// const  createObjectCsvWriter  = require('csv-writer');


// //**************************************All table Download******************************************//
// // Define the route for downloading data based on table name, date, and time
// router.post('/downloadData', async (req, res) => {
//   var { startDate, endDate, startTime, endTime, tableName,cameratype } = req.body;
//   console.log('Query Parameters:', req.body);

//   try {
//     if (
//       !['AnimalDetection', 'FireDetection', 'ObjectDetection', 'WSvehicleDetection', 'FogWarning', 'CameraTempering','Congestion', 'Overspeed', 'SpeedDrop','Tripwire','IllegalParking'].includes(
//         tableName
//       )
//     ) {
//       return res.status(400).json({ error: 'Invalid table name' });
//     }

//     let tableHeaders;

//     switch (tableName) {
//       case 'AnimalDetection':
//         tableHeaders = ['Date', 'Time', 'Camera Type', 'Location'];
//         break;
//       case 'FireDetection':
//         tableHeaders = ['Date', 'Time', 'Camera Type', 'Location'];
//         break;
//       case 'ObjectDetection':
//         tableHeaders = ['Date', 'Time', 'Object Type', 'Camera Type', 'Location'];
//         break;
//       case 'WSvehicleDetection':
//       case 'Overspeed': 
//       case 'SpeedDrop': 
//         tableHeaders = ['Date', 'Time', 'Vehicle Type', 'Camera Type', 'Location'];
//         break;
//       case 'FogWarning':
//         tableHeaders = ['Date', 'Time', 'Camera Type', 'Location'];
//         break;
//       case 'CameraTempering':
//       case 'Congestion':
//       case 'IllegalParking':    
//         tableHeaders = ['Event','Date', 'Time', 'Camera Type', 'Location'];
//         break;
//         case 'Tripwire':    
//         tableHeaders = ['Date', 'Time','Person Count','Camera Type', 'Location'];
//         break;    
//       default:
//         tableHeaders = [];
//     }

//     // Fetch data from MongoDB collections based on date, time, cameratype, and table name
//     let dataFromModel;
//     const Model = mongoose.model(tableName);
//     if (!cameratype) {
//       // If cameratype is not specified, fetch data for all cameratypes
//       dataFromModel = await Model.find({
//         date: { $gte: startDate, $lte: endDate },
//         time: { $gte: startTime, $lte: endTime },
//       });
//     } else {
//       dataFromModel = await Model.find({
//         date: { $gte: startDate, $lte: endDate },
//         time: { $gte: startTime, $lte: endTime },
//         cameratype: cameratype,
//       });
//     }
  
//     console.log('Data Retrieved:', dataFromModel);

//   // Check if no data is found
//   if (dataFromModel.length === 0) {
//     return res.status(404).json({ error: 'Data not found' });
//   }

//       // Generate PDF document
//       const pdfDoc = new PDFDocument();
//       pdfDoc.pipe(res);
  
//       // Define column widths and other formatting as needed
//       const columnWidths = [100, 100, 100, 150, 150, 100]; // Adjust the widths as needed for your columns
  
//       // Set initial position for the table
//       let positionX = 10;
//       let positionY = 100;
  
// // Function to add a logo to the PDF
// const addLogo = async () => {
//   try {
//     const logoPath = 'Images/Anemoi_Logo.png'; 
//     pdfDoc.image(logoPath, pdfDoc.page.width - 600, positionX, { width: 150, height: 50 });
//   } catch (err) {
//     console.error(err);
//   }
// };
 
// // Add the logo to the PDF
// await addLogo();

//  // Add the table name
//  pdfDoc.text(`Table Name: ${tableName}`, positionX, positionY);
//  positionY += 40;

//  // Get the current date and time
//  const currentDate = new Date().toLocaleDateString();
//  const currentTime = new Date().toLocaleTimeString();

//  // Add the current date and time
//  pdfDoc.text(`Date: ${currentDate}`, positionX, positionY);
//  positionY += 40;
//  pdfDoc.text(`Time: ${currentTime}`, positionX, positionY);
//  positionY += 40;

//  // Add a line separator
//  pdfDoc.moveTo(positionX, positionY).lineTo(pdfDoc.page.width - 10, positionY).stroke();
//  positionY += 20;


//       // Function to add a page with table headers and borders
//       const addPageWithHeadersAndBorders = () => {
//         pdfDoc.addPage();
//         positionY = 100;
//         for (let i = 0; i < tableHeaders.length; i++) {
//           pdfDoc.rect(positionX, positionY, columnWidths[i], 40); // Assuming cell height is 20
//           pdfDoc.stroke();
//           pdfDoc.text(tableHeaders[i], positionX + 5, positionY + 15, { width: columnWidths[i], align: 'center', valign: 'center' });
//           positionX += columnWidths[i];
//         }
//         positionY += 40;
//       };
  
  
//     // Add the first page with headers and borders
//       addPageWithHeadersAndBorders();
    
  
//      // Define a function to add rows to the table with square borders
//     const addRowToTable = (row) => {
//       positionX = 10;
//       for (let i = 0; i < row.length; i++) {
//         const cellText = row[i];
//         const cellWidth = columnWidths[i];

//         // Draw square border around the cell
//         pdfDoc.rect(positionX, positionY, cellWidth, 40);
//         pdfDoc.stroke();

//         // Calculate the position for text vertically and horizontally centered within the cell
//         const textX = positionX + 10; // Leave some padding
//         const textY = positionY + 10; // Leave some padding

//         // Calculate the available width for text in the cell
//         const availableWidth = cellWidth - 20; // Adjust for padding

//         // Wrap and add the cell text to fit within the available width, centering it
//         pdfDoc.text(cellText, textX, textY, { width: availableWidth, align: 'center', valign: 'center' });

//         positionX += cellWidth;
//       }
//       positionY += 40;

//       // Check if the page is full and add a new page without headers if needed
//       if (positionY > pdfDoc.page.height - 100) {
//         addPageWithoutHeaders();
//       }
//     };

//     // Function to add a page without headers and borders
//     const addPageWithoutHeaders = () => {
//       pdfDoc.addPage();
//       positionY = 100;
//     };

//     // Process and add each row of data
//   dataFromModel.forEach((item) => {
//     // let row = [];
//     let rowMapping = {};
//     switch (tableName) {
//       case 'AnimalDetection':
//       case 'FireDetection':
//       case 'FogWarning':
//       case 'CameraTempering':
//       case 'Congestion':
//       case 'IllegalParking':   
//         rowMapping = [
//           item.date || '',
//           item.time || '',
//           item.cameratype || '',
//           item.location || '',
//         ];
//         break;
//       case 'ObjectDetection':
      
//         rowMapping = [
//           item.date || '',
//           item.time || '',
//           item.objecttype || '',
//           item.cameratype || '',
//           item.location || '',
//         ];
//         break;
//       case 'WSvehicleDetection':
//       case 'Overspeed': 
//       case 'SpeedDrop': 
//         rowMapping = [
//           item.date || '',
//           item.time || '',
//           item.vehicletype || '',
//           item.cameratype || '',
//           item.location || ''
//         ];
//         break;
//         case 'Tripwire':  
//         rowMapping = [
//           item.date || '',
//           item.time || '',
//           item.personCount || '',
//           item.cameratype || '',
//           item.location || ''
//         ];  
//     }
//     addRowToTable(rowMapping);
//   });
  
  
//   // Set response headers for PDF download
// res.setHeader('Content-Disposition', `attachment; filename=${tableName}_data.pdf`);
// res.setHeader('Content-Type', 'application/pdf');

//       // End the PDF stream and send it as a response
//       pdfDoc.end();
//     } catch (err) {
//       console.error('Error:', err);
//       console.error(err);
//       res.status(500).json({ error: 'An error occurred while generating the PDF' });
//     }
//   });

    
  
// //***********************************Download CSV file******************************************** */
// router.post('/downloadCSV', async (req, res) => {
//   const { tableName, startDate, endDate, startTime, endTime, cameratype } = req.body;
  
//   try {
//       if (!['AnimalDetection', 'FireDetection', 'ObjectDetection', 'WSvehicleDetection', 'FogWarning', 'CameraTempering', 'Congestion', 'Overspeed', 'SpeedDrop','Tripwire','IllegalParking'].includes(tableName)) {
//           return res.status(400).json({ error: 'Invalid table name' });
//       }

//       // Fetch data from the specified MongoDB collection based on date, time, and cameratype criteria
//       const Model = mongoose.model(tableName);
//       const query = {
//           date: { $gte: startDate, $lte: endDate },
//           time: { $gte: startTime, $lte: endTime },
//       };

//       // Add cameratype to the query if it's provided
//       if (cameratype) {
//           query.cameratype = cameratype;
//       }

//       const data = await Model.find(query).lean().exec();

//       // Define CSV fields based on the table
//       let csvFields;
//       switch (tableName) {
//           case 'AnimalDetection':
//           case 'FireDetection':
//           case 'FogWarning':
//               csvFields = ['date', 'time', 'cameratype', 'location'];
//               break;
//           case 'ObjectDetection':
//               csvFields = ['date', 'time', 'objecttype', 'cameratype', 'location'];
//               break;
//           case 'WSvehicleDetection':
//           case 'Overspeed':
//             case 'SpeedDrop':
//               csvFields = ['date', 'time', 'vehicletype', 'cameratype', 'location'];
//               break;
//           case 'CameraTempering':
//           case 'Congestion':
//           case 'IllegalParking':
//               csvFields = ['event', 'date', 'time', 'cameratype', 'location'];
//               break;
//           case 'Tripwire':    
//           csvFields = ['date', 'time','pesronCount','cameratype', 'location'];
//               break;    
//           default:
//               csvFields = [];
//       }

//       // Create a CSV string
//       let csvString = csvFields.join(',') + '\n';

//       data.forEach((record) => {
//           const row = csvFields.map((field) => record[field]).join(',');
//           csvString += row + '\n';
//       });

//       // Set response headers for CSV download
//       res.setHeader('Content-Disposition', `attachment; filename=${tableName}_data.csv`);
//       res.setHeader('Content-Type', 'text/csv');

//       // Send the CSV string as the response
//       res.send(csvString);

//       console.log(`CSV data for ${tableName} sent to the client for download`);
//   } catch (error) {
//       console.error('Error exporting data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });


  
// //************************************Download Excel file*******************************************/  
// router.post('/downloadExcel', async (req, res) => {
//   var { tableName, startDate, endDate, startTime, endTime, cameratype } = req.body;
//   console.log('Query Parameters:', req.body);

//   try {
//       if (!['AnimalDetection', 'FireDetection', 'ObjectDetection', 'WSvehicleDetection', 'FogWarning', 'CameraTempering', 'Congestion','Overspeed', 'SpeedDrop','Tripwire','IllegalParking'].includes(tableName)) {
//           return res.status(400).json({ error: 'Invalid table name' });
//       }

//     // Fetch data from the specified MongoDB collection based on date, time, and cameratype criteria
//     const Model = mongoose.model(tableName);
//     const query = {
//         date: { $gte: startDate, $lte: endDate },
//         time: { $gte: startTime, $lte: endTime },
//     };

//     // Add cameratype to the query if it's provided
//     if (cameratype) {
//         query.cameratype = cameratype;
//     }

//     const data = await Model
//         .find(query)
//         .lean()
//         .exec();

//       // Create a new Excel workbook and worksheet
//       const workbook = new ExcelJS.Workbook();
//       const worksheet = workbook.addWorksheet('Data');

//       // Define Excel headers based on the table
//       let excelHeaders;
//       switch (tableName) {
//           case 'AnimalDetection':
//           case 'FireDetection':
//           case 'FogWarning':
//               excelHeaders = ['Date', 'Time', 'CameraType', 'Location'];
//               break;
//           case 'ObjectDetection':
//               excelHeaders = ['Date', 'Time', 'ObjectType', 'CameraType', 'Location'];
//               break;
//           case 'WSvehicleDetection':
//           case 'Overspeed':
//             case 'SpeedDrop':  
//               excelHeaders = ['Date', 'Time', 'VehicleType', 'CameraType', 'Location'];
//               break;
//           case 'CameraTempering':
//           case 'Congestion':
//           case 'IllegalParking':    
//               excelHeaders = [ 'date', 'time', 'cameratype', 'location'];
//               break;
//           case 'Tripwire':    
//           excelHeaders = ['date', 'time','pesronCount','cameratype', 'location'];
//               break;        
//           default:
//               excelHeaders = [];
//       }

//       // Add headers to the worksheet
//       worksheet.addRow(excelHeaders);

//       // Add data rows to the worksheet
//       data.forEach((record) => {
//           const rowData = excelHeaders.map((header) => record[header.toLowerCase()]);
//           worksheet.addRow(rowData);
//       });

//       // Set response headers for Excel download
//       res.setHeader('Content-Disposition', `attachment; filename=${tableName}_data.xlsx`);
//       res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

//       // Stream the Excel workbook to the response
//       await workbook.xlsx.write(res);

//       console.log(`Excel data for ${tableName} sent to the client for download`);
//   } catch (error) {
//       console.error('Error exporting data: ' + error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// }); 
  

// Define the route for downloading data based on table name, date, and time


router.post('/downloadData', async (req, res) => {
  var { startDate, endDate, startTime, endTime, event,cameratype } = req.body;
  console.log('Query Parameters:', req.body);

  try {
    // Dynamically fetch valid table names from MongoDB collections
    const validTableNames = await getValidTableNamesFromDatabase();

    if (!validTableNames.includes(event)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }
    

    let tableHeaders;

    switch (event) {
      case 'AnimalDetection':
      case 'FogDetection':
      case 'CameraTampering':
      case 'CongestionDetected':
      case 'IlligalParking':
      case 'Tripwire': 
      case 'Personcross':
      case 'FireDetection':
        tableHeaders = ['Date', 'Time', 'Camera Type', 'Location'];
        break;
      case 'ObjectDetection':
        tableHeaders = ['Date', 'Time', 'Object Type', 'Camera Type', 'Location'];
        break;
      case 'WrongSide':
      case 'Over Speed': 
      case 'SpeedDrop': 
        tableHeaders = ['Date', 'Time', 'Vehicle Type', 'Camera Type', 'Location'];
        break;  
      default:
        tableHeaders = [];
    }

    // Fetch data from MongoDB collections based on date, time, cameratype, and table name
    let dataFromModel;
    const Model = mongoose.model('Events');
    if (!cameratype) {
      // If cameratype is not specified, fetch data for all cameratypes
      dataFromModel = await Model.find({
        date: { $gte: startDate, $lte: endDate },
        time: { $gte: startTime, $lte: endTime },
      });
    } else {
      dataFromModel = await Model.find({
        date: { $gte: startDate, $lte: endDate },
        time: { $gte: startTime, $lte: endTime },
        cameratype: cameratype,
        event:event
      });
    }
  
    console.log('Data Retrieved:', dataFromModel);

  // Check if no data is found
  if (dataFromModel.length === 0) {
    return res.status(200).json( 'Data not found' );
  }

      // Generate PDF document
      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(res);
  
      // Define column widths and other formatting as needed
      const columnWidths = [100, 100, 100, 150, 150, 100]; // Adjust the widths as needed for your columns
  
      // Set initial position for the table
      let positionX = 10;
      let positionY = 100;
  
// Function to add a logo to the PDF
const addLogo = async () => {
  try {
    const logoPath = 'Images/Anemoi_Logo.png'; 
    pdfDoc.image(logoPath, pdfDoc.page.width - 600, positionX, { width: 150, height: 50 });
  } catch (err) {
    console.error(err);
  }
};

 
// Add the logo to the PDF
await addLogo();

 // Add the table name
 pdfDoc.text(`Table Name: ${event}`, positionX, positionY);
 positionY += 40;

 // Get the current date and time
 const currentDate = new Date().toLocaleDateString();
 const currentTime = new Date().toLocaleTimeString();

 // Add the current date and time
 pdfDoc.text(`Date: ${currentDate}`, positionX, positionY);
 positionY += 40;
 pdfDoc.text(`Time: ${currentTime}`, positionX, positionY);
 positionY += 40;

 // Add a line separator
 pdfDoc.moveTo(positionX, positionY).lineTo(pdfDoc.page.width - 10, positionY).stroke();
 positionY += 20;


      // Function to add a page with table headers and borders
const addPageWithHeadersAndBorders = () => {
  pdfDoc.addPage();
  positionY = 100;
  let currentX = positionX; // Introduce a new variable to track the current X position

  for (let i = 0; i < tableHeaders.length; i++) {
    pdfDoc.rect(currentX, positionY, columnWidths[i], 40); // Assuming cell height is 20
    pdfDoc.stroke();
    pdfDoc.text(tableHeaders[i], currentX + 5, positionY + 15, {
      width: columnWidths[i],
      align: 'center',
      valign: 'center',
    });
    currentX += columnWidths[i];
  }
  positionY += 40;
};
  
  
    // Add the first page with headers and borders
      addPageWithHeadersAndBorders();
    
  
     // Define a function to add rows to the table with square borders
    const addRowToTable = (row) => {
      positionX = 10;
      for (let i = 0; i < row.length; i++) {
        const cellText = row[i];
        const cellWidth = columnWidths[i];

        // Draw square border around the cell
        pdfDoc.rect(positionX, positionY, cellWidth, 40);
        pdfDoc.stroke();

        // Calculate the position for text vertically and horizontally centered within the cell
        const textX = positionX + 10; // Leave some padding
        const textY = positionY + 10; // Leave some padding

        // Calculate the available width for text in the cell
        const availableWidth = cellWidth - 20; // Adjust for padding

        // Wrap and add the cell text to fit within the available width, centering it
        pdfDoc.text(cellText, textX, textY, { width: availableWidth, align: 'center', valign: 'center' });

        positionX += cellWidth;
      }
      positionY += 40;

      // Check if the page is full and add a new page without headers if needed
      if (positionY > pdfDoc.page.height - 100) {
        addPageWithoutHeaders();
      }
    };

    // Function to add a page without headers and borders
const addPageWithoutHeaders = () => {
  pdfDoc.addPage();
  if (positionY !== 100) {
    positionY = 100;
  }
};


    // Process and add each row of data
  dataFromModel.forEach((item) => {
    // let row = [];
    let rowMapping = {};
    switch (event) {
      case 'AnimalDetection':
      case 'FireDetection':
      case 'FogDetection':
      case 'CameraTampering':
      case 'CongestionDetected':
      case 'IlligalParking':
      case 'Tripwire':
      case 'Personcross':     
        rowMapping = [
          item.date || '',
          item.time || '',
          item.cameratype || '',
          item.location || '',
        ];
        break;
      case 'ObjectDetection':
      
        rowMapping = [
          item.date || '',
          item.time || '',
          item.objecttype || '',
          item.cameratype || '',
          item.location || '',
        ];
        break;
      case 'WrongSide':
      case 'OverSpeed': 
      case 'SpeedDrop': 
        rowMapping = [
          item.date || '',
          item.time || '',
          item.vehicletype || '',
          item.cameratype || '',
          item.location || ''
        ];
    }
    addRowToTable(rowMapping);
  });
  
  
  // Set response headers for PDF download
res.setHeader('Content-Disposition', `attachment; filename=${event}_data.pdf`);
res.setHeader('Content-Type', 'application/pdf');

      // End the PDF stream and send it as a response
      pdfDoc.end();
    } catch (err) {
      console.error('Error:', err);
      console.error(err);
      res.status(500).json({ error: 'An error occurred while generating the PDF' });
    }
  });
// Function to dynamically fetch valid table names from MongoDB collections
async function getValidTableNamesFromDatabase() {
  try {
    const Model = mongoose.model('Events');
    const distinctEvents = await Model.distinct('event');

    return distinctEvents;
  } catch (error) {
    console.error('Error fetching valid table names:', error);
    throw error;
  }
}
    
  
//***********************************Download CSV file******************************************** */
router.post('/downloadCSV', async (req, res) => {
  const { event, startDate, endDate, startTime, endTime, cameratype } = req.body;
  
  try {
      if (!['AnimalDetection','FireDetection','ObjectDetection','WrongSide','FogDetection','CameraTampering','CongestionDetected','OverSpeed','SpeedDrop','Tripwire','IlligalParking','Personcross'].includes(event)) {
          return res.status(400).json({ error: 'Invalid table name' });
      }

      // Fetch data from MongoDB collections based on date, time, cameratype, and event name
let dataFromModel;
const Model = mongoose.model('Events'); // Corrected model declaration
const query = {
  date: { $gte: startDate, $lte: endDate },
  time: { $gte: startTime, $lte: endTime },
  event: event, // Include event name in the query
};

// Add cameratype to the query if it's provided
if (cameratype) {
  query.cameratype = cameratype;
}

const data = await Model.find(query).lean().exec();


      // Define CSV fields based on the table
      let csvFields;
      switch (event) {
        case 'AnimalDetection':
          case 'FogDetection':
          case 'CameraTampering':
          case 'CongestionDetected':
          case 'IlligalParking':
          case 'Tripwire': 
          case 'Personcross':
          case 'FireDetection':
            csvFields = ['date', 'time', 'cameratype', 'location'];
            break;
          case 'ObjectDetection':
            csvFields = ['date', 'time', 'objecttype', 'cameratype', 'location'];
            break;
          case 'WrongSide':
          case 'OverSpeed': 
          case 'SpeedDrop': 
          csvFields = ['date', 'time', 'vehicletype', 'cameratype', 'location'];
            break;  
          default:
              csvFields = [];
      }

      // Create a CSV string
      let csvString = csvFields.join(',') + '\n';

      data.forEach((record) => {
          const row = csvFields.map((field) => record[field]).join(',');
          csvString += row + '\n';
      });

      // Set response headers for CSV download
      res.setHeader('Content-Disposition', `attachment; filename=${event}_data.csv`);
      res.setHeader('Content-Type', 'text/csv');

      // Send the CSV string as the response
      res.send(csvString);

      console.log(`CSV data for ${event} sent to the client for download`);
  } catch (error) {
      console.error('Error exporting data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/downloadExcel', async (req, res) => {
  var { event, startDate, endDate, startTime, endTime, cameratype } = req.body;
  console.log('Query Parameters:', req.body);

  try {
      if (!['AnimalDetection','FireDetection','ObjectDetection','WrongSide','FogDetection','CameraTampering','CongestionDetected','OverSpeed','SpeedDrop','Tripwire','IlligalParking','Personcross'].includes(event)) {
          return res.status(400).json({ error: 'Invalid table name' });
      }

    // Fetch data from the specified MongoDB collection based on date, time, and cameratype criteria
    const Model = mongoose.model('Events');
    const query = {
        date: { $gte: startDate, $lte: endDate },
        time: { $gte: startTime, $lte: endTime },
    };

    // Add cameratype to the query if it's provided
    if (cameratype) {
        query.cameratype = cameratype;
        query.event = event;
    }

    const data = await Model
        .find(query)
        .lean()
        .exec();

      // Create a new Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');

      // Define Excel headers based on the table
      let excelHeaders;
      switch (event) {
        case 'AnimalDetection':
          case 'FogDetection':
          case 'CameraTampering':
          case 'CongestionDetected':
          case 'IlligalParking':
          case 'Tripwire': 
          case 'Personcross':
          case 'FireDetection':
            excelHeaders = ['Date', 'Time', 'Camera Type', 'Location'];
            break;
          case 'ObjectDetection':
            excelHeaders = ['Date', 'Time', 'Object Type', 'Camera Type', 'Location'];
            break;
          case 'WrongSide':
          case 'OverSpeed': 
          case 'SpeedDrop': 
          excelHeaders = ['Date', 'Time', 'Vehicle Type', 'Camera Type', 'Location'];
            break;  
          default:
              excelHeaders = [];
      }

      // Add headers to the worksheet
      worksheet.addRow(excelHeaders);

      // Add data rows to the worksheet
      data.forEach((record) => {
          const rowData = excelHeaders.map((header) => record[header.toLowerCase()]);
          worksheet.addRow(rowData);
      });

      // Set response headers for Excel download
      res.setHeader('Content-Disposition', `attachment; filename=${event}_data.xlsx`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      // Stream the Excel workbook to the response
      await workbook.xlsx.write(res);

      console.log(`Excel data for ${event} sent to the client for download`);
  } catch (error) {
      console.error('Error exporting data: ' + error);
      res.status(500).json({ error: 'Internal server error' });
  }
}); 

//--------------------------------------------get api to download pdf , csv and Excel-------------------------------------------------------//

// Define the route for downloading data based on table name, date, and time
router.get('/downloadData', async (req, res) => {
  var { startDate, endDate, startTime, endTime, event,cameratype } = req.query;
  console.log('Query Parameters:', req.query);

  try {
    if (
      !['Animal_Detection', 'Fire_Detection', 'Object_Detection', 'Wrong_Side', 'Fog_Detection', 'Camera_Tampering','Congestion_Detected', 'Over_Speed', 'Speed_Drop','Tripwire','Illegal_Parking','Personcross'].includes(
        event
      )
    ) {
      return res.status(400).json({ error: 'Invalid table name' });
    }
    

    let tableHeaders;

    switch (event) {
      case 'Animal_Detection':
      case 'Fog_Detection':
      case 'Camera_Tampering':
      case 'Congestion_Detected':
      case 'Illegal_Parking':
      case 'Tripwire': 
      case 'Personcross':
      case 'Fire_Detection':
        tableHeaders = ['Date', 'Time', 'Camera Type', 'Location'];
        break;
      case 'Object_Detection':
        tableHeaders = ['Date', 'Time', 'Object Type', 'Camera Type', 'Location'];
        break;
      case 'Wrong_Side':
      case 'Over_Speed': 
      case 'Speed_Drop': 
        tableHeaders = ['Date', 'Time', 'Vehicle Type', 'Camera Type', 'Location'];
        break;  
      default:
        tableHeaders = [];
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
const endDateTime = new Date(`${endDate}T${endTime}`);

// Fetch data from MongoDB collections based on date, time, cameratype, and table name
let dataFromModel;
const Model = mongoose.model('Events');

const query = {
  date: {
    $gte: startDate,
    $lte: endDate,
  },
  $or: [
    {
      date: startDate,
      time: { $gte: startTime },
    },
    {
      date: endDate,
      time: { $lte: endTime },
    },
    {
      date: { $gt: startDate, $lt: endDate },
    },
  ],
  event: event,
};

if (cameratype!=='All camera') {
  query.cameratype = cameratype;
}

dataFromModel = await Model.find(query);

console.log('Data Retrieved:', dataFromModel);

  // Check if no data is found
  if (dataFromModel.length === 0) {
    return res.status(200).json( 'Data not found' );
  }

      // Generate PDF document
      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(res);
  
      // Define column widths and other formatting as needed
      const columnWidths = [100, 100, 100, 150, 150, 100]; // Adjust the widths as needed for your columns
  
      // Set initial position for the table
      let positionX = 10;
      let positionY = 100;
  
// Function to add a logo to the PDF
const addLogo = async () => {
  try {
    const logoPath = 'Images/Anemoi_Logo.png'; 
    pdfDoc.image(logoPath, pdfDoc.page.width - 600, positionX, { width: 150, height: 50 });
  } catch (err) {
    console.error(err);
  }
};

 
// Add the logo to the PDF
await addLogo();

 // Add the table name
 pdfDoc.text(`Table Name: ${event}`, positionX, positionY);
 positionY += 40;

 // Get the current date and time
 const currentDate = new Date().toLocaleDateString();
 const currentTime = new Date().toLocaleTimeString();

 // Add the current date and time
 pdfDoc.text(`Date: ${currentDate}`, positionX, positionY);
 positionY += 40;
 pdfDoc.text(`Time: ${currentTime}`, positionX, positionY);
 positionY += 40;

 // Add a line separator
 pdfDoc.moveTo(positionX, positionY).lineTo(pdfDoc.page.width - 10, positionY).stroke();
 positionY += 20;


      // Function to add a page with table headers and borders
      const addPageWithHeadersAndBorders = () => {
        pdfDoc.addPage();
        positionY = 100;
        for (let i = 0; i < tableHeaders.length; i++) {
          pdfDoc.rect(positionX, positionY, columnWidths[i], 40); // Assuming cell height is 20
          pdfDoc.stroke();
          pdfDoc.text(tableHeaders[i], positionX + 5, positionY + 15, { width: columnWidths[i], align: 'center', valign: 'center' });
          positionX += columnWidths[i];
        }
        positionY += 40;
      };
  
  
    // Add the first page with headers and borders
      addPageWithHeadersAndBorders();
    
  
     // Define a function to add rows to the table with square borders
    const addRowToTable = (row) => {
      positionX = 10;
      for (let i = 0; i < row.length; i++) {
        const cellText = row[i];
        const cellWidth = columnWidths[i];

        // Draw square border around the cell
        pdfDoc.rect(positionX, positionY, cellWidth, 40);
        pdfDoc.stroke();

        // Calculate the position for text vertically and horizontally centered within the cell
        const textX = positionX + 10; // Leave some padding
        const textY = positionY + 10; // Leave some padding

        // Calculate the available width for text in the cell
        const availableWidth = cellWidth - 20; // Adjust for padding

        // Wrap and add the cell text to fit within the available width, centering it
        pdfDoc.text(cellText, textX, textY, { width: availableWidth, align: 'center', valign: 'center' });

        positionX += cellWidth;
      }
      positionY += 40;

      // Check if the page is full and add a new page without headers if needed
      if (positionY > pdfDoc.page.height - 100) {
        addPageWithoutHeaders();
      }
    };

    // Function to add a page without headers and borders
const addPageWithoutHeaders = () => {
  pdfDoc.addPage();
  if (positionY !== 100) {
    positionY = 100;
  }
};


    // Process and add each row of data
  dataFromModel.forEach((item) => {
    // let row = [];
    let rowMapping = {};
    switch (event) {
      case 'Animal_Detection':
      case 'Fire_Detection':
      case 'Fog_Detection':
      case 'Camera_Tampering':
      case 'Congestion_Detected':
      case 'Illegal_Parking':
      case 'Tripwire':
      case 'Personcross':
      case 'Over_Speed': 
      case 'Speed_Drop':     
        rowMapping = [
          item.date || '',
          item.time || '',
          item.cameratype || '',
          item.location || '',
        ];
        break;
      case 'Object_Detection':
      
        rowMapping = [
          item.date || '',
          item.time || '',
          item.objecttype || '',
          item.cameratype || '',
          item.location || '',
        ];
        break;
      case 'Wrong_Side': 
        rowMapping = [
          item.date || '',
          item.time || '',
          item.vehicletype || '',
          item.cameratype || '',
          item.location || ''
        ];
    }
    addRowToTable(rowMapping);
  });
  
  
  // Set response headers for PDF download
res.setHeader('Content-Disposition', `attachment; filename=${event}_data.pdf`);
res.setHeader('Content-Type', 'application/pdf');

      // End the PDF stream and send it as a response
      pdfDoc.end();
    } catch (err) {
      console.error('Error:', err);
      console.error(err);
      res.status(500).json({ error: 'An error occurred while generating the PDF' });
    }
  });
 
  
//***********************************Download CSV file******************************************** */
router.get('/downloadCSV', async (req, res) => {
  const { event, startDate, endDate, startTime, endTime, cameratype } = req.query;
  
  try {
      if (!['Animal_Detection', 'Fire_Detection', 'Object_Detection', 'Wrong_Side', 'Fog_Detection', 'Camera_Tampering','Congestion_Detected', 'Over_Speed', 'Speed_Drop','Tripwire','Illegal_Parking','Personcross'].includes(event)) {
          return res.status(400).json({ error: 'Invalid table name' });
      }

      // Fetch data from MongoDB collections based on date, time, cameratype, and event name
let dataFromModel;
const Model = mongoose.model('Events'); // Corrected model declaration
const query = {
  date: {
    $gte: startDate,
    $lte: endDate,
  },
  $or: [
    {
      date: startDate,
      time: { $gte: startTime },
    },
    {
      date: endDate,
      time: { $lte: endTime },
    },
    {
      date: { $gt: startDate, $lt: endDate },
    },
  ],
  event: event,
};

if (cameratype!=='All camera') {
  query.cameratype = cameratype;
}


const data = await Model.find(query).lean().exec();


      // Define CSV fields based on the table
      let csvFields;
      switch (event) {
        case 'Animal_Detection':
          case 'Fog_Detection':
          case 'Camera_Tampering':
          case 'Congestion_Detected':
          case 'Illegal_Parking':
          case 'Tripwire': 
          case 'Personcross':
          case 'Fire_Detection':
          case 'Over_Speed': 
          case 'Speed_Drop':
            csvFields = ['date', 'time', 'cameratype', 'location'];
            break;
          case 'Object_Detection':
            csvFields = ['date', 'time', 'cameratype', 'location'];
            break;
          case 'Wrong_Side':          
          csvFields = ['date', 'time','vehicletype', 'cameratype', 'location'];
            break;  
          default:
              csvFields = [];
      }

      // Create a CSV string
      let csvString = csvFields.join(',') + '\n';

      data.forEach((record) => {
          const row = csvFields.map((field) => record[field]).join(',');
          csvString += row + '\n';
      });

      // Set response headers for CSV download
      res.setHeader('Content-Disposition', `attachment; filename=${event}_data.csv`);
      res.setHeader('Content-Type', 'text/csv');

      // Send the CSV string as the response
      res.send(csvString);

      console.log(`CSV data for ${event} sent to the client for download`);
  } catch (error) {
      console.error('Error exporting data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/downloadExcel', async (req, res) => {
  var { event, startDate, endDate, startTime, endTime, cameratype } = req.query;
  console.log('Query Parameters:', req.query);

  try {
      if (!['Animal_Detection', 'Fire_Detection', 'Object_Detection', 'Wrong_Side', 'Fog_Detection', 'Camera_Tampering','Congestion_Detected', 'Over_Speed', 'Speed_Drop','Tripwire','Illegal_Parking','Personcross'].includes(event)) {
          return res.status(400).json({ error: 'Invalid table name' });
      }

    // Fetch data from the specified MongoDB collection based on date, time, and cameratype criteria
    let dataFromModel;
const Model = mongoose.model('Events'); // Corrected model declaration
const query = {
  date: {
    $gte: startDate,
    $lte: endDate,
  },
  $or: [
    {
      date: startDate,
      time: { $gte: startTime },
    },
    {
      date: endDate,
      time: { $lte: endTime },
    },
    {
      date: { $gt: startDate, $lt: endDate },
    },
  ],
  event: event,
};

if (cameratype!=='All camera') {
  query.cameratype = cameratype;
}


const data = await Model.find(query).lean().exec();


        console.log("all excel data: ",data);
      // Create a new Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');

      // Define Excel headers based on the table
      let excelHeaders;
      switch (event) {
        case 'Animal_Detection':
          case 'Fog_Detection':
          case 'Camera_Tampering':
          case 'Congestion_Detected':
          case 'Illegal_Parking':
          case 'Tripwire': 
          case 'Personcross':
          case 'Fire_Detection':
          case 'Over_Speed': 
          case 'Speed_Drop':
            excelHeaders = ['Date', 'Time', 'CameraType', 'Location'];
            break;
          case 'Object_Detection':
            excelHeaders = ['Date', 'Time', 'CameraType', 'Location'];
            break;
          case 'Wrong_Side':
          excelHeaders = ['Date', 'Time','VehicleType', 'CameraType', 'Location'];
            break;  
          default:
              excelHeaders = [];
      }

      // Add headers to the worksheet
      worksheet.addRow(excelHeaders);

      // Add data rows to the worksheet
      data.forEach((record) => {
        console.log("record: ",record);
          const rowData = excelHeaders.map((header) => record[header.toLowerCase()]);
          console.log("rowData: ",rowData);
          worksheet.addRow(rowData);
      });

      // Set response headers for Excel download
      res.setHeader('Content-Disposition', `attachment; filename=${event}_data.xlsx`);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      // Stream the Excel workbook to the response
      await workbook.xlsx.write(res);

      console.log(`Excel data for ${event} sent to the client for download`);
  } catch (error) {
      console.error('Error exporting data: ' + error);
      res.status(500).json({ error: 'Internal server error' });
  }
}); 

module.exports = router


