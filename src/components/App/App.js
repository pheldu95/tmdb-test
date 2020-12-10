import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {
  // Renders the entire app on the DOM
  state ={
    horrorSwitch: false,
    exampleSwitch: false,
    horror: []
  }
  componentDidMount() {
    //this.getAPI();
  }
  getAPI = () => {
    axios({
      method: 'GET',
      url: '/example'
    }).then((response) => {
      console.log(response);

      this.props.dispatch({
        type: 'SET_EXAMPLE',
        payload: response.data
      })
      
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
    this.setState({
      exampleSwitch: true,
      horrorSwitch: false
    })
  }
  
  getHorror = () => {
    axios({
      method: 'GET',
      url: '/horror'
    }).then((response) => {
      console.log(response);

      this.props.dispatch({
        type: 'SET_HORROR',
        payload: response.data
      })
      console.log('response going to state:', response);
      this.setState({
        horror: response.data
      })

    }).catch((error) => {
      console.log(error);
      alert(error);
    })
    this.setState({
      exampleSwitch: false,
      horrorSwitch: true
    })
  }

  handleChange = (event) =>{
    console.log(event.target.value);
    
      this.setState({
        rating: event.target.value
      })
  }
  render() {
    let example = this.props.reduxState.example;
    let horror = this.state.horror;
    return (
      <div>
        <header className="App-header">
          <h1>Test TMDB</h1>
          <button onClick={this.getAPI}>get example movie</button>
          <button onClick={this.getHorror}>get popular horror movies</button>
        </header>
  
        {/* the && make it so it waits until this.props.reduxState.random.data exists before following through with the rest */}
        {this.state.exampleSwitch?
          example&&
              
            <img src={'https://image.tmdb.org/t/p/w1280' + example.poster_path} alt='movie poster' style={{width: "500px"}}/>
          :<></>

        }
        {this.state.horrorSwitch ?
          horror &&
            //<h1>{JSON.stringify(horror.results)}</h1>
            horror.map((movie) => {
              return (
                <img src={'https://image.tmdb.org/t/p/w1280' + movie.poster_path} alt='movie poster' style={{ width: "200px" }} />
              )
            })
          //<img src={'https://image.tmdb.org/t/p/w1280' + example.poster_path} alt='movie poster' style={{ width: "500px" }} />
          
          : <></>

        }
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState
});

export default connect(putReduxStateOnProps)(App);
