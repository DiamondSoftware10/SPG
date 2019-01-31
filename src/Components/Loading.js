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
            , 4000)
    }
    render() {
        return (
            <div>
                <LoadingScreen
                    loading={this.state.loading}
                    bgColor='#f1f1f1'
                    spinnerColor='#9ee5f8'
                    textColor='#676767'
                    logoSrc={icon}
                    text='Here an introduction sentence (Optional)'
                >
                    <App />
                </LoadingScreen>
            </div>
        )
    }

}
export default Loading