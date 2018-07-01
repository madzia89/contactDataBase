import React, {Component} from 'react'
import {filteredList, firstLetterToUpperCase, openModal, selectCategory, secondFilter, checkLiNumber, clearSelects} from "./utils"
import _ from 'lodash'
import {Grid, Row} from 'react-flexbox-grid'
import {passClickedContact} from "../state/contactsList"
import {connect} from "react-redux"
import {ModalForSingleContact} from './ModalForSingleContact'

class ContactComponent extends Component {
    state = {
        currentPage: 1,
        contactsPerPage: 10,
        stateForAdvancedSearchInput: '',
        contacts: this.props.fullList,
        basicSearchInput: ''
    }

    componentWillReceiveProps(props) {
        if (props.fullList !== this.state.contacts) {
            this.setState({contacts: props.fullList}, () => this.basicFilter())
        }
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
        const actualContacts = this.props.fullList
        const basicSearchInput = this.state.basicSearchInput
        const selectWithCategories = document.getElementById('selectWithCategories').value
        const advancedSearchInput = document.getElementById('advancedSearchListInput')

        if (basicSearchInput === '') {
            advancedSearchInput.className = 'contactComponent__advancedSortInputInvisible'
        } else {
            advancedSearchInput.className = 'contactComponent__advancedSortInputVisible'
        }
        const afterSecondFilter = filteredList(actualContacts, selectWithCategories, basicSearchInput)

        return (
            this.setState({contacts: afterSecondFilter})
        )
    }

    render() {
        const theaders = ['PICTURE', 'NAME', 'LAST NAME', 'EMAIL', 'CITY', 'MORE']
        const myContacts = secondFilter(this.state.contacts, this.state.stateForAdvancedSearchInput)
        const {currentPage, contactsPerPage} = this.state
        const indexOfLastContact = currentPage * contactsPerPage
        const indexOfFirstContact = indexOfLastContact - contactsPerPage
        const currentContacts = myContacts.slice(indexOfFirstContact, indexOfLastContact)

        const renderContacts = currentContacts.map((contact, index) => {
            return (
                <tr key={contact.phone + contact.id.value} className={'contactsComponent__tableRows  paperLike'}>
                    <td className={'contactComponent__table__tableRow_td'}>
                        {<img src={contact.picture.thumbnail} alt={`${contact.name.first}`}/>}
                    </td>
                    <td className={'contactComponent__table__tableRow_td'}>
                        {firstLetterToUpperCase(contact.name.first)}
                    </td>
                    <td className={'contactComponent__table__tableRow_td'}>
                        {firstLetterToUpperCase(contact.name.last)}
                    </td>
                    <td className={'contactComponent__table__tableRow_td'}>
                        {contact.email}
                    </td>
                    <td className={'contactComponent__table__tableRow_td'}>
                        {firstLetterToUpperCase(contact.location.city)}
                    </td>
                    <td className={'contactComponent__table__tableRow_td'}>
                        {<button
                            className={'contactComponent__table__tableRows_btn'}
                            id={'myBtn'}
                            onClick={() => {
                                this.props.passClickedContact(contact)
                                openModal()
                            }}
                        >
                            more
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
                    className={checkLiNumber(number, this.state.currentPage, myContacts.length)}
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
                        <Row center={'xs'} className={'contactsComponent__rowWithSearch'}>
                            <p style={{textAlign: 'center'}}>sort by: </p>
                            <select
                                id={'selectWithCategories'}
                                onChange={() => {
                                    selectCategory()
                                }}>
                                <option value="empty"> </option>
                                <option value="name.first">name</option>
                                <option value="name.last">last name</option>
                                <option value="location.city">city</option>
                            </select>

                            <select id={'secondSelect'}
                                    onChange={this.sortContacts}>
                            </select>
                            <input
                                className={'contactComponent__basicSearchInput'}
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
                                className={'contactComponent__advancedSortInputInvisible'}
                                value={this.state.stateForAdvancedSearchInput}
                                onChange={(event) => {
                                    this.setState({stateForAdvancedSearchInput: event.target.value})
                                }}
                            >
                            </input>
                            <button
                                className={'contactComponent__search__clearBtn'}
                                type="button"
                                onClick={() => {
                                    this.setState({basicSearchInput: '', stateForAdvancedSearchInput: ''},
                                        () => this.basicFilter(),
                                        clearSelects()
                                    )
                                }}
                            >
                                CLEAR
                            </button>
                        </Row>
                        <table className={'contactsComponent__table'}>
                            <thead>
                            <tr>
                                {theaders.map((header, i) => {
                                    return <th key={`${header}${i}`} className={`contactsComponent__table_th${i} contactsComponents__table_th`}>{header}</th>
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactComponent)