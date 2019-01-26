import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import Script from "react-load-script";
import PlacesAutocomplete, {geocodeByAddress,  getLatLng,} from 'react-places-autocomplete';
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './testActions'

const mapState = (state) => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
}


class TestComponent extends Component {
  state={
    address: "",
    scriptLoaded: false
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = (address) => this.setState({ address })

   scriptLoad = () => {
    this.setState({scriptLoaded: true})
  }
  

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    const {incrementCounter, decrementCounter, data} = this.props;
    return (
      <div>
        <Script 
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJW1DNdJfsoveoCLjJaLbHSDxVoxV0p8c&libraries=places"
        onLoad={this.scriptLoad}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='Increment' />
        <Button onClick={decrementCounter} color='red' content='Decrement' />
        <br/><br/>
        <form onSubmit={this.handleFormSubmit}>
        {this.state.scriptLoaded && 
        <PlacesAutocomplete inputProps={inputProps} />
      } 
        <button type="submit">Submit</button>
      </form>

      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent)