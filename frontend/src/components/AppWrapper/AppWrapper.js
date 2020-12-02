import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Deck from '../Deck/Deck';
import React from 'react'

class AppWrapper extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <div className="DeckWrapper">
                    <Sidebar />
                    <Deck />
                </div>
            </>
        )
    }
}

export default AppWrapper;