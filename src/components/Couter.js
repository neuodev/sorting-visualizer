import React, { Component } from 'react';

class Couter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(Math.floor(Math.random() * 100));
    }

    this.setState(array);
  }

  render() {
    const array = this.state;
    return (
      <div className='array-container'>
        <button onClick={() => this.resetArray()}>Generate New Array</button>
      </div>
    );
  }
}

export default Couter;
