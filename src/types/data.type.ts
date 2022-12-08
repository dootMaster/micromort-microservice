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

export interface ITestCase {
  test: boolean;
  message: string;
}