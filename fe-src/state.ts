const url = process.env.url;

export const state = {
  data: {},
  listeners: [],

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    // console.log("State: ", this.data);

    for (const call of this.listeners) {
      call(newState);
    }
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
