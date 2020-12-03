import {correctionPoints} from '../../individual/correction-points.js';

export default function addCorrectionPoint (flat) {
  const correctionPoint = correctionPoints[flat.name];
  if (correctionPoint){
    flat.userData.correction_point = correctionPoint;
  }
}