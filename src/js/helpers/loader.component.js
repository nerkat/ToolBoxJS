
class LoadingSpinner extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lds-ring');
        wrapper.innerHTML = '<div></div><div></div><div></div><div></div>';

        const style = document.createElement('style');
        style.textContent = \`
            :host {
                background: #ffffff80;
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                width: 100%;
                display: flex;
                height: 100%;
                justify-content: center;
                align-items: center;
            }
            
            .lds-ring,
            .lds-ring div {
            box-sizing: border-box;
            }

            .lds-ring {
            display: inline-block;
            position: relative;
            width: 40px;
            height: 40px;
            }

            .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 32px;
            height: 32px;
            margin: 4px;
            border: 4px solid currentColor;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: currentColor transparent transparent transparent;
            }

            .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
            }

            .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
            }

            .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
            }

            @keyframes lds-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        \`;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

customElements.define('loading-spinner', LoadingSpinner);