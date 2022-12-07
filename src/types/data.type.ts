export interface IData {
  commuterID: string;
  actions: IAction[]
}

export interface IAction {
  ts: string;
  action: string;
  unit: string;
  quantity: number;
}

export interface IEntry {
  test: boolean;
  message: string;
}