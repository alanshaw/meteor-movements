Meteor.startup(function () {

  var map = L.map('map').setView([51.505, -0.09], 3)

  new L.StamenTileLayer("watercolor").addTo(map)

  Meteor.subscribe("positions")

  var positions = Positions.findByTimestampAsc()
    , marker = null

  positions.observe({
    added: function (pos) {

      var latlng = [pos.latitude, pos.longitude]

      if (!marker) {

        var icon = L.icon({
          iconUrl: 'img/icon-ship-container.png',
          iconSize: [60, 60],
          iconAnchor: [30, 30]
        })

        return marker = L.marker(latlng, {icon: icon, iconAngle: pos.heading}).addTo(map)
      }

      // Move marker to new position
      marker.setLatLng(latlng).setIconAngle(pos.heading)

      Meteor.setTimeout(drawTracks, 500)
    }
  })

  var tracks = null

  function drawTracks () {

    if (tracks) {
      map.removeLayer(tracks)
    }

    tracks = L.polyline(Positions.findByTimestampAsc().fetch().map(function (d) {
      return [d.latitude, d.longitude]
    })).addTo(map)
  }
})

