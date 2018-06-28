import React from 'react'
import {clickOnSpanClose} from "./utils";
import TextInModal from "./TextInModal"



export const ModalForSingleContact = () => {

    return (<div
        id="myModal"
        className="modal"
        onClick={(event) => {
            const modal = document.getElementById('myModal')
            if (event.target === modal) {
                modal.style.display = "none"
            }
        }}
    >
        <div className="modal-content">
                        <span className="modal_close"
                              onClick={() => {
                                  clickOnSpanClose()
                              }}>&times;</span>
            <TextInModal/>
        </div>
    </div>)
}

