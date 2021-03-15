import './App.css';
import { IconButton, Slider } from '@material-ui/core';
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  RotateLeft,
} from '@material-ui/icons';
import bubbleSort from './algorithms/bubbleSort';
import mergeSort from './algorithms/mergeSort';
import quickSort from './algorithms/quickSort';
import selectionSort from './algorithms/selectionSort';
import { Component } from 'react';
import Bar from './components/Bar';
import Form from './components/Form';
import insertionSort from './algorithms/insertionSort';
import heapSort from './algorithms/heapSort';

class App extends Component {
  state = {
    array: [],
    colorKey: [],
    arraySteps: [],
    colorSteps: [],
    currentStep: 0,
    timeouts: [],
    algorithm: 'Merge Sort',
    barCount: 50,
    delay: 200,
  };

  ALGO_SET = {
    'Bubble Sort': bubbleSort,
    'Merge Sort': mergeSort,
    'Quick Sort': quickSort,
    'Selection Sort': selectionSort,
    'Insertion Sort': insertionSort,
    'Heap Sort': heapSort,
  };
  componentDidMount() {
    this.generateBars();
  }

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.ALGO_SET[this.state.algorithm](array, 0, steps, colorSteps);
    this.setState({
      arraySteps: steps,
      colorSteps,
    });
  };

  setTimeouts() {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();
    let timeouts = [];
    let i = 0;
    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
      }, this.state.delay * i);
      timeouts.push(timeout);
      i++;
    }
    this.setState({ timeouts });
  }

  stepBack = () => {
    if (this.state.currentStep === 0) return;
    this.clearTimeouts();

    let currentStep = this.state.currentStep - 1;
    this.setState({
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
      currentStep: currentStep,
    });
  };

  stepForward = () => {
    if (this.state.currentStep >= this.state.arraySteps.length - 1) return;
    this.clearTimeouts();

    let currentStep = this.state.currentStep + 1;
    this.setState({
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
      currentStep: currentStep,
    });
  };

  changeAlgorithm = event => {
    this.setState(
      {
        algorithm: event.target.value,
        currentStep: 0,
        arraySteps: [
          this.state.arraySteps[
            this.state.currentStep === 0 ? 0 : this.state.currentStep - 1
          ],
        ],
      },
      () => this.generateSteps()
    );
    this.clearTimeouts();
    this.clearColorKey();
  };

  changeBarCount = barCount => {
    this.setState({ barCount: barCount }, () => this.generateBars());
  };

  changeDelay = event => {
    this.clearTimeouts();
    this.setState({
      delay: parseInt(event.target.value),
    });
  };
  changeDelayHandler = (event, newValue) => {
    this.clearTimeouts();
    console.log(1000 - newValue);
    this.setState({
      delay: parseInt(1000 - newValue),
    });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    });
  };
  clearColorKey = () => {
    let blankKey = new Array(parseInt(this.state.barCount)).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  };

  generateBars = () => {
    this.clearTimeouts();
    this.clearColorKey();

    let barCount = parseInt(this.state.barCount);
    let barsTemp = [];

    for (let i = 0; i < barCount; i++) {
      barsTemp.push(Math.floor(Math.random() * 90) + 10);
    }

    this.setState(
      {
        array: barsTemp,
        arraySteps: [barsTemp],
        barCount: barCount,
        currentStep: 0,
      },
      () => this.generateSteps()
    );
  };
  handleSizeChange(e, n) {
    this.setState({ barCount: n }, () => this.generateBars());
  }
  render() {
    let barsDiv = this.state.array.map((value, idx) => (
      <Bar key={idx} length={value} colorKey={this.state.colorKey[idx]} />
    ));
    let playButton;
    if (
      this.state.timeouts.length !== 0 &&
      this.state.currentStep !== this.state.arraySteps.length
    ) {
      playButton = (
        <IconButton onClick={() => this.clearTimeouts()}>
          <Pause />
        </IconButton>
      );
    } else if (this.state.currentStep === this.state.arraySteps.length) {
      playButton = (
        <IconButton color='secondary' onClick={() => this.generateBars()}>
          <RotateLeft />
        </IconButton>
      );
    } else {
      playButton = (
        <IconButton color='secondary' onClick={() => this.setTimeouts()}>
          <PlayArrow />
        </IconButton>
      );
    }
    return (
      <div className='App'>
        <section className='bars container barsCard'>{barsDiv}</section>

        <section className='container-small'>
          <IconButton onClick={() => this.generateBars()}>
            <RotateLeft />
          </IconButton>
          <IconButton onClick={this.stepBack}>
            <SkipPrevious />
          </IconButton>
          {playButton}
          <IconButton onClick={this.stepForward}>
            <SkipNext />
          </IconButton>
        </section>

        <section className='control-section controls container-smalll'>
          <div className='grid'>
            <Form
              formLabel='Algorithm'
              values={[
                'Bubble Sort',
                'Merge Sort',
                'Quick Sort',
                'Selection Sort',
                'Insertion Sort',
                'Heap Sort',
              ]}
              labels={[
                'Bubble Sort',
                'Merge Sort',
                'Quick Sort',
                'Selection Sort',
                'Insertion Sort',
                'Heap Sort',
              ]}
              currentValue={this.state.algorithm}
              onChange={this.changeAlgorithm}
            />

            <Form
              formLabel='Array size'
              values={[10, 20, 25, 40, 50]}
              labels={[
                '10 items',
                '20 items',
                '25 items',
                '40 items',
                '50 items',
              ]}
              currentValue={this.state.barCount}
              onChange={e => this.changeBarCount(e.target.value)}
            />

            <Form
              formLabel='Speed'
              values={[200, 100, 50, 25, 10]}
              labels={['1x', '2x', '4x', '8x', '10x']}
              currentValue={this.state.delay}
              onChange={this.changeDelay}
            />
          </div>
          <div className='slider-container'>
            <div className='sliders card'>
              <div className=' slider'>
                <p className='slider-header'>Custom Size Array</p>
                <Slider
                  value={this.state.barCount}
                  onChange={(e, newValue) => this.handleSizeChange(e, newValue)}
                  aria-labelledby='input-slider'
                />
              </div>
              <div className=' slider'>
                <p className='slider-header'>Custom Speed</p>
                <Slider
                  max={1000}
                  min={100}
                  value={1000 - this.state.delay}
                  onChange={(e, newValue) =>
                    this.changeDelayHandler(e, newValue)
                  }
                  aria-labelledby='input-slider'
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
