Positions = new Meteor.Collection("positions")

Positions.findByTimestampAsc = function () {
  return Positions.find({}, {sort: ["timestamp", "asc"]})
}