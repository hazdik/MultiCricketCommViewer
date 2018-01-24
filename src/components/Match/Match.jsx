import React from 'react';
import { ReactLoggerComponent } from 'react-logger-component';

import FlashScore from '../FlashScore';
import Scorecard from '../Scorecard';
import Commentary from '../Commentary';
import {
    getMatchData as getMatchDataAPI
} from '../../sources/yqlAPI';

import './assets/Match.css';


class Match extends ReactLoggerComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.displayName = this.constructor.name; // For Logger
    }

    componentDidMount() {
        console.debug('Recv props: ', this.props)
        getMatchDataAPI(this.props.matchId)
        .then((match) => {
            console.debug(match);
            this.setState({ match });
        })
        .catch((err) => {
            console.error('Error fetching match data: ', err);
        });
    }

    render() {
        console.debug('Match with matchId: ', this.props.matchId);
        if (!this.state.match) {
            return (
                <div>
                    Loading Match Data...
                </div>
            );
        } else {
            console.debug(this.state);
            return (
                <div className="match_height_fill_children">
                    <FlashScore flashScore={this.state.match.flashScore} />
                    <Scorecard playerMap={this.state.match.playerMap} scorecard={this.state.match.scorecard} />
                    <Commentary commentary={this.state.match.commentary} />
                </div>
            );
        }
    }
}

export default Match;
