Meteor.startup(function () {

  Meteor.publish("positions", function () {
    return Positions.find()
  })

  // Add to the positions collection every 2-8 seconds
  !function scheduleContinueVoyage () {
    Meteor.setTimeout(function () {
      continueVoyage()
      scheduleContinueVoyage()
    }, 2000 + Math.floor(Math.random()*8000))
  }()

  var voyageData = null // The current data being looped through
    , voyageNextPosition = null // The index of the next position to be inserted

  function continueVoyage () {
    // Run out of positions - start new voyage
    if (!voyageData || voyageNextPosition == voyageData.length) {
      Positions.remove({})

      var next = Voyages.indexOf(voyageData) + 1

      voyageData = Voyages[next == Voyages.length ? 0 : next]
      voyageNextPosition = 0
    }

    Positions.insert(voyageData[voyageNextPosition])
    voyageNextPosition++
  }
})