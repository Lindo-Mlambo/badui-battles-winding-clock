const $ = (q) => document.querySelector(q);
window.onload = () => {
  console.log("ready...");

  const radius = 100;
  let prevAngle = -0.5 * Math.PI;
  let wasMovingClockwise = true;
  let checkpointTracker = 0;
  let hourCount = 0;
  let minuteCount = 0;
  let secondCount = 0;
  let timerInterval;

  const minuteHand = $("div.minute-hand");
  const hoursDisplay = $("span.hours");
  const minutesDisplay = $("span.minutes");
  const secondsDisplay = $("span.seconds");
  const startBtn = $("button.start-timer");
  const resetBtn = $("button.reset-timer");

  startBtn.onclick = () => {
    startBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");

    timerInterval = setInterval(() => {
      if (secondCount === 0 && minuteCount > 0) {
        if (minuteCount % 60 === 0) {
          hourCount--;
          hoursDisplayDisplay.innerHTML = String(hourCount).padStart(2, "0");
        }
        minuteCount--;
        secondCount = 59;
        minutesDisplay.innerHTML = String(minuteCount % 60).padStart(2, "0");
      } else if (secondCount === 0 && minuteCount === 0) {
        secondsDisplay.innerHTML = String(secondCount).padStart(2, "0");
        console.log("Ring the alarm");
        resetBtn.click();
      }
      secondsDisplay.innerHTML = String(secondCount).padStart(2, "0");

      secondCount--;
    }, 1000);
  };

  resetBtn.onclick = () => {
    clearInterval(timerInterval);
    resetBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    hourCount = 0;
    minuteCount = 0;
    secondCount = 0;
    hoursDisplay.innerHTML = String(hourCount).padStart(2, "0");
    minutesDisplay.innerHTML = String(minuteCount).padStart(2, "0");
    hoursDisplay.innerHTML = String(hourCount).padStart(2, "0");
  };

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

    if (checkpointTracker >= 4) {
      if (
        normalizeAngle(prevAngle) <= Math.PI / 2 &&
        normalizeAngle(angle) > Math.PI / 2
      ) {
        if (minuteCount % 60 === 59) {
          hourCount++;
        }
        minuteCount++;
        checkpointTracker = 0;
      }
    }
    if (checkpointTracker <= -4) {
      if (
        normalizeAngle(prevAngle) >= Math.PI / 2 &&
        normalizeAngle(angle) < Math.PI / 2
      ) {
        if (minuteCount % 60 === 0 && hourCount > 0) {
          hourCount--;
        }
        minuteCount = minuteCount > 0 ? minuteCount - 1 : 0;
        checkpointTracker = 0;
      }
    }

    hoursDisplay.innerHTML = String(hourCount).padStart(2, "0");
    minutesDisplay.innerHTML = String(minuteCount % 60).padStart(2, "0");

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
