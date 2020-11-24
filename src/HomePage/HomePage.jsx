import React from 'react';
import '../styles.less';


import { userService, authenticationService } from '@/_services';
import { configureFakeBackend, Role } from '../_helpers';

class HomePage extends React.Component {

    
    constructor(props) {
        super(props);


        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }


    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));
    }
    

    render() {
        const { currentUser, userFromApi } = this.state;
        return (
            <div>
                <h1 className="h1">Persoonlijke dashboard</h1>
                <p className="p">  Welkom terug <strong>{currentUser.firstName}</strong>.</p>
                <div className="flexbox">
                <input className="input-dashboard" disabled placeholder={currentUser.firstName}></input>
                <input className="input-dashboard" disabled placeholder={currentUser.woz}></input>     
                <input className="input-dashboard" disabled placeholder={currentUser.loanType}></input>     
                <p></p>

                <input className="input-dashboard" disabled placeholder="Doe"></input>
                <input className="input-dashboard" disabled placeholder={currentUser.restLoan}></input>
                <input className="input-dashboard" disabled placeholder={currentUser.rente}></input>

                <p></p>
                <input className="input-dashboard" disabled placeholder={currentUser.adres}></input>
                <p></p>
                <input className="input-dashboard" disabled placeholder={currentUser.city}></input>
                <p></p>
                <input className="input-dashboard" disabled placeholder={currentUser.country}></input>     
                
                         
                </div>

            </div>

        );
    }
}

export { HomePage };