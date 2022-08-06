import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

import './App.css';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import List from './components/List/List';

// Transition also accepts an object as input for the timeout prop
const animationDuration = {
  enter: 400,
  exit: 1000,
};

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
        {/* Note: could also move Transition component inside a "Modal+Backdrop wrapper" component
            to automatically reuse the same animation anywhere the modal is used */}
        <Transition
          in={this.state.modalIsOpen}
          timeout={animationDuration}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log('onEnter')}
          onEntering={() => console.log('onEntering')}
          onEntered={() => console.log('onEntered')}
          onExit={() => console.log('onExit')}
          onExiting={() => console.log('onExiting')}
          onExited={() => console.log('onExited')}
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
