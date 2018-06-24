import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from "react-redux"
// import {currentContactChangeName} from '../state/singleContactChange'
import {currentContactChangeName, saveSingleContact} from '../state/contactsList'
import {clickOnSpanClose} from './utils'


class TextInModal extends Component {
    state = {
        newValue: ''
    }

    showInput = (indexOfTr) => {

        const newTd = React.createElement('span', {id: indexOfTr + `input`},
            React.createElement('input', {
                onChange: (ev) => {
                    this.setState({newValue: ev.target.value})
                }
            }),
            React.createElement('button', {
                onClick: () => {
                    this.hideNewTd(indexOfTr)
                }
            }, 'abort'),

            React.createElement('button', {
                onClick: () => {
                    this.props.currentContactChangeName(this.state.newValue)
                    this.hideNewTd(indexOfTr)
                }
            }, 'accept')
        )
        ReactDOM.render(newTd, document.getElementById(indexOfTr))
    }

    hideNewTd = (idOfTheSpanToUnmount) => {
        ReactDOM.unmountComponentAtNode(document.getElementById(idOfTheSpanToUnmount))
    }


    render() {
        if (this.props.clickedContact.name !== undefined) {
            const firstName = this.props.clickedContact.name.first
            const lastName = this.props.clickedContact.name.last
            const locationCity = this.props.clickedContact.location.city
            const locationStreet = this.props.clickedContact.location.street
            const locationPostcode = this.props.clickedContact.location.postcode
            const email = this.props.clickedContact.email
            const phone = this.props.clickedContact.phone
            const arrayOfVaraiblesForReactFactory = ['firstName', 'lastName', 'locationCity', 'locationStreet', 'locationPostcode', 'email', 'phone']
            const arrayForReactFactory = [firstName, lastName, locationCity, locationStreet, locationPostcode, email, phone]

            return (
                <div>
                    {(this.props.clickedContact.name !== undefined) ?
                        <div>
                            <h2>{firstName} {lastName}</h2>

                            {arrayOfVaraiblesForReactFactory.map((data, i) => {
                                    return (
                                        React.createElement('div', {key: i},
                                            React.createElement('span', null, data),
                                            React.createElement('span', null, arrayForReactFactory[i]),
                                            React.createElement('span', null,
                                                React.createElement('button', {
                                                    onClick: () => {
                                                        this.showInput(`${data}div`)

                                                    },
                                                    type: 'button',
                                                    className: 'buttonForContactEdit',
                                                    alt: 'edit',
                                                    title: 'edit'
                                                })),
                                            React.createElement('div', {id: `${data}div`})
                                        )
                                    )
                                }
                            )
                            }
                            <button
                            onClick={() => {
                                this.props.saveSingleContact()
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
    currentContactChangeName: (val) => dispatch(currentContactChangeName(val)),
    saveSingleContact: () => dispatch(saveSingleContact()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInModal)
