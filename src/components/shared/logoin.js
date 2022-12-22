import React, { useState } from 'react'

export const Login = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    })
    const sendReq = () => {
        fetch('http://ec2-52-66-43-154.ap-south-1.compute.amazonaws.com:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": state.username, 'password': state.password })
        })
            .then(response => response.json())
            .then(response => localStorage.setItem("token",response))
        
    }
    const getdata = (e) => {
        const { name, value } = e.target;
        state[name] = value;
        setState({ ...state })

    };



    console.log(state);
    return (
        <div>
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="text" name='username' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={getdata} />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name='password' class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={getdata} />
                </div>
                <button type="button" class="btn btn-primary" onClick={sendReq}>Submit</button>
            </form>
        </div>
    )
}
