export const firstLetterToUpperCase = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export const allLettersToLowerCase = (word) => {
    return word.toLowerCase()
}


export const checkLiNumber = (number, currentPage, contactsLength) => {
    if (number === currentPage) {
        return 'pageNumberIsCurrent'
    }
    if (((number > (currentPage - 5)) && (number < currentPage + 5)) ||
        ((number === (currentPage - 20)) || (number === currentPage + 20)) ||
        ((number === (currentPage - 50)) || (number === currentPage + 50)) ||
        ((number === (currentPage - 100)) || (number === currentPage + 100)) ||
        ((number === 1) || (number === (contactsLength / 10)))
    ) {
        return 'pageNumberIsVisible'
    } else {
        return 'pageNumberIsInvisible'
    }
}


export const openModal = () => {
    const modal = document.getElementById('myModal')
    modal.style.display = "block"
}

export const clickOnSpanClose = () => {
    const modal = document.getElementById('myModal')
    modal.style.display = "none";
}

export const secondFilter = (contacts, stateForSearch) => contacts.filter(name => {
    const stateForAdvancedSearchInput = stateForSearch.toLowerCase()
    return (
        name.name.first.includes(stateForAdvancedSearchInput) ||
        name.name.last.includes(stateForAdvancedSearchInput) ||
        name.location.city.includes(stateForAdvancedSearchInput) ||
        name.email.includes(stateForAdvancedSearchInput) || !name
    )
})
export const selectCategory = () => {
    let optionsForSecondSelect = {}
    optionsForSecondSelect['name.first'] = ['', 'AZ', 'ZA']
    optionsForSecondSelect['name.last'] = ['', 'AZ', 'ZA']
    optionsForSecondSelect['location.city'] = ['', 'AZ', 'ZA']

    const selectorWithCategories = document.getElementById('selectWithCategories')
    const secondSelector = document.getElementById('secondSelect')
    let selectedOption = selectorWithCategories.options[selectorWithCategories.selectedIndex].value
    while (secondSelector.options.length) {
        secondSelector.remove(0)
    }
    let selectors = optionsForSecondSelect[selectedOption]
    if (selectors) {
        selectors.map((selector, i) => {
                let createdOption = new Option(selectors[i], i)
                return secondSelector.options.add(createdOption)
            }
        )
    }
}

export const filteredList = (actualContacts, selectWithCategories, basicSearchInput) => actualContacts.filter(name => {
    if (selectWithCategories === 'name.first') {
        return (name.name.first.includes(basicSearchInput))
    }
    else if (selectWithCategories === 'name.last') {
        return (
            name.name.last.includes(basicSearchInput))
    }
    else if (selectWithCategories === 'location.city') {
        return (name.location.city.includes(basicSearchInput))
    }
    return (
        name.name.first.includes(basicSearchInput) ||
        name.name.last.includes(basicSearchInput) ||
        name.location.city.includes(basicSearchInput) ||
        name.email.includes(basicSearchInput) || !name
    )
})

export const clearSelects = () => {
    document.getElementById('selectWithCategories').value = 'empty'
    document.getElementById('secondSelect').value = 0
}