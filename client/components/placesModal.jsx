import React from 'react';

export default class PlacesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      searchInput: this.props.defaultSearch,
      places: []
    };
    this.fetchPlaces = this.fetchPlaces.bind(this);
  }

  componentDidMount() {
    if (this.props.defaultSearch) {
      this.fetchPlaces();
    }
  }

  fetchPlaces() {
    this.setState({
      isfetching: true
    });

    fetch(`/api/places?searchTerm=${this.state.searchInput}`)
      .then(res => res.json())
      .then(placesData => {
        this.setState({
          places: placesData.results,
          isfetching: false
        });
      });
  }

  render() {
    return (
      <div className="form-container">
        <h1 className="search-title center row">Search</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.fetchPlaces();
          }}>
          <div className="search-container">
            <button type="submit" className="search-button">
              <i className="fas fa-search search-icon"></i>
            </button>
            <input
              className="search-input"
              type="text"
              value={this.state.searchInput}
              onChange={({ target }) => this.setState({ searchInput: target.value })}
            />
          </div>
        </form>
          {this.state.isfetching
            ? <div>Loading...</div>
            : <ul className="search-list">
              {
                this.state.places.map(
                  (place, i) => {
                    return (
                      <li className="search-result" key={i}>
                        <span className="place-name">{place.name}</span>
                        <span className="place-rating">{place.rating}</span>
                        <span className="place-address">{place.formatted_address}</span>
                        <button className="set-button" onClick={() => { this.props.handleClick(place); }}>Set</button>
                      </li>
                    );
                  }
                )
              }
            </ul>
          }
      </div >
    );
  }
}
