import React, {Component} from 'react';
import "./Crypto.css";

class Elements extends Component {

    render () {
        const lists = this.props.lists;

    return(
            <ul>
                {lists.map(lists =>
                    <li key={lists.cur}  >Last rate: 
                    <span className={lists.class}>{lists.last} {lists.arrow}</span>
                    <strong>{lists.cur}</strong> 
                    <span>[{lists.symbol}}</span>
                    </li>
                )}
            </ul>
        )
    }
}

export default Elements;