export const calculateAngle = (a, b, c) => {
  const angleRadians =
    Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
  let angle = Math.abs((angleRadians * 180) / Math.PI);

  if (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
};

// export function calculateAngle(point1, point2, point3) {
//   // Calculate the vectors formed by the three points
//   const vector1 = [point1[0] - point2[0], point1[1] - point2[1], point1[2] - point2[2]];
//   const vector2 = [point3[0] - point2[0], point3[1] - point2[1], point3[2] - point2[2]];
  
//   // Calculate the dot product and magnitude product of the two vectors
//   const dotProduct = vector1.reduce((sum, val, index) => sum + val * vector2[index], 0);
//   const magnitudeProduct = Math.sqrt(vector1.reduce((sum, val) => sum + val**2, 0)) * Math.sqrt(vector2.reduce((sum, val) => sum + val**2, 0));
  
//   if (magnitudeProduct === 0) {
//     return 0;
//   }
  
//   // Calculate the angle between the two vectors
//   let angle = Math.acos(dotProduct / magnitudeProduct);
  
//   // Convert the angle from radians to degrees
//   angle = angle * 180 / Math.PI;

//   if (angle > 180) {
//     angle = 360 - angle;
//   }

//   return angle;
// }