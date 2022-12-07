import { IData } from "./types/data.type";

const micromortModel = (data: IData) => {
  switch(data.commuterID) {
    case 'COM-1':
      return 10;
    case 'COM-42':
      return 105124;
    case 'COM-64':
      return 90;
    default:
      return NaN;
  }
}

export default micromortModel;