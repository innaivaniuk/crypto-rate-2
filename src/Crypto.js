import React, { Component } from 'react';
import axios from 'axios';
import "./Crypto.css";


import Elements from "./Elements.js"

class CryptoRate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            elements: []
        }
    }

    fetchData = () =>{
        axios.get("https://blockchain.info/pl/ticker")
        .then(response => {
        let elements = [];
        let oldCryptolist = this.state.elements;
       
     

        for (let key in response.data) {
            let newRate = {
                cur: key,
                last:response.data[key].last,
                symbol:response.data[key].symbol,   
            }

            let oldRate = oldCryptolist.find(oldRate => oldRate.cur === newRate.cur)
           
            if(oldRate !== undefined) {
                if(newRate.last > oldRate.last) {
                    newRate.class = 'green'
                    newRate.arrow = String.fromCharCode(8593);
                } else if (newRate.last <oldRate.last) {
                    newRate.class = 'red';
                    newRate.arrow = String.fromCharCode(8595);

                } else if (newRate.last === oldRate.last){
                    newRate.class= 'blue'
                    newRate.arrow = String.fromCharCode(8596);
                } 
                  }else {
                    newRate.class = 'blue'
                    newRate.arrow = String.fromCharCode(8596);
                }
            


            elements.push(newRate);
        }

        this.setState({ elements });
        })
    }

        onFilter = () =>{

            let filter = this.inputValue.value.trim().toUpperCase();
            let filteredelements = this.state.elements;

            filteredelements = filteredelements.filter(rate => {
                return rate.cur.includes(filter);
            });

            this.setState( { elements:filteredelements})

        }

        


 componentDidMount (){
    this.fetchData();
    setInterval(() => {
        if (this.inputValue.value === ''){
            this.fetchData(); 
        }
        
    }, 5000);

}

  

    render () {
        console.log(this.state.elements)
      
        return (
            <div className="currency">
            <header> <i className="fab fa-bitcoin"></i>
                Crypto Rate
            </header>
            <input type="text" placeholder="Filter" ref={input => this.inputValue = input}
            onChange={this.onFilter}
            />
          
             
             <Elements 
              lists={this.state.elements} 
             />


            </div>


        )
    }
}
export default CryptoRate;