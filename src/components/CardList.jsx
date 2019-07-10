/**
 * A generic Grid of cards for displaying originalData.
 * This component takes a "subject" and a "url" endpoint to request for the originalData.
 * A search bar is placed before the cards which filters results.
 * Only cards are shown where the card has a matching "filterField" as the searchbox.
 */
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import uuid from 'uuid';


export default class CardList extends Component {
  constructor() {
    super();

    this.state = {
      originalData: [],
      filteredData: [],
      searchString: '',
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    fetch(this.props.url)
      .then(response => response.json())
      .then(originalData => this.setState({ originalData, filteredData: originalData }))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  filterResults = () => {
    const { filterField } = this.props;
    const { originalData, searchString } = this.state;
    if (filterField === undefined) return;
    this.setState({
      filteredData: originalData.filter(element => element[filterField].startsWith(searchString)),
    });
  };

  onSearchInputChange = (event) => {
    if (event.target.value) {
      this.setState({ searchString: event.target.value });
      this.filterResults();
    } else {
      const { originalData } = this.state;
      this.setState({ searchString: '' });
      this.setState({ filteredData: originalData });
    }
  };

  render() {
    return (
        <div>
            {this.state.filteredData ? (
                <div>
                    <TextField
                        style={{ padding: 24 }}
                        id="searchInput"
                        placeholder="Filter Results"
                        margin="normal"
                        onChange={this.onSearchInputChange}
                    />
                    <Grid container spacing={24} style={{ padding: 24 }} id="cardContainer">
                        {this.state.filteredData.map(data => (
                            <Grid item xs={12} sm={6} lg={4} xl={3} key={uuid.v4()}>
                                {React.cloneElement(this.props.children, {
                                  data,
                                })}
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : (
              'No matching results found'
            )}
        </div>
    );
  }
}
