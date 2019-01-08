import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Tooltip } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false
    };
    this.forceRender = this.forceRender.bind(this);
  }

  componentDidUpdate() {
    console.log(arguments);
  }

  forceRender() {
    console.log("parent forceRender");
    this.setState({isOn: !this.state.isOn});
  }

  render() {
    console.log("parent render");
    return (
      <div>
          <div>{`${this.state.isOn}`}</div>
          {[1,2,3].map((elem, index) => {
            return (<CustomTooltip key={elem} isOn={this.state.isOn}>
              <Counter count={10} parentForceRender={this.forceRender} />
            </CustomTooltip>);
          })}
      </div>
    );
  }
}


class Counter extends Component {
  constructor(props) {
    super(props);
    const count = props.count || 0;
    this.state = {
      count
    };
    this.countUp = this.countUp.bind(this);
    console.log("Counter const");
  }

  componentDidUpdate() {
    console.log(arguments);
  }

  componentDidMount() {
    console.log("counter componentDidMount");
  }

  countUp() {
    console.log("child countUp");
    this.setState({
      count: this.state.count + 1
    });
    this.props.parentForceRender();
  }

  render() {
    console.log(`child render`);
    return (
      <div>
        <div>{this.state.count}</div>
        <Button color="info" onClick={this.countUp}>count up</Button>
      </div>
    );
  }
}

class CustomTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    };
    this.targetRef = React.createRef();

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const {children, isOn} = this.props;
    console.log(isOn);
    // <div ref={this.targetRef}>{children}</div>
      // {React.Children.map(children, child =>
      //   React.cloneElement(child, { ref: this.targetRef })
      // )}
    return (
      <React.Fragment>
        <div ref={this.targetRef}>{children}</div>
        <Tooltip placement="auto" isOpen={isOn} trigger={"hover"} isOpen={this.state.tooltipOpen} target={this.targetRef} toggle={this.toggle} delay={{show: 1000, hide:0}}>
          {"Tooltip!!!"}
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default App;
