import { LitElement, html, css, unsafeCSS } from 'lit';

// Import CSS and HTML files
import styles from './compFormattedName.scss';

class compFormattedName extends LitElement {

  // Use unsafeCSS to apply the imported styles
  static styles = css\\\`\\\${unsafeCSS(styles)}\\\`;

  render() {
    // Use unsafeHTML to inject the HTML template content
    return html\\\`<!-- PLACEHOLDER_TEMPLATE -->\\\`;
  }

}

customElements.define('my-component', compFormattedName);
export default compFormattedName;