fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const scoreboard = document.querySelector('ul');
    data.events.forEach(event => {
      const competition = event.competitions[0];

      const date = event.date;
      const stripDate = date.substring(5, date.length - 7);

      const homeTeam = competition.competitors.find(competitor => competitor.homeAway === "home");
      const awayTeam = competition.competitors.find(competitor => competitor.homeAway === "away");

      if (competition.status.displayClock == "0.0") {
        var time = "Final";
      } else {
        var time = competition.status.displayClock;
      }

      const homeScore = homeTeam.score;
      const awayScore = awayTeam.score;

      const homeLogo = homeTeam.team.logo;
      const awayLogo = awayTeam.team.logo;

      const homeTeamName = homeTeam.team.abbreviation;
      const awayTeamName = awayTeam.team.abbreviation;

      let homeScoreColor = '';
      let awayScoreColor = '';

      if (homeScore > awayScore) {
        homeScoreColor = 'yellow';
      } else if (awayScore > homeScore) {
        awayScoreColor = 'yellow';
      }

      const homeText = homeTeam.homeAway === 'home' ? 'Home' : 'Away';
      const awayText = awayTeam.homeAway === 'home' ? 'Home' : 'Away';

      const markup = `<li style="display: flex; align-items: center;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                          <img src="${homeLogo}" alt="${homeTeamName} Logo" width="50" height="50">
                          <span>${homeTeamName}</span>
                          <span style = "font-size:5px">${homeText}</span>
                        </div>
                        <div style="margin: 0 5px; color: ${homeScoreColor}">${homeScore}</div>
                        <h3>${time}</h3>
                        <div style="margin: 0 5px; color: ${awayScoreColor}">${awayScore}</div>
                        <div style="display: flex; flex-direction: column; align-items: center;">
                          <img src="${awayLogo}" alt="${awayTeamName} Logo" width="50" height="50">
                          <span>${awayTeamName}</span>
                          <span style = "font-size:5px">${awayText}</span>
                        </div>
                      </li>`;
      scoreboard.insertAdjacentHTML('beforeend', markup);
    });
  })
  .catch(err => {
    console.log(err);
  });
