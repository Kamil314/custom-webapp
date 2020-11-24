import React from 'react';

import { userService } from '@/_services';
import { configureFakeBackend, Role } from '../_helpers';
import { usersArray } from '../_helpers/array';

class AdminPage extends React.Component {
    
    constructor(props) {
        
        super(props);

        this.state = { 
            users: null,
            list: usersArray,
        };

    }
  
    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
         //this.setState({ list: usersArray });

    }

    add () {
    
        const addedList = [];
        const workers = ['Kamil', 'Sebas', 'Wieslaw', 'Andrej', 'Angela']
        let userName = document.getElementById('worker').value
  
        if(workers.indexOf(userName) !== -1){
            alert(userName + ' is bestaat al binnen de organisatie.')
        } else{
            console.log("Nieuwe medewerker toegevoegd")
            addedList.push({ id: 1, username: userName, password: 'asd', firstName: 'asd', role: Role.User })
            console.log('addedlist', addedList)
            const finalList = this.state.list + addedList;
            this.setState({ list: finalList });
              console.log('last second list', finalList)
        }
    }

    remove () {
    
        const workers = ['Kamil', 'Sebas', 'Wieslaw', 'Andrej', 'Angela']
        let userName = document.getElementById('worker').value
  
        if(workers.indexOf(userName) !== -1){
            alert('Wil je '+ userName + ' zeker verwijderen?')
        } else{
            alert(userName + ' bestaat niet in je systeem.')
        }
    }

   

    render() {
        const { users } = this.state;

     
        return (
            <div>
                <h1>Manager Panel</h1>
                <p></p>
                <div>
               <strong>Iedereen van jou organisatie</strong> 
                    {users &&
                        <ul>
                            {users.map(user =>
                                <li key={user.id}> <strong>Naam: </strong>  {user.firstName} <strong>Rol: </strong> {user.role}</li>
                            )}
                        </ul>
                        
                    }

                   

                </div>
               <h1>Medewerker toevoegen/verwijderen</h1>
               <input id='worker' placeholder={"Naam medewerker"}></input>
                    <p></p>
                    <p></p>
                    <p></p>
               <button onClick={this.add}>Voeg deze medewerker</button>
               <button onClick={this.remove}>Verwijder alle autorisaties</button>

               
            </div>
        );
    }
}


export { AdminPage };