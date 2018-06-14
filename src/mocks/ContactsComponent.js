import React, {Component} from 'react'
import {firstLetterToUpperCase} from "./utils";
import {Grid, Row} from 'react-flexbox-grid'
import {selectedValueName, selectedValueLastName, selectedValueCity} from "../state/contactsList";
import {selectCategory} from "../state/stateForSelects";
import {connect} from "react-redux";

class ContactComponent extends Component {
    state = {
        currentPage: 1,
        todosPerPage: 10
    };

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const myContacts = this.props.contacts
        const {currentPage, todosPerPage} = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = myContacts.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((contact, index) => {
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

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(myContacts.length / todosPerPage); i++) {
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
                {(this.props.contacts && this.props.contacts.length) ?
                    <Grid>
                        <Row center={'xs'}>
                            <h2 style={{textAlign: 'center'}}>sort by: </h2>
                        </Row>
                        <Row center={'xs'}>
                            <select
                                id={'selectWithCategories'}
                                onChange={() => {
                                    this.props.selectCategory()
                                    this.forceUpdate()
                                }}>
                                <option value="empty"></option>
                                <option value="name">name</option>
                                <option value="lastName">last name</option>
                                <option value="city">city</option>

                            </select>
                            <select id={'selectWithName'}
                                    onChange={this.props.selectedValueName}
                                    className={this.props.classNameForNameSelect}
                            >
                                <option value="sortByNameAZ"></option>
                                <option value="sortByNameAZ">a-z</option>
                                <option value="sortByNameZA">z-a</option>
                            </select>
                            <select id={'selectWithLastName'}
                                    onChange={this.props.selectedValueLastName}
                                    className={this.props.classNameForLastNameSelect}
                            >
                                <option value="sortByLastName"></option>
                                <option value="sortByLastNameAZ">a-z</option>
                                <option value="sortByLastNameZA">z-a</option>
                            </select>
                            <select id={'selectWithCity'}
                                    onChange={this.props.selectedValueCity}
                                    className={this.props.classNameForCitySelect}
                            >
                                <option value="sortByLastName"></option>
                                <option value="sortByCityAZ">a-z</option>
                                <option value="sortByCityZA">z-a</option>
                            </select>
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
                            {renderTodos}
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
    classNameForNameSelect: state.stateForSelects.classNameForNameSelect,
    classNameForLastNameSelect: state.stateForSelects.classNameForLastNameSelect,
    classNameForCitySelect: state.stateForSelects.classNameForCitySelect,
})

const mapDispatchToProps = dispatch => ({
    selectCategory: () => dispatch(selectCategory()),
    selectedValueName: () => dispatch(selectedValueName()),
    selectedValueLastName: () => dispatch(selectedValueLastName()),
    selectedValueCity: () => dispatch(selectedValueCity())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactComponent)
