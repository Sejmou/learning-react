import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

import './App.css';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import List from './components/List/List';

class App extends Component {
  state = {
    modalIsOpen: false,
    showDemoBlock: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  toggleBlock = () => {
    this.setState(state => ({ showDemoBlock: !state.showDemoBlock }));
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <div
          style={{
            margin: '10px auto',
            maxWidth: '400px',
          }}
        >
          <h3>Simple react-transition-group demo</h3>
          <Transition in={this.state.showDemoBlock}>
            {state => <p>Current transition state: {state}</p>}
          </Transition>
          <p>Click the button below and observe the change!</p>
          <div
            style={{
              display: 'flex',
              margin: '0 auto',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 100,
            }}
          >
            {this.state.showDemoBlock && (
              <div
                style={{ backgroundColor: 'red', width: 100, height: 100 }}
              ></div>
            )}
            <div style={{ flex: 1 }}></div>
            <div>
              <button className="Button" onClick={this.toggleBlock}>
                Toggle Block
              </button>
            </div>
          </div>
        </div>
        {this.state.modalIsOpen && <Modal onClose={this.closeModal} />}
        {this.state.modalIsOpen && <Backdrop onClick={this.closeModal} />}
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
