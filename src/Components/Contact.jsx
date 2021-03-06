import React from 'react';
import {API} from 'aws-amplify';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var myAPI = "ContactAPI";
var path = '/contact/send';

class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            message: ""
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        var myInit = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
            }
        }
        await API.post(myAPI, path, myInit)
        .then((res) => {
            console.log(res);
            if (res.status === 200){
                toast.success("Message Sent!", {
                    position: 'bottom-right',
                    hideProgressBar: true,
                    progress: undefined,
                });
                this.formReset();
            }
            else {
                toast.error("Message failed to send :(", {
                    position: 'bottom-right',
                    hideProgressBar: true,
                    progress: undefined,
                });
            }
        }, (err) => {
            console.log(err);
        });
    }

    formReset(){
        this.setState({name: "", email: "", message: ""})
    }

    onNameChange(e){
        this.setState({name: e.target.value})
    }

    onEmailChange(e){
        this.setState({email: e.target.value})
    }

    onMessageChange(e){
        this.setState({message: e.target.value})
    }

    render(){
        return(
            <div className="page-container">
                <ToastContainer />
                <div className="top-banner">
                    <h4 className="text-center">🚧 Under construction 🚧</h4>
                </div>
                <section className="content-padding">
                    <h2 className="heading">Contact</h2>
                    <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" placeholder="Firstname Lastname" onChange={this.onNameChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleEmail">Email Address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="example@email.com" onChange={this.onEmailChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea className="form-control" rows="5" placeholder="Message goes here!" onChange={this.onMessageChange.bind(this)}></textarea>
                        </div>
                        <button type="submit" className="btn large btn-outline-light">Send</button>
                    </form>
                </section>
            </div>
        )
    }
}

export default Contact;