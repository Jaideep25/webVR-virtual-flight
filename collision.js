AFRAME.registerComponent("collision-detector", {
  schema: {
    ringId: { type: "string", default: "#ring1" }
  },
  update: function() {
    this.destroy(this.data.ringId);
  },
  destroy: function(elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", function(e) {
      element.setAttribute("visible", false);
      console.log(elemntId, " Destroyed !!!");
    });
  },

  tick: function() {}
});
