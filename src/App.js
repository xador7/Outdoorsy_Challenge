import React from 'react';
import Search from "./components/Search/Search";

class App extends React.Component {
  render() {
    return (
        <div className="container">
            <div className="row">
                <Search/>
            </div>
        </div>
    );
  }
}
export default App;
