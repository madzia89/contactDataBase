import React, {Component} from 'react'
import {firstLetterToUpperCase} from "./utils";
import {Grid, Row, Col} from 'react-flexbox-grid'
import {selectedValue} from "../state/contactsList";
import {selectCategory} from "../state/stateForSelects";
import {connect} from "react-redux";

class ContactComponent extends Component {

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
                                onChange={this.props.selectCategory}>
                                <option value="empty"></option>
                                <option value="name">name</option>
                                <option value="lastName">last name</option>
                                <option value="city">city</option>

                            </select>
                            <select id={'selectWithName'}
                                    onChange={this.props.selectedValue}
                                    className={this.props.classNameForNameSelect}
                            >
                                <option value="sortByNameAZ"></option>
                                <option value="sortByNameAZ">a-z</option>
                                <option value="sortByNameZA">z-a</option>
                            </select>
                            <select id={'selectWithLastName'}
                                    onChange={this.props.selectedValue}
                                    className={this.props.classNameForLastNameSelect}
                            >
                                <option value="sortByLastName"></option>
                                <option value="sortByLastNameAZ">a-z</option>
                                <option value="sortByLastNameZA">z-a</option>
                            </select>
                            <select id={'selectWithCity'}
                                    onChange={this.props.selectedValue}
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
    classNameForNameSelect: state.stateForSelects.classNameForNameSelect,
    classNameForLastNameSelect: state.stateForSelects.classNameForLastNameSelect,
    classNameForCitySelect: state.stateForSelects.classNameForCitySelect,
})

const mapDispatchToProps = dispatch => ({
    selectCategory: () => dispatch(selectCategory()),
    selectedValue: () => dispatch(selectedValue())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactComponent)
