export interface IData {
  commuterID: string;
  actions: IActions[]
}

export interface IActions {
  ts: string;
  action: string;
  unit: string;
  quantity: number;
}

export interface IEntry {
  test: boolean;
  message: string;
}