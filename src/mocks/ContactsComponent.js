import React, {Component} from 'react'
import {firstLetterToUpperCase} from "./utils";
import {Grid, Row, Col} from 'react-flexbox-grid'
import {initUsers} from "../state/contactsList";
import {connect} from "react-redux";
import _ from 'lodash';


class ContactComponent extends Component {
    state = {
        classNameForNameSelect: 'itIsInvisible',
        classNameForLastNameSelect: 'itIsInvisible',
        classNameForCitySelect: 'itIsInvisible',
    }

    showSelectWithName = () => {
        const selectorWithCategories = document.getElementById('selectWithCategories').value
        ;(selectorWithCategories === 'name') ?
            this.setState({classNameForNameSelect: 'itIsVisible'})
            :
            this.setState({classNameForNameSelect: 'itIsInvisible'})

        ;(selectorWithCategories === 'lastName') ?
            this.setState({classNameForLastNameSelect: 'itIsVisible'})
            :
            this.setState({classNameForLastNameSelect: 'itIsInvisible'})

        ;(selectorWithCategories === 'city') ?
            this.setState({classNameForCitySelect: 'itIsVisible'})
            :
            this.setState({classNameForCitySelect: 'itIsInvisible'})

    }

    selectedValue = () => {
        const selectWithName = document.getElementById('selectWithName').value
        const selectWithLastName = document.getElementById('selectWithLastName').value
        const selectWithCity = document.getElementById('selectWithCity').value
        const actualStateOfContacts = this.props.contacts
        if (selectWithName === 'sortByNameAZ') {
            this.sortByAZ(actualStateOfContacts, 'name.first')
        }
        if (selectWithName === 'sortByNameZA') {
            this.sortByZA(actualStateOfContacts, 'name.first')
        }
        if (selectWithLastName === 'sortByLastNameAZ') {
            this.sortByAZ(actualStateOfContacts, 'name.last')
        }
        if (selectWithLastName === 'sortByLastNameZA') {
            this.sortByZA(actualStateOfContacts, 'name.last')
        }
        if (selectWithCity === 'sortByCityAZ') {
            this.sortByAZ(actualStateOfContacts, 'location.city')
        }
        if (selectWithCity === 'sortByCityZA') {
            this.sortByZA(actualStateOfContacts, 'location.city')
        }

    }

    sortByAZ = (name, sortBy) => {
        this.setState({
            contacts:
                _.orderBy(name, [`${sortBy}`], ['asc', 'desc'])
        })
    }

    sortByZA(name, sortBy) {
        this.setState({
            contacts:
                _.orderBy(name, [`${sortBy}`], ['desc', 'asc'])
        })
    }


    render() {
        return (
            <div>
                {(this.props.contacts && this.props.contacts.length) ?
                    <Grid>
                        <Row center={'xs'}>
                            <h2 style={{textAlign: 'center'}}>sort by: </h2>
                        </Row>
                        <Row center={'xs'}>
                            <select
                                id={'selectWithCategories'}
                                onChange={this.showSelectWithName}>
                                <option value="empty"></option>
                                <option value="name">name</option>
                                <option value="lastName">last name</option>
                                <option value="city">city</option>

                            </select>
                            <select id={'selectWithName'}
                                    onChange={this.selectedValue}
                                    className={this.state.classNameForNameSelect}
                            >
                                <option value="sortByNameAZ"></option>
                                <option value="sortByNameAZ">a-z</option>
                                <option value="sortByNameZA">z-a</option>
                            </select>
                            <select id={'selectWithLastName'}
                                    onChange={this.selectedValue}
                                    className={this.state.classNameForLastNameSelect}
                            >
                                <option value="sortByLastName"></option>
                                <option value="sortByLastNameAZ">a-z</option>
                                <option value="sortByLastNameZA">z-a</option>
                            </select>
                            <select id={'selectWithCity'}
                                    onChange={this.selectedValue}
                                    className={this.state.classNameForCitySelect}
                            >
                                <option value="sortByLastName"></option>
                                <option value="sortByCityAZ">a-z</option>
                                <option value="sortByCityZA">z-a</option>
                            </select>
                        </Row>
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    pic
                                </th>
                                <th>
                                    first name
                                </th>
                                <th>
                                    last name
                                </th>
                                <th>
                                    email
                                </th>
                                <th>
                                    city
                                </th>
                                <th>
                                    more
                                </th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.props.contacts.map((name) =>
                                <tr key={name.phone + name.id.value}>
                                    <td>
                                        {<img src={name.picture.thumbnail}/>}
                                    </td>
                                    <td>
                                        {firstLetterToUpperCase(name.name.first)}
                                    </td>
                                    <td>
                                        {firstLetterToUpperCase(name.name.last)}
                                    </td>
                                    <td>
                                        {name.email}
                                    </td>
                                    <td>
                                        {firstLetterToUpperCase(name.location.city)}
                                    </td>
                                    <td>
                                        {<button
                                            onClick={() => {
                                                console.log(name.email)
                                            }
                                            }
                                        >
                                            clickForMore
                                        </button>}
                                    </td>
                                </tr>
                            )
                            }
                            </tbody>
                        </table>
                    </Grid>
                    :
                    null
                }
                )
            </div>)
    }
}


const mapStateToProps = state => ({
    contacts: state.contactsList.contacts,
})

const mapDispatchToProps = dispatch => ({
    initUsers: () => dispatch(initUsers())
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactComponent)
