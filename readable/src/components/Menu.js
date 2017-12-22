/**
 * Created by apaivaer on 20/12/2017.
 */
import React, { Component } from 'react'

class Menu extends Component {

    render() {
        return (
        <div className="menuContainer">
            <ul className="menu">
                <li className="menuItem" style={{'font-family': 'Pacifico', 'font-size':'40px'}}>Readable</li>
                {this.props.menuItems.map((menuItem)=>(
                    <li className="menuItem">{menuItem.name}</li>
                ))}
            </ul>
        </div>
        )
    }
}

export default Menu