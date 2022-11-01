

// base class for all created components
export default class sectionClass {
    constructor(name, id) {

        // if section array doesn't exist => create it
        if (!window.sections) {
            window.sections = [];
        }

        // add section to array
        // if exist => convert to an array holding all instances
        if (window.sections[name]) {
            if (Array.isArray(window.sections[name])) {
                window.sections[name] = [...window.sections[name], this]
            }
            else {
                window.sections[name] = [window.sections[name], this]
            }
        }
        else {
            window.sections[name] = this;
        }

        //section id
        this.id = id;

        // section element
        this.sectionElement = document.querySelector('#shopify-section-' + id);

        this.initElements();


        document.addEventListener('DOMContentLoaded', function () {
            // section ready event (DOM ready; useful for jquery etc.)
            this.onSectionReady();
        }.bind(this));
    };

    // init elements array for the section
    initElements = function () {

        // set element array from all elements with id attr
        this.elements = this.sectionElement.querySelector('div').querySelectorAll('[id]');

        // to use inside foreach=>function
        let self = this;

        this.elements.forEach((element) => {

            // set refresh function per element
            element.refresh = function () {
                self.refresh(element.id);
            };

            // set the element as a property on section class
            this[element.id] = element;
        });
    }

    // section init finish event
    onSectionReady = function () {
    }

    // section refresh finish event
    onRefreshFinish = function (sectionHtmlString) {
    }

    // refresh section from shopify section-rendering API => replacing the section element in the DOM
    refresh = function (elementID) {
        fetch(window.location.pathname + "?section_id=" + this.id)
            .then(res => res.text())
            .then(htmlString => {
                let newDom = document.createElement('div');
                if (elementID) {
                    let element = this.sectionElement.querySelector('#' + elementID);
                    newDom.innerHTML = htmlString.trim();
                    newDom = newDom.querySelector('#' + elementID);
                    element.parentNode.replaceChild(newDom, element);
                } else {
                    newDom.innerHTML = htmlString.trim();
                    this.sectionElement.parentNode.replaceChild(newDom, this.sectionElement);
                }

                // reset comp
                this.sectionElement = document.querySelector('#shopify-section-' + this.id);
                this.initElements();
                this.onRefreshFinish(newDom);
            })
    }
}

