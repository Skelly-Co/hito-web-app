export class FindChatListItems {
  static readonly type = '[Chat-List] Find Chat List Items';

  constructor(public payload: string) {}
}

export class LoadLocalUsersData {
  static readonly type = '[Chat-List] Init Local Users Data';

  constructor(public payload: string) {}
}

export class LoadHistoryData {
  static readonly type = '[Chat-List] Init History Data';

  constructor(public payload: string) {}
}

export class LoadNextPage {
  static readonly type = '[Chat-List] Load Next Page';

  constructor() {}
}