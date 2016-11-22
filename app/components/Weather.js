'use strict';

var React = require('react');

var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

// The Weather component will maintain state e.g. location and the temperature
var Weather = React.createClass({
    displayName: 'Weather',

    // Initiate default state
    getInitialState: function getInitialState() {
        // return {
        //     location: 'Miami',
        //     temp    : 88
        // };

        // Add loader
        return {
            isLoading: false
        };
    },
    // Receive the onSearch() function from the child WeatherForm component
    handleSearch: function handleSearch(location) {
        // alert(location);

        // Initialize the state based on the location sent from the child Weather Form component
        // this.setState({
        //     location: location,
        //     temp    : 23
        // });

        // !!! workaround for this getting lost
        var that = this;

        // Debugger!!!
        // JavaScript classic debugging
        // !!!
        // debugger;
        // !!!

        // Fire loader
        this.setState({ isLoading: true });

        openWeatherMap.getTemperature(location).then(function (temperature) {
            // this gets lost and uses for openWeatherMap
            that.setState({
                location: location,
                temp: temperature,
                isLoading: false
            });
        }, function (errorMessage) {
            that.setState({ isLoading: false });
            alert(errorMessage);
        });
    },
    render: function render() {
        // I know that it exists in the state object
        // Retrieve location and map variable off from the state
        var _state = this.state,
            isLoading = _state.isLoading,
            location = _state.location,
            temp = _state.temp;

        // Conditionally render components given a certain state

        function renderMessage() {
            if (isLoading) {
                return React.createElement(
                    'h3',
                    null,
                    'Fetching weather ...'
                );
            } else if (temp && location) {
                return React.createElement(WeatherMessage, { location: location, temp: temp });
            }
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'Weather Component'
            ),
            React.createElement(WeatherForm, { onSearch: this.handleSearch }),
            renderMessage()
        );
    }
});

module.exports = Weather;

//# sourceMappingURL=Weather.js.map