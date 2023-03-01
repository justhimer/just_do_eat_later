export const calculateAngle = (a, b, c) => {

  if (a === null || b === null || c === null) {
    return null;
  }

  const angleRadians =
    Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
  let angle = Math.abs((angleRadians * 180) / Math.PI);

  if (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
};
