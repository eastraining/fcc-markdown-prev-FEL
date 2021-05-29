import './App.css';
import React from 'react';
import marked from 'marked';
import DOMpurify from 'dompurify';
import DEFAULT_PATH from './App.md';

marked.setOptions({
  breaks: true,
  sanitizer: DOMpurify.sanitize()
})

function Previewer (props) {
  const htmlText = () => ({__html: marked(props.text)});
  return (
    <div className="col">
      <h1 className="col-header">HTML output:</h1>
      <div id="preview" dangerouslySetInnerHTML={htmlText()} className="col-content" />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({text: e.target.value});
  }
  componentDidMount() {
    fetch(DEFAULT_PATH)
      .then(response => (response.text()))
      .then(text => this.setState({text: text, loaded: true}));
  }

  render() {    
    return (
      <div className="flex-grid">
        <div className="col">
          <h1 className="col-header">Markdown text:</h1>
          <textarea id="editor" className="col-content" value={this.state.text} onChange={this.handleChange} />
        </div>
        <Previewer text={this.state.text} />
        {/* <Signature /> */}
        <p className="row"><em>by eastraining</em></p>
      </div>
    );
  }
}

export default App;
