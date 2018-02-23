"use strict";

var tipiPizze = ["Margherita", "Diavola", "Peperoni"];
var costoPizze = [5.50, 8.00, 5.70];
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

  if(context == "ordine") {
    var _speech = req.body.result.fulfillment.speech;

    for(var i = 0; i < tipiPizze.length; i++) {
      _speech += " " + tipiPizze[i];

      if(i != tipiPizze.length - 1)
        _speech += ",";
    }

    _speech += ".";

    return res.json({
      speech: _speech,
      displayText: _speech,
      source: "webhook-echo-sample"
    });
  }

  if(context == "ordine-costo") {
    var nomePizza = req.body.result.parameters.nomePizza;
    var _speech = "Il costo della pizza e' di : ";
    var index = -1;

    for(var i = 0; i < tipiPizze.length; i++) {
      if(tipiPizze[i] == nomePizza)
      {
        index = i;
        _speech += " " + costoPizze[i];
      }
    }

    if(index == -1) {
      _speech = "Mh non abbiamo questo tipo di pizza, ecco la nostra lista : ";
      for(var i = 0; i < tipiPizze.length; i++) {
        _speech += " " + tipiPizze[i];
  
        if(i != tipiPizze.length - 1)
          _speech += ",";
      }

      _speech += ".";
    }


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
