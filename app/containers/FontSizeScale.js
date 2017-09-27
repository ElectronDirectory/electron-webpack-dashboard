import React from 'react';
import { ipcRenderer } from 'electron';

class FontSizeScale extends React.Component {
  static STEP = 0.1;
  static MAX_SCALE = 3;
  static MIN_SCALE = 0.1;

  state = {
    scale: 1
  };

  componentDidMount() {
    ipcRenderer.on('increase-font-size', this.handleIncrease);
    ipcRenderer.on('decrease-font-size', this.handleDecrease);
  }

  componentWillUnMount() {
    ipcRenderer.removeListener('increase-font-size', this.handleIncrease);
    ipcRenderer.removeListener('decrease-font-size', this.handleDecrease);
  }

  handleIncrease = () => {
    const { MAX_SCALE, STEP } = FontSizeScale;

    this.setState(({ scale }) => ({
      scale: Math.min(scale + STEP, MAX_SCALE)
    }));
  }

  handleDecrease = () => {
    const { MIN_SCALE, STEP } = FontSizeScale;

    this.setState(({ scale }) => ({
      scale: Math.max(scale - STEP, MIN_SCALE)
    }));
  }

  render() {
    return this.props.render(this.state);
  }
}

export default FontSizeScale;
