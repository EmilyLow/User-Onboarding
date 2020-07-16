import React from 'react';


const UserList = props => {

  


  


    return (
       
        
        
        <div className="peopleList">
           <h1>Users:</h1>
            {props.list.map( (person) =>
            <p>{person.name}</p>


            )}
        
        </div>
        
    );


}

export default UserList;