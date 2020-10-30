var onRun = function (context) {
  var doc = context.document;
  var selection = context.selection;

  // Sets the line height as multiple of the font size (cmd l)

  var textLayers = [];

  if (selection.count() > 0) {

  	// Loop through selected layers
  	for (var i = 0; i < selection.count(); i++) {

  		var s = selection[i];

  		// Check if the layer is a text layer
  		if (s.className() == "MSTextLayer"){
  			textLayers.push(s);
  	  	}
  	}

  	if (textLayers.length > 0) {

  		// get first text layer
  		var firstTextLayer = textLayers[0];

  		// Calculate initial line height
  		var fontSize = firstTextLayer.fontSize();
  		var lineHeight = firstTextLayer.lineHeight();

      // Sketch returns 0 as a value when line height is set to "auto"
      if (!lineHeight) lineHeight = fontSize;

  		var multiple = (lineHeight / fontSize).toFixed(1);

  		// Show a dialog, asking for the line height multiple
  		var lineSpacing = parseFloat([doc askForUserInput:"Line height multiple" initialValue:multiple]);
			// Show a dialog, asking for how many decimals in the line height value
			var decimals = parseFloat([doc askForUserInput:"Round to this many decimals" initialValue:0]);

  		for (var j = 0; j < textLayers.length; j++) {

  			var textLayer = textLayers[j];

  			// Calculate the line height based on the font size and multiple
  			var fontSize = textLayer.fontSize();
  			var lineHeight = fontSize * lineSpacing;
  			textLayer.setLineHeight(lineHeight.toFixed(decimals));
  		}

			doc.showMessage("Assigned " + lineSpacing + " line height to " + textLayers.length + " layer[s] with " + decimals + " decimal[s].");

  	} else {
  		doc.showMessage("Please select a text layer.");
  	}
  } else {
  	doc.showMessage("Please select a text layer.")
  }

}
