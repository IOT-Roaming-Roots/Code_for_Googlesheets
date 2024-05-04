//This needs to be applied using the script editor tool within google spreadsheets in order to function. 


//Specifics on how to set this up can be found here. https://www.hackster.io/detox/transmit-esp8266-data-to-google-sheets-8fc617


//Code:
//-----------------------------------------------
//Originally published by Mogsdad@Stackoverflow
//Modified for The OPEnS Lab
//Modified by Thomas DeBell
//-----------------------------------------------
/*


GET request query:


https://script.google.com/macros/s/<gscript id>/exec?celData=data_here
----------------------------------------------------------------------


GScript, PushingBox and Arduino/ESP8266 Variables in order:


Variables for Evaporameter in order (Ethernet Shield) *Important Note* Variable name must match exactly to Ethenet sketch


IDtag
TimeStamp
TempC
Humid
LoadCell
IRLight
FullLight
BatVolt


----------------------------------------------------
*/




/* Using spreadsheet API */


function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters


  var result = 'Ok'; // assume success


  if (e.parameter == undefined) {
    result = 'No Parameters';
  }
  else {
    var id = '1D9rO6IeVTcPttW5sXHDQ1v6STKt9yli-9NiZaVActMc';//specific to the spreadsheet you are working on. this is id is found     //directly after "docs.google.com/spreadsheetURL/d" in the URL. 
   
   var sheet = SpreadsheetApp.openById(id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;
    var rowData = [];
    //var waktu = new Date();
    rowData[0] = new Date(); // Timestamp in column A
    
    for (var param in e.parameter) {
      Logger.log('In for loop, param='+param);
      var value = stripQuotes(e.parameter[param]);
      //Logger.log(param + ':' + e.parameter[param]);
      switch (param) {
        case 'IDtag': //Parameter
          rowData[1] = value; //Value in column B
          break;
        case 'TimeStamp':
          rowData[2] = value;
          break;
        case 'TempC':
          rowData[3] = value;
          break;
        /*case 'Humid':
          rowData[4] = value;
          break;
        case 'LoadCell':
          rowData[5] = value;
          break;
          case 'IRLight':
          rowData[6] = value;
          break;
          case 'FullLight':
          rowData[7] = value;
          break;
          case 'BatVolt':
          rowData[8] = value;
          break;
          */
        default:
          result = "unsupported parameter";
      }
    }
    Logger.log(JSON.stringify(rowData));


    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }


  // Return result of operation
  return ContentService.createTextOutput(result);
}


/**
* Remove leading and trailing single or double quotes
*/
function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}
