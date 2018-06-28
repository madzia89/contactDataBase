import React, {Component} from 'react'
import {connect} from "react-redux"
import {currentContactChange} from '../state/contactsList'
import {clickOnSpanClose} from './utils'


class TextInModal extends Component {
    state = {
        newFirstNameValue: '',
        newLastNameValue: '',
        newCityValue: '',
        newStreetValue: '',
        newPostcodeValue: '',
        newEmailValue: '',
        newPhoneValue: ''
    }

    componentWillReceiveProps(props) {
        this.tadam(props.clickedContact)
    }

    tadam = (props) => {
        if (props.name.first !== this.state.newFirstNameValue) {
            this.setState({newFirstNameValue: props.name.first})
        }
        if (props.name.last !== this.state.newLastNameValue) {
            this.setState({newLastNameValue: props.name.last})
        }
        if (props.location.city !== this.state.newCityValue) {
            this.setState({newCityValue: props.location.city})
        }
        if (props.location.street !== this.state.newStreetValue) {
            this.setState({newStreetValue: props.location.street})
        }
        if (props.email !== this.state.newEmailValue) {
            this.setState({newEmailValue: props.email})
        }
        if (props.phone !== this.state.newPhoneValue) {
            this.setState({newPhoneValue: props.phone})
        }
    }
    render() {
        if (this.props.clickedContact.name !== undefined) {
            return (
                <div>
                    {(this.props.clickedContact.name !== undefined) ?
                        <div>
                            <h2>{this.state.newFirstNameValue} {this.state.newLastNameValue}</h2>
                            <div>
                                <div style={{display: 'inline-block'}}>
                                    name
                                </div>
                                <div style={{display: 'inline-block'}}>
                                    <input
                                        value={this.state.newFirstNameValue}
                                        onChange={(ev) => this.setState({newFirstNameValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div style={{display: 'inline-block'}}>
                                    lastName
                                </div>
                                <div style={{display: 'inline-block'}}>
                                    <input
                                        value={this.state.newLastNameValue}
                                        onChange={(ev) => this.setState({newLastNameValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div style={{display: 'inline-block'}}>
                                    city
                                </div>
                                <div style={{display: 'inline-block'}}>
                                    <input
                                        value={this.state.newCityValue}
                                        onChange={(ev) => this.setState({newCityValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div style={{display: 'inline-block'}}>
                                    street
                                </div>
                                <div style={{display: 'inline-block'}}>
                                    <input
                                        value={this.state.newStreetValue}
                                        onChange={(ev) => this.setState({newStreetValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div style={{display: 'inline-block'}}>
                                    email
                                </div>
                                <div style={{display: 'inline-block'}}>
                                    <input
                                        value={this.state.newEmailValue}
                                        onChange={(ev) => this.setState({newEmailValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div>
                                <div style={{display: 'inline-block'}}>
                                    phone
                                </div>
                                <div style={{display: 'inline-block'}}>
                                    <input
                                        value={this.state.newPhoneValue}
                                        onChange={(ev) => this.setState({newPhoneValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    this.tadam(this.props.clickedContact)
                                    clickOnSpanClose()
                                }}
                            >
                                abort
                            </button>
                            <button
                                onClick={() => {
                                    this.props.currentContactChange(this.state)
                                    clickOnSpanClose()
                                }}
                            >
                                confirm
                            </button>

                        </div>
                        :
                        'loading'
                    }
                </div>
            )
        }

        else {
            return (
                'loading'
            )
        }

    }
}

const mapStateToProps = state => ({
    clickedContact: state.contactsList.clickedContact,
})

const mapDispatchToProps = dispatch => ({
    currentContactChange: (val) => dispatch(currentContactChange(val)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInModal)
