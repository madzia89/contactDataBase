import React, {Component} from 'react'
import {firstLetterToUpperCase} from "./utils"
import {Grid, Row} from 'react-flexbox-grid'
import {
    selectCategory,
    sortContacts,
    changeStateForInput,
    clearFormFields,
    changeStateForAdvancedInput,
} from "../state/contactsList"
import {connect} from "react-redux"
import TextInModal from "./TextInModal"

class ContactComponent extends Component {
    state = {
        currentPage: 1,
        contactsPerPage: 10,
        clickedContact: {}
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        })
    }

    openModal = () => {
        const modal = document.getElementById('myModal')
        modal.style.display = "block"
    }

    clickOnSpanClose = () => {
        const modal = document.getElementById('myModal')
        modal.style.display = "none";
    }

    render() {
        // window.onClick = (event) => {
        //     const modal = document.getElementById('myModal')
        //     if (event.target !== modal) {
        //         modal.style.display = "none";
        //     }
        // }

        const myContacts = this.props.contacts.filter(name => {
            return (
                name.name.first.includes(this.props.stateForAdvancedSearchInput) ||
                name.name.last.includes(this.props.stateForAdvancedSearchInput) ||
                name.location.city.includes(this.props.stateForAdvancedSearchInput) ||
                name.email.includes(this.props.stateForAdvancedSearchInput) || !name
            )
        })
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
                            id={'myBtn'}
                            onClick={() => {
                                this.setState({clickedContact: contact})
                                this.openModal()

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
                            <input
                                id={'advancedSearchListInput'}
                                className={'thisInputIsInvisible'}
                                type={'text'}
                                value={this.props.stateForAdvancedSearchInput}
                                onChange={(event) => {
                                    this.props.changeStateForAdvancedInput(event.target.value)
                                }}
                            >
                            </input>
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

                <div
                    id="myModal"
                    className="modal"
                    onClick={(event) => {
                        const modal = document.getElementById('myModal')
                        if (event.target === modal) {
                            modal.style.display = "none";
                        }
                    }
                    }
                >
                    <div className="modal-content">
                        <span className="close"
                              onClick={() => this.clickOnSpanClose()}>&times;</span>
                        <TextInModal
                            clickedContact={this.state.clickedContact}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contacts: state.contactsList.contacts,
    stateForSearchInput: state.contactsList.stateForSearchInput,
    fullList: state.contactsList.fullList,
    stateForAdvancedSearchInput: state.contactsList.stateForAdvancedSearchInput,
})

const mapDispatchToProps = dispatch => ({
    selectCategory: () => dispatch(selectCategory()),
    sortContacts: () => dispatch(sortContacts()),
    changeStateForInput: (val) => dispatch(changeStateForInput(val)),
    clearFormFields: (val) => dispatch(clearFormFields(val)),
    changeStateForAdvancedInput: (val) => dispatch(changeStateForAdvancedInput(val)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactComponent)
