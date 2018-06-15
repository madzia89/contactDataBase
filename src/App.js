import React, {Component} from 'react'
import ContactsComponent from "./mocks/ContactsComponent.js"
import {connect} from "react-redux"

class App extends Component {

    render() {

        return (
            <div className="App">
                {(this.props.fullList.length > 0) ?
                    <ContactsComponent/>
                    :
                    'loading'
                }

            </div>
        )
    }
}

const mapStateToProps = state => ({
    fullList: state.contactsList.fullList,

})
const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
