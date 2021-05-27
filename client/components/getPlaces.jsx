import React from 'react';

export default class GetPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      places: [],
      isfetching: false
    };

  }

  render() {
    return (
      <div className="container">
        <div className="form-container">
          <h1 className="form-title center row">Search</h1>
          <form
            onSubmit={event => {
              event.preventDefault();
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
            }}
          >
            <input
              type="text"
              value={this.state.searchInput}
              onChange={({ target }) => this.setState({ searchInput: target.value })}
            />
            <button type="submit">Submit</button>
          </form>
          {this.state.isfetching
            ? <div>Loading...</div>
            : <ul>
              {
                this.state.places.map((place, i) => <li key={i}>{place.name}</li>)
              }
            </ul>
          }
        </div>
      </div>
    );
  }
}
