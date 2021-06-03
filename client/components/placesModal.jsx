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
        <div className="search-title-container row">
          <i className="fas fa-arrow-left back-icon"
            onClick={this.props.handleBackBtn}
          />
          <h1 className="search-title center row">Search</h1>
        </div>
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
            ? <div className="loading-placeholder center">Loading...</div>
            : <div className="search-list">
              {
                this.state.places.map(
                  (place, i) => {
                    return (
                      <div className="search-result" key={i}>
                        <div className="place-img-container">
                          <img className="place-img" src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg" />
                        </div>
                        <div className="place-info">
                          <div className="place-name">{place.name}</div>
                          <div className="place-rating">
                            {place.rating}
                            <i className="far fa-star rating-icon"></i>
                          </div>
                          <div className="place-address">{place.formatted_address}</div>
                          <div className="set-button-container">
                            <button className="set-button" onClick={() => { this.props.handleClick(place); }}>Set</button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )
              }
            </div>
          }
      </div >
    );
  }
}
