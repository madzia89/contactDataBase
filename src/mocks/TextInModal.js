import React, {Component} from 'react'
import {connect} from "react-redux"
import {currentContactChange} from '../state/contactsList'
import {clickOnSpanClose, firstLetterToUpperCase} from './utils'


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
        this.setStateForComponentsState(props.clickedContact)
    }

    setStateForComponentsState = (props) => {
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
                        <div className={'textInModal__content'}>
                            <h2 className={'textInModal__header'}>{this.state.newFirstNameValue} {this.state.newLastNameValue}</h2>
                            <div className={'textInModal__divForTitleAndInput'}>
                                <div className={'textInModal__divForTitleAndInput_InputTitle'}>
                                    name
                                </div>
                                <div className={'textInModal__divForTitleAndInput_InputDiv'}>
                                    <input
                                        className={'textInModal__divForTitleAndInput_InputDiv_Input'}
                                        value={firstLetterToUpperCase(this.state.newFirstNameValue)}
                                        onChange={(ev) => this.setState({newFirstNameValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div className={'textInModal__divForTitleAndInput'}>
                                <div className={'textInModal__divForTitleAndInput_InputTitle'}>
                                    lastName
                                </div>
                                <div className={'textInModal__divForTitleAndInput_InputDiv'}>
                                    <input
                                        className={'textInModal__divForTitleAndInput_InputDiv_Input'}
                                        value={firstLetterToUpperCase(this.state.newLastNameValue)}
                                        onChange={(ev) => this.setState({newLastNameValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div className={'textInModal__divForTitleAndInput'}>
                                <div className={'textInModal__divForTitleAndInput_InputTitle'}>
                                    city
                                </div>
                                <div className={'textInModal__divForTitleAndInput_InputDiv'}>
                                    <input
                                        className={'textInModal__divForTitleAndInput_InputDiv_Input'}
                                        value={firstLetterToUpperCase(this.state.newCityValue)}
                                        onChange={(ev) => this.setState({newCityValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div className={'textInModal__divForTitleAndInput'}>
                                <div className={'textInModal__divForTitleAndInput_InputTitle'}>
                                    street
                                </div>
                                <div className={'textInModal__divForTitleAndInput_InputDiv'}>
                                    <input
                                        className={'textInModal__divForTitleAndInput_InputDiv_Input'}
                                        value={this.state.newStreetValue}
                                        onChange={(ev) => this.setState({newStreetValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div className={'textInModal__divForTitleAndInput'}>
                                <div className={'textInModal__divForTitleAndInput_InputTitle'}>
                                    email
                                </div>
                                <div className={'textInModal__divForTitleAndInput_InputDiv'}>
                                    <input
                                        className={'textInModal__divForTitleAndInput_InputDiv_Input'}
                                        value={this.state.newEmailValue}
                                        onChange={(ev) => this.setState({newEmailValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div className={'textInModal__divForTitleAndInput'}>
                                <div className={'textInModal__divForTitleAndInput_InputTitle'}>
                                    phone
                                </div>
                                <div className={'textInModal__divForTitleAndInput_InputDiv'}>
                                    <input
                                        className={'textInModal__divForTitleAndInput_InputDiv_Input'}
                                        value={this.state.newPhoneValue}
                                        onChange={(ev) => this.setState({newPhoneValue: ev.target.value})}>
                                    </input>
                                </div>
                            </div>
                            <div className={'textInModal__divForButtons'}>
                                <button
                                    className={'textInModal__btn'}
                                    onClick={() => {
                                        this.setStateForComponentsState(this.props.clickedContact)
                                        clickOnSpanClose()
                                    }}
                                >
                                    abort
                                </button>
                                <button
                                    className={'textInModal__btn'}
                                    onClick={() => {
                                        this.props.currentContactChange(this.state)
                                        clickOnSpanClose()
                                    }}
                                >
                                    confirm
                                </button>
                            </div>
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
