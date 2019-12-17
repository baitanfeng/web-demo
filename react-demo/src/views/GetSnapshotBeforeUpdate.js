import React from 'react';

export default class GetSnapshotBeforeUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };

        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(prevState => ({
                messages: [
                    `count: ${prevState.messages.length}`,
                    ...prevState.messages
                ]
            }));
        }, 1000);
    }

    getSnapshotBeforeUpdate() {
        return this.wrapperRef.current.scrollHeight;
    }

    componentDidUpdate(prevProps, prevState, prevScrollHeight) {
        this.wrapperRef.current.scrollTop = 
            this.wrapperRef.current.scrollTop + 
            (this.wrapperRef.current.scrollHeight - prevScrollHeight);
    }

    render() {
        return (
            <div 
                ref={this.wrapperRef}
                style={styles.wrapper}
            >
                {
                    this.state.messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))
                }
            </div>
        );
    }
}

const styles = {
    wrapper: {
        boxSizing: 'border-box',
        height: 100,
        border: '1px solid red',
        overflow: "auto"
    }
};