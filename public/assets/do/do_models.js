// const jointStatusDescription = ["全直", "半直", "半屈", "全屈"];
// const positionStatusDescription = ["高", "中", "低"];

export const exercises = {
  swingArm: [
    { // 0
      jointStatus: { leftShoulder: 3, rightShoulder: 3, leftElbow: 0, rightElbow: 0 },
    },
    { // 1
      jointStatus: { leftShoulder: 1, rightShoulder: 1, leftElbow: 0, rightElbow: 0 },
    },
    { // 2
      jointStatus: { leftShoulder: 0, rightShoulder: 0, leftElbow: 0, rightElbow: 0 },
    },
  ],
  pushUp: [
    { // 0
      jointStatus: { leftElbow: 0, rightElbow: 0 },
      positionStatus: { nose: 0 },
    },
    { // 1
      jointStatus: { leftElbow: 2, rightElbow: 2 },
      positionStatus: { nose: 1 },
    },
  ],
};
