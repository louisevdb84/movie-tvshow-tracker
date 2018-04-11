import React from 'react';
import TV from './TV';


class TVList extends React.Component {
    render() {
        const { TVShows, baseURL } = this.props;
        return (
            <div>
                {
                    TVShows.map((TVShow, i) => {
                        return <TV
                            key={i}
                            id={TVShow.id}
                            name={TVShow.name}
                            vote_average={TVShow.vote_average}
                            poster_path={TVShow.poster_path}
                            first_air_date={TVShow.first_air_date}
                            overview={TVShow.overview}
                            baseURL={baseURL}
                            genres={TVShow.genres}
                            show={TVShow}
                        />
                    })
                }
            </div>
        );
    }
}

export default TVList;