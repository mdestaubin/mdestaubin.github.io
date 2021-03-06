// this table will contain the numbers and actual data
var table;
// var keyRow, metaRow;


// this is an array that will contain all the data in form of javascript objects
var states = [];




function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("data/ACS_15_5YR_S2401_with_ann_Clean.csv", "csv");
}

function setup() {  
   noCanvas();
   parseData();
   displayData();
}


function parseData(){
   //this is the key at the top, we will need it later
   var keyRow = table.getRow(0);
   var metaRow = table.getRow(1);

    // cycle through each item in that column, ignoring the first two items which are the headers
    for(var i=2;i<table.getRowCount(); i++){    

      //get each row for each id, hence the data for one state at a time
      var stateRow = table.getRow(i);

      // create an empty object for each state
      // we will attach all the information to this object
      var state = {};
      state.id = stateRow.getString(0);
      state.id2 = stateRow.getString(1);
      state.name = stateRow.getString(2);

      // this array will hold all occupation data
      state.occupations = [];
      
      for(var j=3; j<table.getColumnCount(); j++){
        // create an empty object that holds the occupation data for one category
        var item = {};
        item.label = metaRow.getString(j);
        item.key = keyRow.getString(j);
        item.value = stateRow.getNum(j);
        
        // attach the item object to the "occupation" array
        append(state.occupations, item);
      }
      // attach the state object to the "states" array
      append(states, state);
   }
}

// now we will display the data in html elements
function displayData(){
  // starting x and y posiition
  var xPos = 20;
  var yPos = 20;

  // creating headers
  var stateHeader = createDiv("State");
  stateHeader.position(xPos, yPos);
  var popHeader = createDiv("Population");
  popHeader.position(xPos + 200, yPos); 
  
  // setting the style
  stateHeader.style("font-weight", "bold");
  popHeader.style("font-weight", "bold");
  popHeader.style("width", "100px");
  popHeader.style("text-align", "right")
  yPos +=10;

  // go through all states
  for(var i =0; i<states.length; i++){
    // Display the state name
    var stateDiv = createDiv(states[i].name);
    stateDiv.position(xPos, yPos);

    // Display the population count (the first name in the array)
    var popDiv = createDiv(states[i].occupations[0].value);
    popDiv.position(xPos + 200, yPos);
    popDiv.style("width", "100px");
    popDiv.style("text-align", "right")
    yPos +=10;
  }
}