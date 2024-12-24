const $ = (q) => document.querySelector(q);
window.onload = () => {
  console.log("ready...");

  const radius = 100;
  let prevAngle = -0.5 * Math.PI;
  let wasMovingClockwise = true;
  let checkpointTracker = 0;
  let minutesCount = 0;
  let hourCount = 0;

  const minuteHand = $("div.minute-hand");
  const hoursDisplay = $("span.hours");
  const minutesDisplay = $("span.minutes");
  const secondsDisplay = $("span.seconds");

  minutesDisplay.innerHTML = String(minutesCount).padStart(2, "0");

  minuteHand.ondrag = (evt) => {
    if (evt.clientX === 0 && evt.clientY === 0) {
      return;
    }

    const pointerCoords = {
      x: normalize(evt.clientX, 0, window.innerWidth, -radius, radius),
      y: normalize(evt.clientY, 0, window.innerHeight, -radius, radius),
    };

    const angle = getAngle(pointerCoords);

    const tx = getNewXCoord(radius, angle);
    const ty = getNewYCoord(radius, angle);

    minuteHand.style.translate = `${tx}px ${ty}px`;

    const isMovingClockwise = isClockwise(
      normalizeAngle(prevAngle),
      normalizeAngle(angle),
      wasMovingClockwise
    );

    checkpointTracker += getCheckpointValue(
      normalizeAngle(prevAngle),
      normalizeAngle(angle),
      isMovingClockwise
    );

    if (checkpointTracker === 4) {
      minutesCount++;
      checkpointTracker = 0;
      prevAngle = 0;
    }
    if (checkpointTracker === -4) {
      if (minutesCount > 0) {
        minutesCount--;
      }
      checkpointTracker = 1;
      prevAngle = 0;
    }

    minutesDisplay.innerHTML = String(minutesCount).padStart(2, "0");

    $(".direction").innerHTML = isMovingClockwise
      ? "Clockwise"
      : "Counter-clockwise";

    prevAngle = angle;
    wasMovingClockwise = isMovingClockwise;
  };

  minuteHand.ondragend = () => {
    $(".direction").innerHTML = "No Movement";
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

const getCheckpointValue = (prevAngle, currAngle, isMovingClockwise) => {
  const checkpoints = [
    30 * (Math.PI / 180),
    Math.PI / 2,
    Math.PI,
    (3 * Math.PI) / 2,
  ];

  const nextCheckpoint = checkpoints.find((c) =>
    isMovingClockwise
      ? currAngle >= c && prevAngle < c
      : currAngle <= c && prevAngle > c
  );

  if (nextCheckpoint !== undefined) {
    return isMovingClockwise ? 1 : -1;
  }
  return 0;
};

const normalizeAngle = (angle) => {
  return normalize(angle, -Math.PI, Math.PI, 0, 2 * Math.PI);
};

function normalize(value, min, max, targetMin, targetMax) {
  if (min === max) {
    throw "Minimum value cannot equal maximum value";
  }

  return ((value - min) / (max - min)) * (targetMax - targetMin) + targetMin;
}
