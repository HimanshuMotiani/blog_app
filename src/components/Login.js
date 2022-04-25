import React from 'react'
import validateErrors from '../utils/validateErrors'
import { NavLink } from 'react-router-dom';
import {LoginURL} from '../utils/constants';
import { withRouter } from 'react-router-dom';
import UserContext from './UserContext';
class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email:'chichi1@gmail.com',
            password:'123456',
            errors:{
                email:'',
                password:'',  
            }
        }
    }
    static contextType = UserContext
    handleChange = (event)=>{
        let {name,value} = event.target;
        let errors = this.state.errors;
        validateErrors(errors,name,value)
        this.setState({[name]:value})
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        console.log(this.state.email,this.state.password);
        let data = {
            user:{
                email:this.state.email,
                password:this.state.password
            }
        }
        fetch(LoginURL,
            {method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })
        .then((res)=>{
            if(!res.ok){
                return res.json().then(({errors})=>{
                    return Promise.reject(errors)
                })
            }
            return res.json();
        })
        .then(({user})=> {
            this.context.updateUser(user)
            this.props.history.push('/');
        })
        .catch((errors)=>{
            this.setState({
              errors:{
                email:'Email or password is incorrect!'
              }
            })
        })
    }
    render(){
        let {email,password,errors} = this.state

        return (
            <>
            <div className="container">
            <div className="text-center mt-10">
                <h2 className="text-4xl">Sign in</h2>
                <div className="my-3">
                <NavLink to="/signup" className="primColor cursor-pointer">Need an account?</NavLink>
                </div>
            </div>
            <form onSubmit={this.handleSubmit} className="text-center">
                <input type="text" className="input-field" name="email" value={email} onChange={this.handleChange} placeholder="Email"/>
                <span className="text-red">{errors.email}</span>
                <input type="text" className="input-field" name="password" value={password} onChange={this.handleChange} placeholder="Password"/>
                <span className="text-red">{errors.password}</span>
                <div>
                <button type="submit" className="primBack text-white py-2 px-4 rounded-lg text-xl inline-block mt-5" disabled={errors.email || errors.password}>Sign in</button>
                </div>
            </form>
            </div>
            
            </>
        )
    }
}
export default withRouter(Login)