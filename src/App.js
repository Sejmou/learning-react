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
        <Transition
          in={this.state.modalIsOpen}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          {state => (
            <>
              <Modal transitionState={state} onClose={this.closeModal} />
              <Backdrop onClick={this.closeModal} />
            </>
          )}
        </Transition>
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
