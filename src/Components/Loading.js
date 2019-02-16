import React, { Component } from 'react';
import LoadingScreen from 'react-loading-screen'
import App from '../App'
import icon from '../Icons/iconbeta.png';
class Loading extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        // fake promise
        setTimeout(() =>
            this.setState({ loading: false })
            , 2500)
    }
    render() {
        return (
            <div>
                <LoadingScreen
                    loading={this.state.loading}
                    bgColor='#fefefe'
                    spinnerColor='rgb(24,162,78)'
                    textColor='rgb(31, 31, 31)'
                    logoSrc={icon}
                >
                    <App />
                </LoadingScreen>
            </div>
        )
    }

}
export default Loading