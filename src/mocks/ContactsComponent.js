import React, {Component} from 'react'
import {filteredList, firstLetterToUpperCase, openModal, selectCategory, secondFilter} from "./utils"
import _ from 'lodash'
import {Grid, Row} from 'react-flexbox-grid'
import {passClickedContact} from "../state/contactsList"
import {connect} from "react-redux"
import {ModalForSingleContact} from './ModalForSingleContact'
import {getCurrentContactValue} from "../state/singleContactChange"

class ContactComponent extends Component {
    state = {
        currentPage: 1,
        contactsPerPage: 10,
        stateForAdvancedSearchInput: '',
        fullListClone: this.props.fullList,
        contacts: this.props.fullList,
        basicSearchInput: ''
    }

    handleClick(event) {
        this.setState({currentPage: Number(event.target.id)})
    }

    sortContacts = () => {
        let currentState = this.state.contacts
        const pickedValueFromCategorySelect = document.getElementById('selectWithCategories').value
        const pickedValueFromSecondSelect = document.getElementById('secondSelect').value
        if (pickedValueFromSecondSelect === '1') {
            let toBeNewState = _.orderBy(currentState, [`${pickedValueFromCategorySelect}`], ['asc', 'desc'])
            return this.setState({contacts: toBeNewState})
        } else if (pickedValueFromSecondSelect === '2') {
            let toBeNewState = _.orderBy(currentState, [`${pickedValueFromCategorySelect}`], ['desc', 'asc'])
            return this.setState({contacts: toBeNewState})
        }
    }

    basicFilter = () => {
        const actualContacts = this.state.fullListClone
        const basicSearchInput = this.state.basicSearchInput
        const selectWithCategories = document.getElementById('selectWithCategories').value
        const advancedSearchInput = document.getElementById('advancedSearchListInput')

        if (basicSearchInput === '') {
            advancedSearchInput.className = 'thisInputIsInvisible'
        }
        else {
            advancedSearchInput.className = 'thisInputIsVisible'
        }
        const afterSecondFilter = filteredList(actualContacts, selectWithCategories, basicSearchInput)

        return (
            this.setState({contacts: afterSecondFilter})
        )
    }

    render() {
        const theaders = ['pic', 'first name', 'last name', 'email', 'city', 'more']

        const myContacts = secondFilter(this.state.contacts, this.state.stateForAdvancedSearchInput)

        const {currentPage, contactsPerPage} = this.state
        const indexOfLastContact = currentPage * contactsPerPage
        const indexOfFirstContact = indexOfLastContact - contactsPerPage
        const currentContacts = myContacts.slice(indexOfFirstContact, indexOfLastContact)

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
                                this.props.passClickedContact(contact)
                                openModal()
                                this.props.getCurrentContactValue()
                            }}
                        >
                            clickForMore
                        </button>}
                    </td>
                </tr>)
        })

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(myContacts.length / contactsPerPage); i++) {
            pageNumbers.push(i)
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
            )
        })

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
                                    selectCategory()
                                }}>
                                <option value="empty"></option>
                                <option value="name.first">name</option>
                                <option value="name.last">last name</option>
                                <option value="location.city">city</option>
                            </select>

                            <select id={'secondSelect'}
                                    onChange={this.sortContacts}>
                            </select>
                            <input
                                type={'text'}
                                value={this.state.basicSearchInput}
                                onChange={(event) => {
                                    this.setState({basicSearchInput: event.target.value},
                                        () => this.basicFilter())
                                }}
                            >
                            </input>
                            <input
                                id={'advancedSearchListInput'}
                                className={'thisInputIsInvisible'}
                                value={this.state.stateForAdvancedSearchInput}
                                onChange={(event) => {
                                    this.setState({stateForAdvancedSearchInput: event.target.value})
                                }}
                            >
                            </input>
                            <button
                                type="button"
                                onClick={() => {
                                    this.setState({basicSearchInput: '', stateForAdvancedSearchInput: ''})
                                }}
                            >
                                CLEAR
                            </button>
                        </Row>
                        <table>
                            <thead>
                            <tr>
                                {theaders.map((header, i) => {
                                    return <th key={`${header}${i}`}>{header}</th>
                                })}
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
                <ModalForSingleContact/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fullList: state.contactsList.fullList,
})

const mapDispatchToProps = dispatch => ({
    passClickedContact: (val) => dispatch(passClickedContact(val)),
    getCurrentContactValue: () => dispatch(getCurrentContactValue())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactComponent)