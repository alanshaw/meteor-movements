var fs = Npm.require("fs")

Meteor.startup(function () {

  Meteor.publish("positions", function () {
    return Positions.find()
  })

  var voyageData = null // The current data being looped through
    , voyageNextPosition = null // The current position that has been inserted into the collection

  function updatePositions () {

    Meteor.setTimeout(function () {

      // Run out of positions - start new voyage
      if (!voyageData || voyageNextPosition == voyageData.length) {
        Positions.remove({})

        voyageData = randomVoyage()
        voyageNextPosition = 0
      }

      continueVoyage()
      updatePositions()

    }, 2000 + Math.floor(Math.random()*8000))
  }

  function randomVoyage () {
    // TODO: Stat the dir so we can add more voyages without editing the code
    return JSON.parse(fs.readFileSync("server/voyage/"+Math.floor(Math.random()*5)+".json"))
  }

  function continueVoyage () {
    var pos = voyageData[voyageNextPosition]
    Positions.insert(pos)
    voyageNextPosition++
  }

  updatePositions()
})