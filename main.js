const $ = (q) => document.querySelector(q);
window.onload = () => {
  console.log("ready...");

  const radius = 60;
  let prevAngle = -0.5 * Math.PI;
  let wasMovingClockwise = true;

  const minuteHand = $("div.minute-hand");

  minuteHand.ondrag = (evt) => {
    if (evt.clientX === 0 && evt.clientY === 0) {
      return;
    }

    const pointerCoords = {
      x: normalize(evt.clientX, 0, window.innerWidth, -60, 60),
      y: normalize(evt.clientY, 0, window.innerHeight, -60, 60),
    };

    const angle = getAngle(pointerCoords);

    const tx = getNewXCoord(radius, angle);
    const ty = getNewYCoord(radius, angle);

    minuteHand.style.translate = `${tx}px ${ty}px`;

    const isMovingClockwise = isClockwise(
      normalize(prevAngle, -Math.PI, Math.PI, 0, 2 * Math.PI),
      normalize(angle, -Math.PI, Math.PI, 0, 2 * Math.PI),
      wasMovingClockwise
    );

    prevAngle = angle;
    wasMovingClockwise = isMovingClockwise;
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

const isClockwise = (prevAngle, currAngle, prevDirection) => {
  if (prevAngle === currAngle) {
    return prevDirection;
  }

  const diff = currAngle - prevAngle;

  return (diff > 0 && diff <= Math.PI) || diff < -Math.PI;
};

const normalize = (value, min, max, targetMin, targetMax) => {
  if (min === max) {
    throw "Minimum value cannot equal maximum value";
  }

  return ((value - min) / (max - min)) * (targetMax - targetMin) + targetMin;
};
