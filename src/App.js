import React, { Component } from 'react'
import Cards from "./components/Cards/Cards"
import Chart from "./components/Chart/Chart"
import CountryPicker from './components/CountryPicker/CountryPicker'
import {fetchData} from './api'
import Spinner from './spinner/Spinner'
import styles from './App.module.css'
import img from './static/image.png'

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
export default class App extends Component {
  state={
    data:{},
    country:"",
    
  }
   getLocation=()=> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser."); 
    }
  }
  async componentDidMount() {
    this.getLocation();
    
   const res= await fetchData();
    this.setState({data:res});
   
  }
   showPosition=(position)=> {
    var x = "Latitude: " + position.coords.latitude +
    "Longitude: " + position.coords.longitude;
    console.log(x);
  }
  handleCountryChange=async (country)=>{
     const fetchedData= await fetchData(country);
     this.setState({data:fetchedData,country:country})
  }
  //console.log()

  
  render() {
  
    return (
      <>
      
     
        <div className={styles.container}>
      <img src={img} alt="covid19" className={styles.image}></img>
      {console.log(Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object)}
      {Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object?<Spinner />:<Cards data={this.state.data}/>}
     {Object.keys(this.state.data).length === 0 && this.state.data.constructor === Object?<Spinner />:<CountryPicker handleCountryChange={this.handleCountryChange}/>} 
      <Chart data={this.state.data} country={this.state.country}/>
        
      </div>
     
      
      </>
    )
  }
}
