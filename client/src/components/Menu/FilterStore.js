// Imports
import { observable, computed } from 'mobx';

class FilterStore {
    @observable searchTerms = [];

    updateSearchValue(e) {
        const inputValue = e.target.value;
        const keyCode = e.which || e.keyCode;
        const maxLengthInput = 70;
        const enterKeyCode = 13;

        this.updateInputWidth(e);

        if (keyCode === enterKeyCode && inputValue) {
            const isFindValue = this.searchTerms.find((term) => {
                return term === inputValue;
            });

            if (!isFindValue) {
                this.searchTerms.push(inputValue);
            }

            e.target.value = '';
        } else if (this.searchTerms.length && keyCode === enterKeyCode) {
            this.redirect('http://www.foodtolove.com.au/search?');
        }

        if (inputValue.length > maxLengthInput) {
            e.preventDefault();
            return;
        }
    }

    updateInputWidth(e) {
        const inputValue = e.target.value;
        const characterSize = 18;
        const predictWdith = inputValue.length * characterSize + characterSize;
        const minWidth = 300;

        let width = this.maxContainerWidth;

        if (predictWdith > this.maxContainerWidth) {
            width = this.maxContainerWidth - 40;
        } else if (predictWdith > minWidth){
            width = predictWdith;
        } else {
            width = minWidth;
        }

        e.target.style.width = width + 'px';
    }

    setContainerMaxWidth(width) {
        this.maxContainerWidth = width;
    }

    redirect(url) {
        window.location = this.searchTerms.reduce((prev, current) => {
            return`${prev}q=${current}&`;
        }, url);
    }

    removeSearchTerm(index) {
        this.searchTerms.splice(index, 1);
    }

    submitRequest() {
        const input = document.querySelector("#tokenize-autocomplete-input");
        const inputValue = input.value;
        if (inputValue) {
            this.searchTerms.push(inputValue);
            input.value = '';
        }

        if (!this.searchTerms.length) return;

        this.redirect('http://www.foodtolove.com.au/search?');
    }
}

export default FilterStore;
