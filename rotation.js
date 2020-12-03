AFRAME.registerComponent("rotation-reader", {
  schema: {
    speedOfRoation: { type: "number", default: 0 },
    speedOfAscent: { type: "number", default: 0 }
  },
  init: function() {
    window.addEventListener("keydown", e => {
      var mapRotation1 = this.el.getAttribute("rotation");
      // console.log(this.el.body, "2");
      if (e.key === "ArrowRight") {
        if (this.data.speedOfRoation < 0.1) {
          this.data.speedOfRoation += 0.01;
        }
      }
      if (e.key === "ArrowLeft") {
        if (this.data.speedOfRoation > -0.1) {
          this.data.speedOfRoation -= 0.01;
        }
      }
      if (e.key === "ArrowUp") {
        if (mapRotation1.x > -20) {
          mapRotation1.x -= 0.01;
        }
      }
      if (e.key === "ArrowDown") {
        if (mapRotation1.x < 20) {
          mapRotation1.x += 0.01;
        }
      }
      this.el.setAttribute("rotation", {
        x: mapRotation1.x,
        y: mapRotation1.y,
        z: mapRotation1.z
      });
    });
  },
  tick: function() {
    var mapRotation = this.el.getAttribute("rotation");
    mapRotation.y += this.data.speedOfRoation;
    this.el.setAttribute("rotation", {
      x: mapRotation.x,
      y: mapRotation.y,
      z: mapRotation.z
    });
  }
});

AFRAME.registerComponent("plane-rotation-reader", {
  init: function() {
    console.log("Welcome to Virtual Flight !!!");
  },
  tick: function() {
    this.setVelocity(this.el.body);
  },
  update: function() {
    // Key Down Event
    window.addEventListener("keydown", e => {
      const body = this.el.body;
      var planeRotation = body.angularVelocity;
      var planePosition = body.position;

      if (e.key === "ArrowRight") {
        body.angularVelocity.set(0, 0, -0.2);
      }
      if (e.key === "ArrowLeft") {
        body.angularVelocity.set(0, 0, 0.2);
      }
      if (e.key === "ArrowUp") {
        body.angularVelocity.set(0.2, 0, 0);
      }
      if (e.key === "ArrowDown") {
        body.angularVelocity.set(-0.2, 0, 0);
      }
    });

    // Key Up Event
    window.addEventListener("keyup", e => {
      const body = this.el.body;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        body.angularVelocity.set(0, 0, 0);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        body.angularVelocity.set(0, 0, 0);
      }
    });
  },
  setVelocity: function(body) {
    if (body !== undefined) {
      // Set velocity to 0.1 to float in the air
      body.velocity.set(0.1, 0.1, 0.1);
      // Initial position of plane
      const initPosition = body.initPosition;
      body.position.set(initPosition.x, initPosition.y, initPosition.z);
    }
  }
});
