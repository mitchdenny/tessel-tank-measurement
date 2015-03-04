function Monitor(publisher, ranger) {
  var self = this;
  self.publisher = publisher;
  self.ranger = ranger;
  self.isStarted = false;
  self.measureInterval = null;

  self.measure = function() {
    self.ranger.getDistance(function (err, distance) {
      if (err) {
        console.log(err);
        return;
      }

      self.publisher.publishDistance(distance);
    });
  }

  return {
    start: function() {
      if (self.isStarted != true) {
        self.measureInterval = setInterval(self.measure, 1000);
      }

      self.isStarted = true;
    },
    stop: function() {
      if (self.isStarted) {
        clearInterval(self.measureInterval);
      }

      self.isStarted = false;
    }
  };
}

function use(controller, ranger) {
  var monitor = new Monitor(controller, ranger);
  return monitor;
}

exports.use = use;
