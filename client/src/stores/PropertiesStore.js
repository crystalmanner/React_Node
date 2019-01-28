// Imports
import { observable, action, computed, runInAction, configure } from 'mobx';
import fetch from 'node-fetch';

// configure({ enforceActions: "always" })

class PropertiesStore {
  //observables
  @observable
  items = {
    data: [],
    status: 'loading',
    offset: 0,
    limit: 10,
    priceQuery: [],
    totalProperties: 0,
    query: ''
  };

  //actions
  @action PropertiesCount() {
    this.items.status = 'loading'
    this.getQuantityOfProperties()
      .then(count => {
        runInAction(() => {
          this.items.totalProperties = count.result[0].Total;
          this.items.status = 'done'
      })
      })
      .catch(error => {
      this.items.status = 'error'
    })
  }
  @action listProperties() {
    this.items.status = 'loading';
    this.getProperties()
      .then((properties) => {
        runInAction(() => {
          this.items.data = properties.result;
          this.items.status = 'done';
        });
      })
      .catch((err) => { this.items.status = 'error' });
  }

  @action listCities() {
    this.items.status = 'loading';
    this.getAllCities()
      .then(cities => {
        runInAction(() => {
          this.items.cities = cities
          this.items.status = 'done'
        })
      })
      .catch(err => { this.items.status = 'error' })
  }

   @action ebaShim() {
    this.items.status = 'loading';
    this.getAllprops()
      .then(item => {
           runInAction(() => {
          this.items.priceQuery = item;
          this.items.status = 'done'
        })
        // let filteredPrice = this.items.priceQuery.map((el, i) => {
        //   return el.price_value
        // })
        // console.log(filteredPrice)
        // return filteredPrice
      }) 
      .catch(err => { this.items.status = 'error' })
  }

   //listByPrice(lowPrice, highPrice, limit) {
  //     this.properties.status = 'loading';
  //     this.filterByPrice(lowPrice, highPrice, limit)
  //       .then((priceFilteredData) => {
  //         runInAction(() => {
  //           this.properties.data = priceFilteredData;
  //           this.properties.status = 'done';
  //         });
  //       })
  //       .catch((err) => (this.properties.status = 'error'));
  //   }

  // @action filterByPrice(lowPrice, highPrice, limit) {
  //   return fetch(`api/test?low=${lowPrice}&high=${highPrice}&limit=${limit}`)
  // }
  //computations
  @computed
  get propertiesCount() {
    return this.items.data.length
  }
  //requests to server
  getProperties() {
    return fetch(`http://localhost:3123/api/properties`).then(response => response.json()).catch(err => console.log(err))
  }

  @action
  async UNIprops(inputQuery) {
      let query = ''
      this.items.data = []
      this.items.status = "pending"
      try {
        if (inputQuery) {
          query = inputQuery
        }
        console.log(query)
          const results = await fetch(`http://localhost:3123/api/test${query}`).then(response => response.json()).catch(err => console.log(err))
          // after await, modifying state again, needs an actions:
          runInAction(() => {
            this.items.status = "done"
            this.items.data = results
          })
      } catch (error) {
          runInAction(() => {
            this.items.status = "error"
          })
      }
  }

  //  async fetchFromEnd(endpoint) {
  //    const url = `http://localhost:3123/api/test${endpoint}`;
  //    const response = await fetch(url);
  //    return await response.json();
  //  }

  getAllprops() {
    return fetch(`http://localhost:3123/api/test`).then(response => response.json()).catch(err => console.log(err))
  }

  getAllCities() {
    return fetch('http://localhost:3123/api/test/cities').then(response => response.json()).catch(err => console.log(err))
  }
  getAllCountries() {
    return fetch('http://localhost:3123/api/test/countries').then(response => response.json()).catch(err => console.log(err))
  }
  getQuantityOfProperties() {
    return fetch('http://localhost:3123/api/countall').then(response => response.json()).catch(err => console.log(err))
  }

}

const store = new PropertiesStore();
export default store;
