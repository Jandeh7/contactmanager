import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

// import './Contact.css';

class Contact extends Component {
    state = {
        showContactInfo: false
    };

    onDeleteClick = async (id, dispatch) => {
        try{
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            dispatch({type: 'DELETE_CONTACT', payload: id});
        } catch (e) {
            dispatch({type: 'DELETE_CONTACT', payload: id});
        }
       
    }

    render() {
        const { id, name, email, phone } = this.props.contact;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="contact-box card card-body mb3">
                            <h4>{name} {' '}
                                <i onClick={()=>
                                    this.setState({ showContactInfo: 
                                    !this.state.showContactInfo })
                                } 
                                    className="fas fa-sort-down" 
                                    style={{cursor:'pointer'}}
                                />
                                {/* <i className="fas fa-edit" 
                                    style={{ cursor: 'pointer', color: 'red' }}
                                    onClick={this.onDeleteClick.bind (this, id, dispatch)
                                    }
                                /> */}
                                <i className="fas fa-times" 
                                    style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                                    onClick={this.onDeleteClick.bind (this, id, dispatch)
                                    }
                                />
                                <Link to={`contact/edit/${id}`}>
                                    <i className="fas fa-pencil-alt"
                                    style={{ cursor: 'pointer',
                                    float: 'right', color: 'black',
                                    marginRight: '1rem'
                                    }}></i>
                                </Link>
                            </h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                            ) : null}
                        </div>
                    )
                }}
            </Consumer>
        );

        // return React.createElement (
        //     'div',
        //     { className: 'myDiv'},
        //     React.createElement (
        //         'h4',
        //         null,
        //         'John Doe',
        //     ),
        //     React.createElement (
        //         'ul',
        //         null,
        //         React.createElement (
        //             'li',
        //             null,
        //             'Email:jdoe@gmail.com',
        //         ),
        //         React.createElement (
        //             'li',
        //             null,
        //             'Phone: 333-444-5555',
        //         )
        //     )
        // )
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired
};

export default Contact;