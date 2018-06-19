import React, {Component} from 'react'
import {connect} from "react-redux"


class TextInModal extends Component {
    state = {
        clickedContact: {}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({clickedContact: nextProps.clickedContact})
    }

    render() {
        return (
            <div>
                {(this.state.clickedContact.name !== undefined) ?
                    <h2>{this.state.clickedContact.name.first} {this.state.clickedContact.name.last}</h2>

                    :
                    'loading'
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contactsList.contacts,
    stateForSearchInput: state.contactsList.stateForSearchInput,
    fullList: state.contactsList.fullList,
    stateForAdvancedSearchInput: state.contactsList.stateForAdvancedSearchInput,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInModal)
