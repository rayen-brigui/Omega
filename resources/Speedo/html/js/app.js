

alt.on("speedometer:init", (data) => {
  let color = data.color;
  document.getElementById("container").style.color =
  "white"
  //  "rgb(" + color.r + "," + color.g + "," + color.b;
});
alt.on("speedometer:data", (data) => {
  let speed = data.speed;
  let gear = data.gear;
  let fuel = data.fuel;
  let rpm = data.rpm;
  let engineHealth = data.engineHealth;
  let lightState = data.lightState;
  let highBeamState = data.highBeamState;

  if (engineHealth < 500) {
    document.getElementById("engineIcon").style.visibility = "visible";
  } else {
    document.getElementById("engineIcon").style.visibility = "hidden";
  }
  document.getElementById("speedValue").style.height = speed + "px";
  document.getElementById("fuelMeter").value = fuel;
  document.getElementById("rpmMeter").value = rpm;
  document.getElementById("speedText").style.textShadow="rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px"
  document.getElementById("speedText").innerHTML = speed+"KM/h";
  document.getElementById("gearText").innerHTML = gear;
  if (lightState || highBeamState) {
    document.getElementById("lightIcon").style.visibility = "visible";
    document.getElementById("lightIcon").style.color = "green";
    if (highBeamState) {
      document.getElementById("lightIcon").style.color = "blue";
    }
  } else {
    document.getElementById("lightIcon").style.visibility = "hidden";
  }
});
