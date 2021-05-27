import React from 'react';

export default class PlacesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      places: [],
      isFetching: false
    };
  }

  render() {
    return (
      <div className="form-container">
        <h1 className="search-title center row">Search</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.setState({
              isfetching: true
            });
            fetch(`/api/places?searchTerm=${this.state.searchInput}`)
              .then(res => res.json())
              .then(userData => {
                this.setState({
                  places: userData.results,
                  isfetching: false
                });
              });
          }}>
          <input
            type="text"
            value={this.state.searchInput}
            onChange={({ target }) => this.setState({ searchInput: target.value })}
          />
        </form>
          {this.state.isfetching
            ? <div>Loading...</div>
            : <ul>
              {
                this.state.places.map((place, i) => <li key={i}>{place.name}</li>)
              }
            </ul>
          }
      </div >
    );
  }
}
