import { authenticationService, userService } from '@/_services';
import React from 'react';
import '../styles.less';
import { clients } from '../_helpers/clients';





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


    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1 className="h1">Medewerker dashboard</h1>
                <div className="flexbox">
                    <div>
                        Klanten van jouw organisatie
                        <p></p>
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

        );
    }
}

export { DashBoard };
