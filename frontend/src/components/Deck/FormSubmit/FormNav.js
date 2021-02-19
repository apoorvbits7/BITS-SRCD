import React from 'react';
import { NavLink } from 'react-router-dom';

class FormNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="fields">
                <span className="heading">Application</span>
                <div className="pages">
                    <NavLink exact to="/deck/form/" className="pageLabel" activeClassName="active">
                        Basic Details
                    </NavLink>
                    <NavLink exact to="/deck/form/paper-details" className="pageLabel" activeClassName="active">
                        More Details
                    </NavLink>
                    <NavLink exact to="/deck/form/uploads" className="pageLabel" activeClassName="active">
                        Uploads
                    </NavLink>
                    {/* <NavLink exact to="/xyz" className="pageLabel" activeClassName="active">
                        Page 4
                    </NavLink> */}
                </div>
            </div>
        )
    }
}

export default FormNav;