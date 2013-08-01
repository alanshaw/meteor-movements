/*
 * Based on comments by @runanet and @coomsie
 * https://github.com/CloudMade/Leaflet/issues/386
 */

var _old_update = L.Marker.prototype.update;
var _old_animateZoom = L.Marker.prototype._animateZoom;

function setIconAngle () {
  if (this.options.iconAngle) {
    var a = this.options.icon.options.iconAnchor;
    var s = this.options.icon.options.iconSize;
    a = L.point(s).divideBy(2)._subtract(L.point(a));
    var transform = '';
    transform += ' translate(' + -a.x + 'px, ' + -a.y + 'px)';
    transform += ' rotate(' + this.options.iconAngle + 'deg)';
    transform += ' translate(' + a.x + 'px, ' + a.y + 'px)';
    this._icon.style[L.DomUtil.TRANSFORM] += transform;
  }
}

L.Marker.include({
  update: function() {
    this._icon.style[L.DomUtil.TRANSFORM] = "";
    _old_update.apply(this, []);
    setIconAngle.call(this);
  },

  _animateZoom: function (opt) {
    _old_animateZoom.apply(this, [opt]);
    setIconAngle.call(this);
  },

  setIconAngle: function (iconAngle) {
    this.options.iconAngle = iconAngle;

    if (this._map) this.update();
  }
});
