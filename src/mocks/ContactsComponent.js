import React, {Component} from 'react'
import {firstLetterToUpperCase} from "./utils";
import {Grid, Row} from 'react-flexbox-grid'
import {selectCategory, sortContacts, changeStateForInput, clearFormFields} from "../state/contactsList";
import {connect} from "react-redux";

class ContactComponent extends Component {
    state = {
        currentPage: 1,
        contactsPerPage: 10,
        valueForTextInput: ''
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        })
    }

    render() {
        const myContacts = this.props.contacts
        const {currentPage, contactsPerPage} = this.state;

        const indexOfLastContact = currentPage * contactsPerPage;
        const indexOfFirstContact = indexOfLastContact - contactsPerPage;
        const currentContacts = myContacts.slice(indexOfFirstContact, indexOfLastContact);

        const renderContacts = currentContacts.map((contact, index) => {
            return (
                <tr key={contact.phone + contact.id.value}>
                    <td>
                        {<img src={contact.picture.thumbnail} alt={`${contact.name.first}`}/>}
                    </td>
                    <td>
                        {firstLetterToUpperCase(contact.name.first)}
                    </td>
                    <td>
                        {firstLetterToUpperCase(contact.name.last)}
                    </td>
                    <td>
                        {contact.email}
                    </td>
                    <td>
                        {firstLetterToUpperCase(contact.location.city)}
                    </td>
                    <td>
                        {<button
                            onClick={() => {
                                console.log(contact.email)
                            }
                            }
                        >
                            clickForMore
                        </button>}
                    </td>
                </tr>)
        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(myContacts.length / contactsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={(ev) => this.handleClick(ev)}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>
                {(this.props.fullList && this.props.fullList.length) ?
                    <Grid>
                        <Row center={'xs'}>
                            <h2 style={{textAlign: 'center'}}>sort by: </h2>
                        </Row>
                        <Row center={'xs'}>
                            <select
                                id={'selectWithCategories'}
                                onChange={() => {
                                    this.props.selectCategory()
                                }}>
                                <option value="empty"></option>
                                <option value="name.first">name</option>
                                <option value="name.last">last name</option>
                                <option value="location.city">city</option>
                            </select>

                            <select id={'secondSelect'}
                                    onChange={this.props.sortContacts}>
                            </select>
                            <input
                                type={'text'}
                                value={this.props.stateForSearchInput}
                                onChange={(event) => {
                                    this.props.changeStateForInput(event.target.value)
                                }}
                            >
                            </input>
                            <button
                                type="button"
                                onClick={() => {
                                    this.props.clearFormFields()
                                }}
                            >
                                CLEAR
                            </button>
                        </Row>
                        <table>
                            <thead>
                            <tr>
                                <th>pic</th>
                                <th>first name</th>
                                <th>last name</th>
                                <th>email</th>
                                <th>city</th>
                                <th>more</th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderContacts}
                            </tbody>
                        </table>
                    </Grid>
                    :
                    null
                }
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contacts: state.contactsList.contacts,
    fullList: state.contactsList.fullList,
    stateForSearchInput: state.contactsList.stateForSearchInput,
})

const mapDispatchToProps = dispatch => ({
    selectCategory: () => dispatch(selectCategory()),
    sortContacts: () => dispatch(sortContacts()),
    changeStateForInput: (val) => dispatch(changeStateForInput(val)),
    clearFormFields: (val) => dispatch(clearFormFields(val)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactComponent)
