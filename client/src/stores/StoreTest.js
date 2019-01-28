import { observable, action } from "mobx";

class AppState {
  @observable items;
  @observable item;

  @observable testval;

  constructor() {
    this.items = [];
    this.item = {};

    this.testval = "Cobbled together by ";
  }

  async fetchData(pathname, id) {
    let { data } = await fetch(
      `api/properties${pathname}`
    );
    console.log(data);
    data.length > 0 ? this.setData(data) : this.setSingle(data);
  }

  @action setData(data) {
    this.items = data;
  }

  @action setSingle(data) {
    this.item = data;
  }

  @action clearItems() {
    this.items = [];
    this.item = {};
  }
}
  const store = new AppState();
  export default AppState