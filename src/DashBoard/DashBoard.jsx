import { authenticationService, userService } from '@/_services';
import React from 'react';
import { clients } from '../_helpers/clients';
import '../styles.less';
import { Role } from '../_helpers';



class DashBoard extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null,
            users: clients


        };
    }



    componentDidMount() {
        const { currentUser } = this.state;
        userService.getById(currentUser.id).then(userFromApi => this.setState({ userFromApi }));

    }

    // handleClientClick() {
    //     const clientList = ['Rob', 'John', 'Angel', 'Sebastian', 'Wolski', 'Patryk', 'Peter', 'Miranda', 'Mohamed']
    //     userService.getByName(clientList[0]);
    // }
    render() {
        const clientList = ['Rob', 'John', 'Angel', 'Sebastian', 'Wolski', 'Patryk', 'Peter', 'Miranda', 'Mohamed']
        const { currentUser, users } = this.state;



        return (

            <div>





                <h1 className="h1">Medewerker dashboard</h1>
                <div className="flexbox">
                    <div>
                        Klanten van jouw organisatie
                        <p></p>
                        {/* <input onClick={this.handleClientClick} className="input-dashboard" disabled placeholder={clientList[0]}></input>
                        <input className="input-dashboard" disabled placeholder={clientList[1]}></input>
                        <input className="input-dashboard" disabled placeholder={clientList[2]}></input>
                        <input className="input-dashboard" disabled placeholder={clientList[3]}></input>
                        <input className="input-dashboard" disabled placeholder={clientList[4]}></input>
                        <p></p>
                        <input className="input-dashboard" disabled placeholder={clientList[5]}></input>
                        <input className="input-dashboard" disabled placeholder={clientList[6]}></input>
                        <p></p>
                        <input className="input-dashboard" disabled placeholder={clientList[7]}></input>
                        <input className="input-dashboard" disabled placeholder={clientList[8]}></input> */}
                        <div className="client-box">
                        {users &&
                            <ul>
                                {users.map(users =>
                                    <li key={users}> <strong> Naam: </strong> {users.firstName} 
                                    <br></br>
                                     Adres:  <strong> {users.adres} </strong> 

                                     <br></br> <strong> {users.rente} </strong> 
                                    <br></br>
                                    {users.restLoan}

                                    
                                    <p></p>
                                    <p></p>

                                     </li>
                                     
                                )}
                                

                            </ul>
                        }
                        </div>

                        
                       
                    </div>
                </div>
                <p>Je bent ingelogd als:  <strong>{currentUser.firstName}</strong>.</p>

            </div>
            //

        );
    }
}

export { DashBoard };
