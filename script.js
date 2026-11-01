const STORAGE_KEY = 'naija-football-manager-save';

const baseFixtures = [
  { opponent: 'Kano Pillars', home: true, difficulty: 77, venue: 'Home', status: 'Upcoming' },
  { opponent: 'Enugu Rangers', home: false, difficulty: 81, venue: 'Away', status: 'Upcoming' },
  { opponent: 'Akwa United', home: true, difficulty: 74, venue: 'Home', status: 'Upcoming' },
  { opponent: 'Plateau United', home: false, difficulty: 79, venue: 'Away', status: 'Upcoming' },
  { opponent: 'Abia Warriors', home: true, difficulty: 72, venue: 'Home', status: 'Upcoming' },
  { opponent: 'Remo Stars', home: false, difficulty: 83, venue: 'Away', status: 'Upcoming' }
];

const defaultState = {
  clubName: 'Lagos City FC',
  leagueName: 'Nigeria Premier League',
  budget: 18_000_000,
  reputation: 62,
  morale: 74,
  fans: 42000,
  points: 0,
  wins: 0,
  draws: 0,
  losses: 0,
  week: 1,
  season: 1,
  tactic: 'balanced',
  teamStrength: 77,
  currentFixtureIndex: 0,
  log: [
    'You have been appointed manager of Lagos City FC. The pressure is on to build a title-winning side.',
    'Your first task is to steady the squad and get points on the board.'
  ],
  players: [
    { id: 1, name: 'Ayo Balogun', position: 'GK', rating: 78, age: 25, stamina: 82, fitness: 82, morale: 80, value: 1_500_000, injury: 0 },
    { id: 2, name: 'Tunde Adebayo', position: 'RB', rating: 75, age: 24, stamina: 77, fitness: 77, morale: 78, value: 1_200_000, injury: 0 },
    { id: 3, name: 'Eze Nwosu', position: 'CB', rating: 81, age: 27, stamina: 79, fitness: 79, morale: 80, value: 2_400_000, injury: 0 },
    { id: 4, name: 'Musa Ibrahim', position: 'CB', rating: 76, age: 23, stamina: 81, fitness: 81, morale: 76, value: 1_600_000, injury: 0 },
    { id: 5, name: 'Kelechi Okafor', position: 'LB', rating: 74, age: 22, stamina: 75, fitness: 75, morale: 74, value: 1_000_000, injury: 0 },
    { id: 6, name: 'Seyi Lawal', position: 'CM', rating: 82, age: 26, stamina: 84, fitness: 84, morale: 83, value: 2_900_000, injury: 0 },
    { id: 7, name: 'Babatunde Ali', position: 'CM', rating: 79, age: 25, stamina: 80, fitness: 80, morale: 81, value: 2_000_000, injury: 0 },
    { id: 8, name: 'Emmanuel Oke', position: 'RW', rating: 80, age: 24, stamina: 81, fitness: 81, morale: 82, value: 2_700_000, injury: 0 },
    { id: 9, name: 'Nnamdi Akin', position: 'ST', rating: 84, age: 28, stamina: 76, fitness: 76, morale: 79, value: 4_000_000, injury: 0 },
    { id: 10, name: 'Chibuzor Eze', position: 'LW', rating: 81, age: 25, stamina: 78, fitness: 78, morale: 80, value: 3_000_000, injury: 0 },
    { id: 11, name: 'Ifeanyi Udo', position: 'AM', rating: 83, age: 27, stamina: 83, fitness: 83, morale: 84, value: 3_900_000, injury: 0 }
  ],
  fixtures: baseFixtures.map((fixture) => ({ ...fixture })),
  transferMarket: [
    { id: 101, name: 'Daniel Okon', position: 'ST', rating: 76, askingPrice: 2_500_000, age: 25 },
    { id: 102, name: 'Yemi Folarin', position: 'CM', rating: 75, askingPrice: 2_100_000, age: 23 },
    { id: 103, name: 'Femi Owolabi', position: 'CB', rating: 74, askingPrice: 1_800_000, age: 22 },
    { id: 104, name: 'Stanley Bassey', position: 'RW', rating: 77, askingPrice: 2_700_000, age: 24 },
    { id: 105, name: 'Umar Musa', position: 'GK', rating: 73, askingPrice: 1_400_000, age: 21 }
  ],
  leagueTable: [
    { team: 'Lagos City FC', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Kano Pillars', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Enugu Rangers', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Akwa United', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Plateau United', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Abia Warriors', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Remo Stars', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Rivers United', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 }
  ],
  currentMatch: null,
  matchRunning: false,
  matchStatus: 'Kick off'
};

let state = loadState();
let animationFrameId = null;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(value);
}

function averageTeamRating() {
  if (!state.players.length) return 0;
  return Math.round(state.players.reduce((sum, player) => sum + player.rating, 0) / state.players.length);
}

function getTeamStrength() {
  const avgRating = averageTeamRating();
  const avgFitness = Math.round(state.players.reduce((sum, player) => sum + (player.fitness ?? player.stamina), 0) / state.players.length);
  const avgMorale = Math.round(state.players.reduce((sum, player) => sum + player.morale, 0) / state.players.length);
  return clamp(Math.round((avgRating * 0.7) + (avgFitness * 0.2) + (avgMorale * 0.1)), 50, 95);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultState);

  try {
    return JSON.parse(saved);
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function addLog(message) {
  state.log.unshift(message);
  state.log = state.log.slice(0, 9);
}

function getNextFixture() {
  if (state.currentFixtureIndex >= state.fixtures.length) return null;
  return state.fixtures[state.currentFixtureIndex];
}

function getLeagueTeam(teamName) {
  return state.leagueTable.find((team) => team.team === teamName) || null;
}

function resetLeagueTable() {
  state.leagueTable = [
    { team: 'Lagos City FC', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Kano Pillars', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Enugu Rangers', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Akwa United', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Plateau United', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Abia Warriors', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Remo Stars', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 },
    { team: 'Rivers United', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 }
  ];
}

function updateLeagueTable(teamName, goalsFor, goalsAgainst, resultType) {
  const entry = getLeagueTeam(teamName);
  if (!entry) return;

  entry.played += 1;
  entry.gf += goalsFor;
  entry.ga += goalsAgainst;

  if (resultType === 'win') {
    entry.wins += 1;
    entry.pts += 3;
  } else if (resultType === 'draw') {
    entry.draws += 1;
    entry.pts += 1;
  } else {
    entry.losses += 1;
  }
}

function renderStats() {
  const teamStrength = getTeamStrength();
  state.teamStrength = teamStrength;

  document.getElementById('seasonValue').textContent = `${state.season}`;
  document.getElementById('clubName').textContent = state.clubName;
  document.getElementById('budgetValue').textContent = formatMoney(state.budget);
  document.getElementById('reputationValue').textContent = `${state.reputation}`;
  document.getElementById('moraleValue').textContent = `${state.morale}`;
  document.getElementById('fansValue').textContent = `${state.fans.toLocaleString()}`;
  document.getElementById('pointsValue').textContent = `${state.points}`;
  document.getElementById('recordValue').textContent = `${state.wins}-${state.draws}-${state.losses}`;
  document.getElementById('weekLabel').textContent = `Week ${state.week}`;
  document.getElementById('teamStrengthValue').textContent = `${teamStrength}`;
  document.getElementById('tacticLabel').textContent = capitalize(state.tactic);
    
  const nextFixture = getNextFixture();
  document.getElementById('nextFixtureValue').textContent = nextFixture
    ? `${nextFixture.home ? 'vs' : '@'} ${nextFixture.opponent}`
    : 'Season complete';

  const tacticSelect = document.getElementById('tacticSelect');
  tacticSelect.value = state.tactic;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function renderRoster() {
  const container = document.getElementById('rosterContainer');
  container.innerHTML = '';

  state.players.forEach((player) => {
    const card = document.createElement('div');
    card.className = 'player-card';

    const fitness = player.fitness ?? player.stamina;
    const statusText = player.injury > 0 ? 'Injured' : `Fit ${fitness}`;
    const badgeClass = player.injury > 0 ? 'injured' : 'fitness';

    card.innerHTML = `
      <div class="player-card-header">
        <div>
          <strong>${player.name}</strong>
        </div>
        <span class="player-rating">${player.rating}</span>
      </div>
      <div class="player-meta">
        <span>${player.position}</span>
        <span>Age ${player.age}</span>
        <span>Morale ${player.morale}</span>
      </div>
      <div class="player-badges">
        <span class="player-status ${badgeClass}">${statusText}</span>
        <span class="player-status fitness">${player.injury > 0 ? `Out ${player.injury} w` : `Stamina ${player.stamina}`}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderTransferMarket() {
  const container = document.getElementById('transferMarket');
  container.innerHTML = '';

  state.transferMarket.forEach((player) => {
    const card = document.createElement('div');
    card.className = 'market-card';
    card.innerHTML = `
      <div class="market-header">
        <strong>${player.name}</strong>
        <span class="market-price">${player.rating}</span>
      </div>
      <div class="market-meta">
        <span>${player.position}</span>
        <span>Age ${player.age}</span>
      </div>
      <div class="market-meta">
        <span>Price: ${formatMoney(player.askingPrice)}</span>
      </div>
      <button class="primary buy-btn" data-player-id="${player.id}">Buy Player</button>
      <button class="secondary negotiate-btn" data-player-id="${player.id}">Negotiate</button>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', () => buyPlayer(Number(button.dataset.playerId)));
  });

  container.querySelectorAll('.negotiate-btn').forEach((button) => {
    button.addEventListener('click', () => negotiateTransfer(Number(button.dataset.playerId)));
  });
}

function renderFixtures() {
  const container = document.getElementById('fixturesContainer');
  container.innerHTML = '';

  state.fixtures.forEach((fixture, index) => {
    const isCurrent = index === state.currentFixtureIndex;
    const card = document.createElement('div');
    card.className = 'fixture-card';
    card.innerHTML = `
      <div class="fixture-header">
        <span class="fixture-name">${fixture.home ? 'vs' : '@'} ${fixture.opponent}</span>
        <span class="fixture-difficulty">${fixture.difficulty}</span>
      </div>
      <div class="fixture-status">${fixture.venue} • ${isCurrent ? 'Next up' : 'Scheduled'}</div>
    `;
    container.appendChild(card);
  });
}

function renderLeagueTable() {
  const tbody = document.getElementById('leagueTableBody');
  const rows = [...state.leagueTable].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const gdA = a.gf - a.ga;
    const gdB = b.gf - b.ga;
    if (gdB !== gdA) return gdB - gdA;
    return b.gf - a.gf;
  });

  tbody.innerHTML = rows.map((team, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${team.team}</td>
      <td>${team.played}</td>
      <td>${team.pts}</td>
    </tr>
  `).join('');
}

function renderLog() {
  const list = document.getElementById('logList');
  list.innerHTML = '';

  state.log.forEach((entry) => {
    const item = document.createElement('li');
    item.textContent = entry;
    list.appendChild(item);
  });
}

function renderMatchOverlay() {
  const homeScore = document.getElementById('homeScore');
  const awayScore = document.getElementById('awayScore');
  const matchStatus = document.getElementById('matchStatusText');
  const matchState = state.currentMatch;

  if (!matchState) {
    homeScore.textContent = '0';
    awayScore.textContent = '0';
    matchStatus.textContent = 'Kick off';
    return;
  }

  homeScore.textContent = `${matchState.scoreHome}`;
  awayScore.textContent = `${matchState.scoreAway}`;
  matchStatus.textContent = state.matchStatus;
}

function render() {
  renderStats();
  renderRoster();
  renderTransferMarket();
  renderFixtures();
  renderLeagueTable();
  renderLog();
  renderMatchOverlay();
  saveState();
}

function trainSquad() {
  state.players = state.players.map((player) => ({
    ...player,
    stamina: clamp((player.stamina ?? player.fitness ?? 70) + Math.floor(Math.random() * 6 + 2), 50, 99),
    fitness: clamp((player.fitness ?? player.stamina ?? 70) + Math.floor(Math.random() * 6 + 2), 50, 99),
    morale: clamp(player.morale + Math.floor(Math.random() * 5 + 2), 55, 99)
  }));

  state.morale = clamp(state.morale + 5, 50, 99);
  state.reputation = clamp(state.reputation + 1, 0, 100);
  state.budget -= 250_000;
  addLog('Training camp boosts the squad fitness and confidence ahead of the next match.');
  render();
}

function scoutTalent() {
  const topTalent = {
    id: Date.now(),
    name: `Young Star ${Math.floor(Math.random() * 900 + 100)}`,
    position: ['ST', 'CM', 'CB', 'RW', 'GK'][Math.floor(Math.random() * 5)],
    rating: 72 + Math.floor(Math.random() * 9),
    age: 18 + Math.floor(Math.random() * 5),
    askingPrice: 900_000 + Math.floor(Math.random() * 2_500_000)
  };

  state.transferMarket.push(topTalent);
  addLog(`Scouting reports identify a promising youngster: ${topTalent.name}, a ${topTalent.position} with ${topTalent.rating} potential.`);
  render();
}

function buyPlayer(playerId) {
  const player = state.transferMarket.find((item) => item.id === playerId);
  if (!player) return;

  if (state.budget < player.askingPrice) {
    addLog(`The club cannot afford ${player.name} right now. Budget is too tight.`);
    render();
    return;
  }

  state.budget -= player.askingPrice;
  state.players.push({
    id: Date.now(),
    name: player.name,
    position: player.position,
    rating: player.rating,
    age: player.age,
    stamina: 70 + Math.floor(Math.random() * 20),
    fitness: 70 + Math.floor(Math.random() * 20),
    morale: 70 + Math.floor(Math.random() * 20),
    value: player.askingPrice,
    injury: 0
  });

  state.transferMarket = state.transferMarket.filter((item) => item.id !== playerId);
  addLog(`${player.name} joins the club for ${formatMoney(player.askingPrice)}.`);
  render();
}

function negotiateTransfer(playerId) {
  const player = state.transferMarket.find((item) => item.id === playerId);
  if (!player) return;

  const discountedPrice = Math.round(player.askingPrice * 0.85);
  if (state.budget < discountedPrice) {
    addLog(`The board rejects the bid for ${player.name}. The asking price is too high.`);
    render();
    return;
  }

  state.budget -= discountedPrice;
  state.players.push({
    id: Date.now(),
    name: player.name,
    position: player.position,
    rating: player.rating,
    age: player.age,
    stamina: 72 + Math.floor(Math.random() * 18),
    fitness: 72 + Math.floor(Math.random() * 18),
    morale: 72 + Math.floor(Math.random() * 18),
    value: discountedPrice,
    injury: 0
  });

  state.transferMarket = state.transferMarket.filter((item) => item.id !== playerId);
  addLog(`${player.name} is signed after successful negotiations for ${formatMoney(discountedPrice)}.`);
  render();
}

function pressConference() {
  const boost = state.wins >= state.losses ? 6 : 2;
  state.morale = clamp(state.morale + boost, 50, 99);
  state.reputation = clamp(state.reputation + 2, 0, 100);
  addLog('The press conference goes well. The media praises your tactical plan and squad leadership.');
  render();
}

function recoverSquad() {
  if (state.budget < 200_000) {
    addLog('There is not enough money for a recovery programme this week.');
    render();
    return;
  }

  state.budget -= 200_000;
  state.players = state.players.map((player) => ({
    ...player,
    stamina: clamp((player.stamina ?? player.fitness ?? 70) + 6, 50, 99),
    fitness: clamp((player.fitness ?? player.stamina ?? 70) + 6, 50, 99),
    injury: Math.max(0, (player.injury ?? 0) - 1),
    morale: clamp(player.morale + 2, 50, 99)
  }));

  addLog('The medical team restores the squad and cuts down injuries ahead of the fixture list.');
  render();
}

function applyTacticToTeam() {
  const tactic = state.tactic;
  if (tactic === 'attacking') {
    state.players = state.players.map((player) => ({
      ...player,
      morale: clamp(player.morale + 1, 50, 99),
      fitness: clamp((player.fitness ?? player.stamina ?? 70) + 1, 50, 99)
    }));
  }
  if (tactic === 'defensive') {
    state.morale = clamp(state.morale + 1, 50, 99);
  }
}

function onTacticChange(event) {
  state.tactic = event.target.value;
  applyTacticToTeam();
  addLog(`You switch to a ${capitalize(state.tactic)} setup. The squad adapts to the new plan.`);
  render();
}

function generateGoalTimes(homeGoals, awayGoals) {
  const timeline = [];
  const pushGoals = (team, goals) => {
    for (let i = 0; i < goals; i += 1) {
      timeline.push({ team, time: 18 + Math.random() * 80, triggered: false });
    }
  };

  pushGoals('home', homeGoals);
  pushGoals('away', awayGoals);
  return timeline.sort((a, b) => a.time - b.time);
}

function createMatch(fixture) {
  const homeStrength = getTeamStrength();
  const awayStrength = fixture.difficulty;
  const homeGoalBias = clamp(homeStrength - awayStrength, -12, 12);
  const likelyHomeGoals = Math.max(0, Math.round(1.2 + homeGoalBias / 12 + Math.random() * 1.5));
  const likelyAwayGoals = Math.max(0, Math.round(0.8 + (awayStrength - homeStrength) / 16 + Math.random() * 1.3));
  const actualHomeGoals = Math.min(5, likelyHomeGoals + (Math.random() < 0.15 ? 1 : 0));
  const actualAwayGoals = Math.min(5, likelyAwayGoals + (Math.random() < 0.15 ? 1 : 0));

  const teamColors = { home: '#44d37a', away: '#f6d365', ball: '#fdf8ee' };

  return {
    fixture,
    homeName: state.clubName,
    awayName: fixture.opponent,
    homeStrength,
    awayStrength,
    scoreHome: 0,
    scoreAway: 0,
    finalHomeScore: actualHomeGoals,
    finalAwayScore: actualAwayGoals,
    goalTimeline: generateGoalTimes(actualHomeGoals, actualAwayGoals),
    playing: true,
    elapsed: 0,
    lastTimestamp: performance.now(),
    teams: {
      home: createTeamPlayers(true, teamColors.home),
      away: createTeamPlayers(false, teamColors.away)
    },
    ball: { x: 430, y: 260, radius: 7, vx: 0, vy: 0, owner: null, lastTouchedBy: 'home' },
    colorScheme: teamColors
  };
}

function createTeamPlayers(isHome, color) {
  const baseX = isHome ? 140 : 720;
  const players = [
    { x: baseX, y: 260, radius: 12, color, label: 'GK' },
    { x: baseX + 80, y: 80, radius: 10, color, label: 'RB' },
    { x: baseX + 80, y: 180, radius: 10, color, label: 'CB' },
    { x: baseX + 80, y: 340, radius: 10, color, label: 'CB' },
    { x: baseX + 80, y: 440, radius: 10, color, label: 'LB' },
    { x: baseX + 150, y: 120, radius: 10, color, label: 'CM' },
    { x: baseX + 150, y: 220, radius: 10, color, label: 'CM' },
    { x: baseX + 150, y: 300, radius: 10, color, label: 'CM' },
    { x: baseX + 150, y: 400, radius: 10, color, label: 'RW' },
    { x: baseX + 220, y: 180, radius: 12, color, label: 'ST' },
    { x: baseX + 220, y: 340, radius: 12, color, label: 'ST' }
  ];

  if (!isHome) {
    players.forEach((player) => {
      player.x = 860 - player.x;
      player.y = 520 - player.y;
    });
  }

  return players;
}

function drawPitch() {
  const canvas = document.getElementById('matchCanvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#1a8d47';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 20);
  ctx.lineTo(canvas.width / 2, canvas.height - 20);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeRect(20, 150, 58, 220);
  ctx.strokeRect(canvas.width - 78, 150, 58, 220);
  ctx.strokeRect(20, 220, 20, 80);
  ctx.strokeRect(canvas.width - 40, 220, 20, 80);

  ctx.fillStyle = '#bfecc3';
  ctx.font = '18px Arial';
  ctx.fillText('Lagos City FC', 24, 35);
  ctx.fillText('Away', canvas.width - 110, 35);
}

function drawMatchFrame() {
  const canvas = document.getElementById('matchCanvas');
  const ctx = canvas.getContext('2d');
  const match = state.currentMatch;

  if (!match) return;

  drawPitch();

  Object.values(match.teams).forEach((team) => {
    team.forEach((player) => {
      ctx.beginPath();
      ctx.fillStyle = player.color;
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0c2b1a';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#0a2b1c';
      ctx.font = '10px Arial';
      ctx.fillText(player.label, player.x - 8, player.y + 3);
    });
  });

  ctx.beginPath();
  ctx.fillStyle = match.colorScheme.ball;
  ctx.arc(match.ball.x, match.ball.y, match.ball.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px Arial';
  ctx.fillText(`${match.scoreHome} - ${match.scoreAway}`, canvas.width / 2 - 26, 42);
}

function updateMatchAnimation() {
  const match = state.currentMatch;
  if (!match) return;

  const now = performance.now();
  const dt = (now - match.lastTimestamp) / 1000;
  match.lastTimestamp = now;
  match.elapsed += dt;

  const nextGoal = match.goalTimeline.find((goal) => !goal.triggered && match.elapsed >= goal.time);
  if (nextGoal) {
    nextGoal.triggered = true;
    if (nextGoal.team === 'home') {
      match.scoreHome += 1;
    } else {
      match.scoreAway += 1;
    }
    state.matchStatus = `${match.homeName} ${match.scoreHome} - ${match.scoreAway} ${match.awayName}`;
  }

  const homeTeam = match.teams.home;
  const awayTeam = match.teams.away;

  homeTeam.forEach((player, index) => {
    const targetX = 130 + (index % 3) * 55 + Math.sin(match.elapsed * 1.5 + index) * 12;
    const targetY = 90 + (index * 37) % 360;
    player.x += (targetX - player.x) * 0.08;
    player.y += (targetY - player.y) * 0.08;
  });

  awayTeam.forEach((player, index) => {
    const targetX = 730 - (index % 3) * 55 + Math.cos(match.elapsed * 1.5 + index) * 12;
    const targetY = 430 - (index * 31) % 360;
    player.x += (targetX - player.x) * 0.08;
    player.y += (targetY - player.y) * 0.08;
  });

  const attackingHome = match.scoreHome <= match.scoreAway ? homeTeam : awayTeam;
  const ballOwner = attackingHome[Math.floor((match.elapsed * 2) % attackingHome.length)];
  match.ball.x += (ballOwner.x - match.ball.x) * 0.09 * 36 * dt;
  match.ball.y += (ballOwner.y - match.ball.y) * 0.09 * 36 * dt;

  if (match.elapsed > 110) {
    finalizeMatch();
    return;
  }

  drawMatchFrame();
  renderMatchOverlay();
  animationFrameId = requestAnimationFrame(updateMatchAnimation);
}

function finalizeMatch() {
  if (!state.currentMatch) return;

  const match = state.currentMatch;
  const fixture = match.fixture;
  const homeGoals = match.scoreHome;
  const awayGoals = match.scoreAway;

  if (homeGoals > awayGoals) {
    state.wins += 1;
    state.points += 3;
    state.budget += 400_000 + Math.floor(Math.random() * 600_000);
    state.morale = clamp(state.morale + 8, 50, 99);
    state.reputation = clamp(state.reputation + 2, 0, 100);
    addLog(`Victory! Lagos City FC beat ${fixture.opponent} ${homeGoals}-${awayGoals}. The crowd is buzzing.`);
    updateLeagueTable(state.clubName, homeGoals, awayGoals, 'win');
    updateLeagueTable(fixture.opponent, awayGoals, homeGoals, 'loss');
  } else if (homeGoals < awayGoals) {
    state.losses += 1;
    state.morale = clamp(state.morale - 6, 50, 99);
    state.reputation = clamp(state.reputation - 1, 0, 100);
    addLog(`Defeat! ${fixture.opponent} win ${awayGoals}-${homeGoals}. Tactical changes are needed.`);
    updateLeagueTable(state.clubName, homeGoals, awayGoals, 'loss');
    updateLeagueTable(fixture.opponent, awayGoals, homeGoals, 'win');
  } else {
    state.draws += 1;
    state.points += 1;
    state.morale = clamp(state.morale + 2, 50, 99);
    addLog(`A draw against ${fixture.opponent}. It is a fair result after a hard-fought match.`);
    updateLeagueTable(state.clubName, homeGoals, awayGoals, 'draw');
    updateLeagueTable(fixture.opponent, awayGoals, homeGoals, 'draw');
  }

  state.players = state.players.map((player) => {
    const fatigue = Math.round(Math.random() * 8 + 3);
    const newFitness = clamp((player.fitness ?? player.stamina ?? 70) - fatigue, 40, 99);
    const injuryRisk = Math.random() < 0.14 ? 1 + Math.floor(Math.random() * 2) : 0;
    return {
      ...player,
      stamina: newFitness,
      fitness: newFitness,
      morale: clamp(player.morale - (injuryRisk > 0 ? 6 : 0), 45, 99),
      injury: injuryRisk > 0 ? injuryRisk : player.injury > 0 ? Math.max(0, player.injury - 1) : 0
    };
  });

  state.fans = Math.max(20000, state.fans + (homeGoals > awayGoals ? 1200 : 300));
  state.currentFixtureIndex += 1;
  state.matchRunning = false;
  state.matchStatus = `${fixture.opponent} ${awayGoals}-${homeGoals} Lagos City FC`;
  state.currentMatch = null;
  state.week += 1;

  if (state.currentFixtureIndex >= state.fixtures.length) {
    addLog(`The league campaign ends with ${state.points} points. The club now looks ahead to next season.`);
  }

  render();
}

function start2DMatch() {
  const fixture = getNextFixture();
  if (!fixture) {
    addLog('The league season is over. You have completed all your fixtures.');
    render();
    return;
  }

  if (state.matchRunning) return;

  state.matchRunning = true;
  state.matchStatus = 'Kick off';
  state.currentMatch = createMatch(fixture);
  renderMatchOverlay();
  drawMatchFrame();
  animationFrameId = requestAnimationFrame(updateMatchAnimation);
}

function quickResult() {
  const fixture = getNextFixture();
  if (!fixture) {
    addLog('No fixtures remain this season.');
    render();
    return;
  }

  if (state.matchRunning) {
    cancelAnimationFrame(animationFrameId);
    state.matchRunning = false;
  }

  const teamStrength = getTeamStrength();
  const opponentStrength = fixture.difficulty;
  const homeBoost = fixture.home ? 2 : 0;

  let homeGoals = 0;
  let awayGoals = 0;
  const baseGoalChance = clamp(teamStrength + homeBoost - opponentStrength, -12, 18);
  const homeChance = Math.max(0.25, 0.5 + baseGoalChance / 50);
  const awayChance = Math.max(0.2, 0.45 - baseGoalChance / 70);

  for (let i = 0; i < 4; i += 1) {
    if (Math.random() < homeChance / 2) homeGoals += 1;
    if (Math.random() < awayChance / 2) awayGoals += 1;
  }

  homeGoals = Math.min(homeGoals, 5);
  awayGoals = Math.min(awayGoals, 5);

  if (homeGoals === 0 && awayGoals === 0 && Math.random() < 0.2) homeGoals += 1;

  state.currentMatch = {
    fixture,
    homeName: state.clubName,
    awayName: fixture.opponent,
    scoreHome: homeGoals,
    scoreAway: awayGoals,
    finalHomeScore: homeGoals,
    finalAwayScore: awayGoals,
    playing: false,
    elapsed: 120,
    teams: {
      home: createTeamPlayers(true, '#44d37a'),
      away: createTeamPlayers(false, '#f6d365')
    },
    ball: { x: 430, y: 260, radius: 7 },
    colorScheme: { home: '#44d37a', away: '#f6d365', ball: '#fdf8ee' }
  };

  state.matchStatus = `${fixture.opponent} ${awayGoals}-${homeGoals} Lagos City FC`;
  renderMatchOverlay();
  drawMatchFrame();
  finalizeMatch();
}

function simulateMatch() {
  start2DMatch();
}

function advanceWeek() {
  state.week += 1;
  state.players = state.players.map((player) => ({
    ...player,
    morale: clamp(player.morale + Math.floor(Math.random() * 4) - 1, 50, 99),
    stamina: clamp((player.stamina ?? player.fitness ?? 70) + Math.floor(Math.random() * 3), 50, 99),
    fitness: clamp((player.fitness ?? player.stamina ?? 70) + Math.floor(Math.random() * 3), 50, 99)
  }));
  state.morale = clamp(state.morale + 1, 50, 99);
  addLog('The week passes and the squad settles into routine training and media duties.');
  render();
}

function advanceSeason() {
  if (state.currentFixtureIndex < state.fixtures.length) {
    addLog('You need to finish the current season before starting a new one.');
    render();
    return;
  }

  state.season += 1;
  state.currentFixtureIndex = 0;
  state.points = 0;
  state.wins = 0;
  state.draws = 0;
  state.losses = 0;
  state.week = 1;
  state.budget += 4_000_000;
  state.fans = Math.max(20000, state.fans + 4000);
  state.fixtures = baseFixtures.map((fixture) => ({ ...fixture, status: 'Upcoming' }));
  state.reputation = clamp(state.reputation + 4, 0, 100);
  state.players = state.players.map((player) => ({
    ...player,
    morale: clamp(player.morale + 4, 50, 99),
    fitness: clamp((player.fitness ?? player.stamina ?? 70) + 5, 45, 99),
    stamina: clamp((player.stamina ?? player.fitness ?? 70) + 5, 45, 99),
    injury: Math.max(0, (player.injury ?? 0) - 1)
  }));
  resetLeagueTable();
  addLog(`Season ${state.season} begins with a fresh campaign and a stronger budget for recruitment.`);
  render();
}

function resetGame() {
  state = structuredClone(defaultState);
  addLog('A new era begins at Lagos City FC. The club is ready for a fresh challenge.');
  render();
}

function init() {
  document.getElementById('trainBtn').addEventListener('click', trainSquad);
  document.getElementById('playBtn').addEventListener('click', simulateMatch);
  document.getElementById('pressBtn').addEventListener('click', pressConference);
  document.getElementById('recoverBtn').addEventListener('click', recoverSquad);
  document.getElementById('startMatchBtn').addEventListener('click', start2DMatch);
  document.getElementById('quickResultBtn').addEventListener('click', quickResult);
  document.getElementById('weekBtn').addEventListener('click', advanceWeek);
  document.getElementById('seasonBtn').addEventListener('click', advanceSeason);
  document.getElementById('scoutBtn').addEventListener('click', scoutTalent);
  document.getElementById('tacticSelect').addEventListener('change', onTacticChange);
  document.getElementById('saveBtn').addEventListener('click', () => {
    saveState();
    addLog('Game saved successfully.');
    render();
  });
  document.getElementById('resetBtn').addEventListener('click', resetGame);

  render();
  drawPitch();
}

init();
window.addEventListener('beforeunload', saveState);
