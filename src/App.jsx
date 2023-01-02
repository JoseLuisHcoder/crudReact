import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'
import CardUser from './components/CardUser'
import FormUser from './components/FormUser'
import { useFormContext } from 'react-hook-form'

function App() {
  const [users, setUsers] = useState()


const getAllUsers = () => {
  const URL = 'https://users-crud.academlo.tech/users/'
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
}

  useEffect(() => {
    getAllUsers()
  }, [] )

  const createNewUser = data => {
    const URL = 'https://users-crud.academlo.tech/users/'
    axios.post(URL, data)
      .then(() => getAllUsers() )
      .catch(err => console.log(err))
  }

const deleteUserById = id => {
  const URL = `https://users-crud.academlo.tech/users/${id}`
  axios.delete(URL)
    .then(() => getAllUsers())
    .catch(err => console.log(err))
}

  console.log(users);
  return (
    <div className="App">
      <h1>Users</h1>
      <button>Open Form</button>

      <section>
        <FormUser 
          createNewUser={createNewUser}
        />
      </section>
      <div className='user__container'>
        {
          users?.map(user => (
            <CardUser 
            key={user.id}
            user={user}
            deleteUserById={deleteUserById}
            />
          ))
        }
      </div>
      
    </div>
  )
}

export default App
