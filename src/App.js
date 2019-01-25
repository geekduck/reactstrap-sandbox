import React, {Component} from 'react';
import {Button, Tooltip, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <MyTooltip message={"Tooltip!!!!"}>
                    <div>
                        <Button
                            color={'default'}
                            onClick={console.log}>
                            {"ボタンラベル111！！！"}
                        </Button>
                    </div>
                </MyTooltip>
                <div>{`${this.state.isOn}`}</div>
                {/*<ButtonWithTooltip isOn={true} onClick={console.log}/>*/}
                <MyDropdown>aaaa</MyDropdown>
                {/*{[1, 2, 3].map((elem, index) => {*/}
                {/*return (<CustomTooltip key={elem} isOn={this.state.isOn}>*/}
                {/*<Counter count={10} parentForceRender={this.forceRender}/>*/}
                {/*</CustomTooltip>);*/}
                {/*})}*/}
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
                <Tooltip placement="auto" isOpen={isOn} trigger={"hover"} isOpen={this.state.tooltipOpen}
                         target={this.targetRef} toggle={this.toggle} delay={{show: 1000, hide: 0}}>
                    {"Tooltip!!!"}
                </Tooltip>
            </React.Fragment>
        );
    }
}


class MyDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                {/*<DropdownToggle caret style={{visibility: "hidden", position: "absolute", left: 0, bottom: 0}}>*/}
                <DropdownToggle color={"warning"}>
                    <ButtonWithTooltip isOn={true} onClick={this.toggle}/>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Foo Action</DropdownItem>
                    <DropdownItem>Bar Action</DropdownItem>
                    <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

function ButtonWithTooltip({isOn, onClick}) {
    return (
        <MyTooltip message={"Tooltip!!!!"}>
            <Button color={isOn ? 'warning' : 'default'} onClick={onClick}>{"aaaa"}</Button>
        </MyTooltip>
    );
}


class MyTooltip extends React.Component {
    targetRef = React.createRef();
    unmounted = false;

    state = {
        isOpen: false,
    };

    componentWillUnmount() {
        this.unmounted = true;
    }

    toggle = () => {
        if (this.unmounted) return;
        this.setState({isOpen: !this.state.isOpen});
    };

    render() {
        const {placement, children, message} = this.props;
        const {isOpen} = this.state;
        const resolvedPlacement = placement || 'top';
        if (!message) {
            return children;
        }
        return (
            <React.Fragment>
                {React.cloneElement(React.Children.only(children), {ref: this.targetRef})}
                <Tooltip
                    target={() => this.targetRef.current}
                    placement={resolvedPlacement}
                    trigger="hover"
                    isOpen={isOpen}
                    toggle={this.toggle}
                >
                    {message}
                </Tooltip>
            </React.Fragment>
        );
    }
}

export default App;
