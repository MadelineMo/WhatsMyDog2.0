//load main app logic
import fetch from "node-fetch";
import fs from "fs";
function loadApp() {
  "use strict";

  async function query(filename) {
    const data = fs.readFileSync(filename);
    const response = await fetch(
     "",
        {
            headers: { Authorization: "Bearer "},
            method: "POST",
            body: data,
        }
    );
    const result = await response.json();
    return result;
  }
  
// load dog button
$("#loadDogBreed").click(function(event) {
  event.preventDefault();
  // load all business data...
  query("Basset.jpg").then((response) => {
    console.log(JSON.stringify(response));
  });
});

// Reset Button
$("#resetButton").click(function(event) {
  event.preventDefault();
  $('#results').empty();
});

};
$(document).ready(loadApp);
