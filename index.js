"use strict";

var tipiPizze = ["Margherita", "Diavola", "Peperoni"];
const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var context = req.body.result.contexts[0].name;
  var _speech = req.body.result.fulfillment.speech;

  if(context == "ordine") {
    for(var i = 0; i < tipiPizze.length; i++) {
      _speech += " " + tipiPizze[i] + ",";
    }

    _speech += ".";

    return res.json({
      speech: _speech,
      displayText: _speech,
      source: "webhook-echo-sample"
    });
  }

  return res.json({
    speech: "error",
    displayText: "error",
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
