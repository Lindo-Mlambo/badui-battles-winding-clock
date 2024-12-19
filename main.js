const $ = (q) => document.querySelector(q);
window.onload = () => {
  console.log("ready...");

  const radius = 60;
  let prevCoords = { x: 0, y: 60 };

  const minuteHand = $("div.minute-hand");

  minuteHand.ondrag = (evt) => {
    if (evt.clientX === 0 && evt.clientY === 0) {
      return;
    }

    const pointerCoords = {
      x: normalize(evt.clientX, window.innerWidth, 0),
      y: normalize(evt.clientY, window.innerHeight, 0),
    };

    const angle = getAngle(pointerCoords);

    const tx = getNewXCoord(radius, angle);
    const ty = getNewYCoord(radius, angle);

    minuteHand.style.translate = `${tx}px ${ty}px`;

    prevCoords = pointerCoords;
  };
};

const getAngle = (point) => {
  return Math.atan2(point.y, point.x);
};

const getNewXCoord = (radius, angle) => {
  return radius * Math.cos(angle);
};
const getNewYCoord = (radius, angle) => {
  return radius * Math.sin(angle);
};

const isClockwiseRevolution = (curr, prev) => {
  const isAtOclock = isInRange(curr.x, -32, 0) && isInRange(curr.y, 28, 60);
  const isClockwise = curr.x > prev.x && curr.y > prev.y;

  return isAtOclock && isClockwise;
};

const isInRange = (value, max, min) => {
  return value > min && value < max;
};

const normalize = (value, max, min) => {
  if (min === max) {
    throw "Minimum value cannot equal maximum value";
  }

  const targetMin = -60;
  const targetMax = 60;

  return ((value - min) / (max - min)) * (targetMax - targetMin) + targetMin;
};
