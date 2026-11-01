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
  bank: 18_000_000,
  budget: 18_000_000,
  revenue: 1_500_000,
  wageBill: 900_000,
  transferBudget: 4_000_000,
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
  formation: '4-3-3',
  teamStrength: 77,
  currentFixtureIndex: 0,
  log: [
    'You have been appointed manager of Lagos City FC. The pressure is on to build a title-winning side.',
    'Your first task is to steady the squad and get points on the board.'
  ],
  history: [
    'The season opens with a new manager and bright ambitions for Lagos City FC.',
    'The board expects progress, but the road to glory begins with steady results.'
  ],
  players: [
    {
      id: 1,
      name: 'Ayo Balogun',
      position: 'GK',
      age: 25,
      rating: 78,
      stamina: 82,
      fitness: 82,
      morale: 80,
      injury: 0,
      suspension: 0,
      weeklyWage: 220_000,
      contractLength: 2,
      value: 1_500_000,
      attributes: { pace: 65, shooting: 20, passing: 62, dribbling: 35, defending: 82, physical: 74, technique: 64, leadership: 76 }
    },
    {
      id: 2,
      name: 'Tunde Adebayo',
      position: 'RB',
      age: 24,
      rating: 75,
      stamina: 77,
      fitness: 77,
      morale: 78,
      injury: 0,
      suspension: 0,
      weeklyWage: 200_000,
      contractLength: 2,
      value: 1_200_000,
      attributes: { pace: 78, shooting: 34, passing: 65, dribbling: 62, defending: 74, physical: 76, technique: 66, leadership: 60 }
    },
    {
      id: 3,
      name: 'Eze Nwosu',
      position: 'CB',
      age: 27,
      rating: 81,
      stamina: 79,
      fitness: 79,
      morale: 80,
      injury: 0,
      suspension: 0,
      weeklyWage: 280_000,
      contractLength: 3,
      value: 2_400_000,
      attributes: { pace: 66, shooting: 28, passing: 63, dribbling: 44, defending: 86, physical: 84, technique: 70, leadership: 82 }
    },
    {
      id: 4,
      name: 'Musa Ibrahim',
      position: 'CB',
      age: 23,
      rating: 76,
      stamina: 81,
      fitness: 81,
      morale: 76,
      injury: 0,
      suspension: 0,
      weeklyWage: 170_000,
      contractLength: 2,
      value: 1_600_000,
      attributes: { pace: 71, shooting: 26, passing: 58, dribbling: 41, defending: 79, physical: 81, technique: 64, leadership: 62 }
    },
    {
      id: 5,
      name: 'Kelechi Okafor',
      position: 'LB',
      age: 22,
      rating: 74,
      stamina: 75,
      fitness: 75,
      morale: 74,
      injury: 0,
      suspension: 0,
      weeklyWage: 160_000,
      contractLength: 2,
      value: 1_000_000,
      attributes: { pace: 79, shooting: 25, passing: 71, dribbling: 66, defending: 75, physical: 73, technique: 68, leadership: 54 }
    },
    {
      id: 6,
      name: 'Seyi Lawal',
      position: 'CM',
      age: 26,
      rating: 82,
      stamina: 84,
      fitness: 84,
      morale: 83,
      injury: 0,
      suspension: 0,
      weeklyWage: 320_000,
      contractLength: 3,
      value: 2_900_000,
      attributes: { pace: 73, shooting: 66, passing: 85, dribbling: 74, defending: 77, physical: 81, technique: 83, leadership: 78 }
    },
    {
      id: 7,
      name: 'Babatunde Ali',
      position: 'CM',
      age: 25,
      rating: 79,
      stamina: 80,
      fitness: 80,
      morale: 81,
      injury: 0,
      suspension: 0,
      weeklyWage: 210_000,
      contractLength: 3,
      value: 2_000_000,
      attributes: { pace: 77, shooting: 62, passing: 76, dribbling: 71, defending: 72, physical: 79, technique: 74, leadership: 64 }
    },
    {
      id: 8,
      name: 'Emmanuel Oke',
      position: 'RW',
      age: 24,
      rating: 80,
      stamina: 81,
      fitness: 81,
      morale: 82,
      injury: 0,
      suspension: 0,
      weeklyWage: 260_000,
      contractLength: 2,
      value: 2_700_000,
      attributes: { pace: 86, shooting: 72, passing: 68, dribbling: 81, defending: 38, physical: 64, technique: 75, leadership: 58 }
    },
    {
      id: 9,
      name: 'Nnamdi Akin',
      position: 'ST',
      age: 28,
      rating: 84,
      stamina: 76,
      fitness: 76,
      morale: 79,
      injury: 0,
      suspension: 0,
      weeklyWage: 430_000,
      contractLength: 2,
      value: 4_000_000,
      attributes: { pace: 82, shooting: 88, passing: 56, dribbling: 80, defending: 28, physical: 77, technique: 81, leadership: 72 }
    },
    {
      id: 10,
      name: 'Chibuzor Eze',
      position: 'LW',
      age: 25,
      rating: 81,
      stamina: 78,
      fitness: 78,
      morale: 80,
      injury: 0,
      suspension: 0,
      weeklyWage: 310_000,
      contractLength: 3,
      value: 3_000_000,
      attributes: { pace: 84, shooting: 68, passing: 80, dribbling: 82, defending: 32, physical: 60, technique: 79, leadership: 57 }
    },
    {
      id: 11,
      name: 'Ifeanyi Udo',
      position: 'AM',
      age: 27,
      rating: 83,
      stamina: 83,
      fitness: 83,
      morale: 84,
      injury: 0,
      suspension: 0,
      weeklyWage: 360_000,
      contractLength: 3,
      value: 3_900_000,
      attributes: { pace: 76, shooting: 80, passing: 84, dribbling: 82, defending: 46, physical: 69, technique: 85, leadership: 80 }
    }
  ],
  fixtures: baseFixtures.map((fixture) => ({ ...fixture })),
  transferMarket: [
    { id: 101, name: 'Daniel Okon', position: 'ST', rating: 76, askingPrice: 2_500_000, age: 25, weeklyWage: 190_000, contractLength: 2,
      attributes: { pace: 79, shooting: 77, passing: 58, dribbling: 73, defending: 24, physical: 72, technique: 70, leadership: 59 } },
    { id: 102, name: 'Yemi Folarin', position: 'CM', rating: 75, askingPrice: 2_100_000, age: 23, weeklyWage: 180_000, contractLength: 2,
      attributes: { pace: 73, shooting: 62, passing: 79, dribbling: 69, defending: 68, physical: 72, technique: 70, leadership: 55 } },
    { id: 103, name: 'Femi Owolabi', position: 'CB', rating: 74, askingPrice: 1_800_000, age: 22, weeklyWage: 150_000, contractLength: 3,
      attributes: { pace: 70, shooting: 20, passing: 58, dribbling: 42, defending: 77, physical: 80, technique: 63, leadership: 61 } },
    { id: 104, name: 'Stanley Bassey', position: 'RW', rating: 77, askingPrice: 2_700_000, age: 24, weeklyWage: 205_000, contractLength: 2,
      attributes: { pace: 84, shooting: 70, passing: 63, dribbling: 78, defending: 38, physical: 60, technique: 72, leadership: 58 } },
    { id: 105, name: 'Umar Musa', position: 'GK', rating: 73, askingPrice: 1_400_000, age: 21, weeklyWage: 120_000, contractLength: 2,
      attributes: { pace: 58, shooting: 20, passing: 61, dribbling: 32, defending: 76, physical: 74, technique: 62, leadership: 65 } }
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
  matchStatus: 'Kick off',
  matchEvents: []
};

const tactics = [
  {
    id: 'balanced',
    title: 'Balanced',
    summary: 'Stable defending with controlled possession and measured transitions.',
    strengths: ['Good structure', 'Reliable pressing', 'Safe transitions']
  },
  {
    id: 'attacking',
    title: 'Attacking',
    summary: 'High press and aggressive wing play designed to overwhelm defenders.',
    strengths: ['More chances created', 'Faster build-up', 'Direct attacks']
  },
  {
    id: 'defensive',
    title: 'Defensive',
    summary: 'Compact back line and disciplined shape to absorb pressure and counter.',
    strengths: ['Tighter midfield', 'Improved security', 'Better counters']
  }
];

const formations = [
  {
    id: '4-3-3',
    title: '4-3-3',
    summary: 'An aggressive shape with width, central control, and quick front-line pressing.',
    strengths: ['Wide overload', 'Strong midfield connection', 'Compact front line']
  },
  {
    id: '4-2-3-1',
    title: '4-2-3-1',
    summary: 'A flexible system that balances midfield control and central creativity.',
    strengths: ['Protection in midfield', 'Creative number 10', 'Front-foot pressing']
  },
  {
    id: '3-5-2',
    title: '3-5-2',
    summary: 'An attacking wing-back shape built around wing control and second balls.',
    strengths: ['Extra width', 'Dominant midfield', 'Vertical passing']
  },
  {
    id: '5-3-2',
    title: '5-3-2',
    summary: 'A deep, secure structure suited to tough away fixtures and defensive solidity.',
    strengths: ['Solid defense', 'Compact shape', 'Counter-attacking focus']
  }
];

let state = loadState();
let animationFrameId = null;

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }

function formatMoney(value) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
}

function averageTeamRating() {
  if (!state.players.length) return 0;
  return Math.round(state.players.reduce((sum, player) => sum + player.rating, 0) / state.players.length);
}

function getPlayerOverall(player) {
  if (!player.attributes) return player.rating || 70;
  const values = Object.values(player.attributes);
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
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

function addHistory(message) {
  state.history.unshift(message);
  state.history = state.history.slice(0, 8);
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
  document.getElementById('bankValue').textContent = formatMoney(state.bank);
  document.getElementById('budgetValue').textContent = formatMoney(state.budget);
  document.getElementById('revenueValue').textContent = formatMoney(state.revenue);
  document.getElementById('wageValue').textContent = formatMoney(state.wageBill);
  document.getElementById('transferBudgetValue').textContent = formatMoney(state.transferBudget);
  document.getElementById('clubName').textContent = state.clubName;
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
    const statusText = player.suspension > 0 ? `Suspended ${player.suspension}` : player.injury > 0 ? `Injured ${player.injury} w` : `Fit ${fitness}`;
    const badgeClass = player.suspension > 0 ? 'injured' : player.injury > 0 ? 'injured' : 'fitness';
    const overall = getPlayerOverall(player);
    const attrs = player.attributes ? Object.entries(player.attributes).map(([key, value]) => `<span class="attr-pill">${capitalize(key)} ${value}</span>`) : [];

    card.innerHTML = `
      <div class="player-card-header">
        <div>
          <strong>${player.name}</strong>
        </div>
        <span class="player-rating">${overall}</span>
      </div>
      <div class="player-meta">
        <span>${player.position}</span>
        <span>Age ${player.age}</span>
        <span>Morale ${player.morale}</span>
        <span>Wage ${formatMoney(player.weeklyWage)}</span>
      </div>
      <div class="player-badges">
        <span class="player-status ${badgeClass}">${statusText}</span>
        <span class="player-status fitness">Contract ${player.contractLength}y</span>
      </div>
      <div class="player-attributes">${attrs.join('')}</div>
    `;
    container.appendChild(card);
  });
}

function renderTransferMarket() {
  const container = document.getElementById('transferMarket');
  container.innerHTML = '';

  state.transferMarket.forEach((player) => {
    const topAttr = player.attributes ? Object.values(player.attributes).reduce((sum, value) => sum + value, 0) / Object.keys(player.attributes).length : 0;
    const card = document.createElement('div');
    card.className = 'market-card';
    card.innerHTML = `
      <div class="market-header">
        <strong>${player.name}</strong>
        <span class="market-price">${Math.round(topAttr)}</span>
      </div>
      <div class="market-meta">
        <span>${player.position}</span>
        <span>Age ${player.age}</span>
        <span>Contract ${player.contractLength}y</span>
      </div>
      <div class="market-meta">
        <span>Price: ${formatMoney(player.askingPrice)}</span>
        <span>Wage: ${formatMoney(player.weeklyWage)}</span>
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

function renderHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  state.history.forEach((entry) => {
    const item = document.createElement('li');
    item.textContent = entry;
    list.appendChild(item);
  });
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

function renderMatchFeed() {
  const feed = document.getElementById('matchEventFeed');
  feed.innerHTML = '';
  const items = state.matchEvents.slice(0, 6);

  items.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    feed.appendChild(li);
  });
}

function renderTacticsPage() {
  const container = document.getElementById('tacticsPageContent');
  container.innerHTML = tactics.map((tactic) => `
    <article class="content-card ${state.tactic === tactic.id ? 'selected' : ''}">
      <div class="content-card-header">
        <h3>${tactic.title}</h3>
        <span class="content-badge">${state.tactic === tactic.id ? 'Active' : 'Available'}</span>
      </div>
      <p>${tactic.summary}</p>
      <ul>
        ${tactic.strengths.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <button class="primary tactic-select-btn" data-tactic="${tactic.id}" type="button">${state.tactic === tactic.id ? 'Selected' : 'Choose tactic'}</button>
    </article>
  `).join('');

  container.querySelectorAll('.tactic-select-btn').forEach((button) => {
    button.addEventListener('click', () => {
      state.tactic = button.dataset.tactic;
      applyTacticToTeam();
      addLog(`You switch to a ${capitalize(state.tactic)} setup. The squad adapts to the new plan.`);
      render();
    });
  });
}

function renderFormationsPage() {
  const container = document.getElementById('formationsPageContent');
  container.innerHTML = formations.map((formation) => `
    <article class="content-card ${state.formation === formation.id ? 'selected' : ''}">
      <div class="content-card-header">
        <h3>${formation.title}</h3>
        <span class="content-badge">${state.formation === formation.id ? 'Active' : 'Shape'}</span>
      </div>
      <p>${formation.summary}</p>
      <ul>
        ${formation.strengths.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <button class="primary formation-select-btn" data-formation="${formation.id}" type="button">${state.formation === formation.id ? 'Selected' : 'Choose formation'}</button>
    </article>
  `).join('');

  container.querySelectorAll('.formation-select-btn').forEach((button) => {
    button.addEventListener('click', () => {
      state.formation = button.dataset.formation;
      addLog(`The squad is set up in a ${state.formation} shape for the next phase of the season.`);
      render();
    });
  });
}

function renderTransferPage() {
  const container = document.getElementById('transferMarketPageContent');

  if (!state.transferMarket.length) {
    container.innerHTML = '<div class="empty-state">No targets are available in the market right now.</div>';
    return;
  }

  container.innerHTML = state.transferMarket.map((player) => {
    const overall = player.attributes ? Math.round(Object.values(player.attributes).reduce((sum, value) => sum + value, 0) / Object.keys(player.attributes).length) : player.rating;
    return `
      <article class="content-card">
        <div class="content-card-header">
          <h3>${player.name}</h3>
          <span class="content-badge">${overall}</span>
        </div>
        <p>${player.position} • Age ${player.age} • Contract ${player.contractLength} years</p>
        <ul>
          <li>Asking price: ${formatMoney(player.askingPrice)}</li>
          <li>Weekly wage: ${formatMoney(player.weeklyWage)}</li>
          <li>Rating: ${player.rating}</li>
        </ul>
        <button class="primary buy-btn" data-player-id="${player.id}" type="button">Buy Player</button>
        <button class="secondary negotiate-btn" data-player-id="${player.id}" type="button">Negotiate</button>
      </article>
    `;
  }).join('');

  container.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', () => buyPlayer(Number(button.dataset.playerId)));
  });

  container.querySelectorAll('.negotiate-btn').forEach((button) => {
    button.addEventListener('click', () => negotiateTransfer(Number(button.dataset.playerId)));
  });
}

function render() {
  renderStats();
  renderRoster();
  renderTransferMarket();
  renderFixtures();
  renderLeagueTable();
  renderHistory();
  renderLog();
  renderMatchOverlay();
  renderMatchFeed();
  renderTacticsPage();
  renderFormationsPage();
  renderTransferPage();
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
  state.bank -= 250_000;
  state.budget -= 250_000;
  state.wageBill = state.players.reduce((sum, player) => sum + (player.weeklyWage || 0), 0);
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
    askingPrice: 900_000 + Math.floor(Math.random() * 2_500_000),
    weeklyWage: 90_000 + Math.floor(Math.random() * 100_000),
    contractLength: 2 + Math.floor(Math.random() * 2),
    attributes: {
      pace: 60 + Math.floor(Math.random() * 24),
      shooting: 50 + Math.floor(Math.random() * 27),
      passing: 50 + Math.floor(Math.random() * 25),
      dribbling: 52 + Math.floor(Math.random() * 25),
      defending: 50 + Math.floor(Math.random() * 25),
      physical: 50 + Math.floor(Math.random() * 30),
      technique: 50 + Math.floor(Math.random() * 28),
      leadership: 48 + Math.floor(Math.random() * 20)
    }
  };

  state.transferMarket.push(topTalent);
  addLog(`Scouting reports identify a promising youngster: ${topTalent.name}, a ${topTalent.position} with ${topTalent.rating} potential.`);
  render();
}

function buyPlayer(playerId) {
  const player = state.transferMarket.find((item) => item.id === playerId);
  if (!player) return;

  const totalCost = player.askingPrice + player.weeklyWage * 12 * player.contractLength;
  if (state.bank < totalCost) {
    addLog(`The club cannot afford ${player.name} right now. Budget is too tight.`);
    render();
    return;
  }

  state.bank -= totalCost;
  state.budget -= totalCost;
  state.players.push({
    id: Date.now(),
    name: player.name,
    position: player.position,
    age: player.age,
    rating: player.rating,
    stamina: 70 + Math.floor(Math.random() * 20),
    fitness: 70 + Math.floor(Math.random() * 20),
    morale: 70 + Math.floor(Math.random() * 20),
    injury: 0,
    suspension: 0,
    weeklyWage: player.weeklyWage,
    contractLength: player.contractLength,
    value: player.askingPrice,
    attributes: player.attributes || { pace: 70, shooting: 70, passing: 70, dribbling: 70, defending: 70, physical: 70, technique: 70, leadership: 70 }
  });

  state.transferMarket = state.transferMarket.filter((item) => item.id !== playerId);
  state.wageBill = state.players.reduce((sum, current) => sum + (current.weeklyWage || 0), 0);
  addLog(`${player.name} joins the club for ${formatMoney(totalCost)} total package value.`);
  render();
}

function negotiateTransfer(playerId) {
  const player = state.transferMarket.find((item) => item.id === playerId);
  if (!player) return;

  const discountedPrice = Math.round(player.askingPrice * 0.85);
  const totalCost = discountedPrice + player.weeklyWage * 12 * player.contractLength;

  if (state.bank < totalCost) {
    addLog(`The board rejects the bid for ${player.name}. The asking price is too high.`);
    render();
    return;
  }

  state.bank -= totalCost;
  state.budget -= totalCost;
  state.players.push({
    id: Date.now(),
    name: player.name,
    position: player.position,
    age: player.age,
    rating: player.rating,
    stamina: 72 + Math.floor(Math.random() * 18),
    fitness: 72 + Math.floor(Math.random() * 18),
    morale: 72 + Math.floor(Math.random() * 18),
    injury: 0,
    suspension: 0,
    weeklyWage: player.weeklyWage,
    contractLength: player.contractLength,
    value: discountedPrice,
    attributes: player.attributes || { pace: 70, shooting: 70, passing: 70, dribbling: 70, defending: 70, physical: 70, technique: 70, leadership: 70 }
  });

  state.transferMarket = state.transferMarket.filter((item) => item.id !== playerId);
  state.wageBill = state.players.reduce((sum, current) => sum + (current.weeklyWage || 0), 0);
  addLog(`${player.name} is signed after successful negotiations for ${formatMoney(totalCost)} total package value.`);
  render();
}

function pressConference() {
  const boost = state.wins >= state.losses ? 6 : 2;
  state.morale = clamp(state.morale + boost, 50, 99);
  state.reputation = clamp(state.reputation + 2, 0, 100);
  addHistory('The club receives positive headlines after a strong press conference.');
  addLog('The press conference goes well. The media praises your tactical plan and squad leadership.');
  render();
}

function recoverSquad() {
  if (state.bank < 200_000) {
    addLog('There is not enough money for a recovery programme this week.');
    render();
    return;
  }

  state.bank -= 200_000;
  state.budget -= 200_000;
  state.players = state.players.map((player) => ({
    ...player,
    stamina: clamp((player.stamina ?? player.fitness ?? 70) + 6, 50, 99),
    fitness: clamp((player.fitness ?? player.stamina ?? 70) + 6, 50, 99),
    injury: Math.max(0, (player.injury ?? 0) - 1),
    suspension: Math.max(0, (player.suspension ?? 0) - 1),
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

function generateMatchEvents(homeGoals, awayGoals) {
  const events = [];
  const total = Math.max(6, homeGoals + awayGoals + 4);
  for (let i = 0; i < total; i += 1) {
    const eventType = ['Shot on target', 'Foul', 'Long ball', 'Corner', 'Attack develops', 'Substitution'][Math.floor(Math.random() * 6)];
    const team = i % 2 === 0 ? 'Lagos City FC' : 'Opponent';
    const minute = 5 + Math.floor(Math.random() * 80);
    events.push(`${minute}' ${team} • ${eventType}`);
  }

  if (homeGoals > 0) {
    events.push(`${Math.floor(Math.random() * 75) + 10}' Lagos City FC • Goal!`);
  }
  if (awayGoals > 0) {
    events.push(`${Math.floor(Math.random() * 75) + 10}' Opponent • Goal!`);
  }

  return events.slice(0, 10).sort((a, b) => Number(a.split("' ")[0]) - Number(b.split("' ")[0]));
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
    colorScheme: teamColors,
    events: generateMatchEvents(actualHomeGoals, actualAwayGoals)
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
      state.matchEvents.unshift(`${Math.round(match.elapsed)}' Lagos City FC • Goal!`);
    } else {
      match.scoreAway += 1;
      state.matchEvents.unshift(`${Math.round(match.elapsed)}' Opponent • Goal!`);
    }
    state.matchStatus = `${match.homeName} ${match.scoreHome} - ${match.scoreAway} ${match.awayName}`;
  }

  if (Math.random() < 0.03) {
    state.matchEvents.unshift(`${Math.round(match.elapsed)}' ${Math.random() < 0.5 ? 'Lagos City FC' : 'Opponent'} • ${['Shot on target', 'Foul', 'Corner', 'Chance created'][Math.floor(Math.random() * 4)]}`);
  }

  state.matchEvents = state.matchEvents.slice(0, 10);

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
  if (ballOwner) {
    match.ball.x += (ballOwner.x - match.ball.x) * 0.09 * 36 * dt;
    match.ball.y += (ballOwner.y - match.ball.y) * 0.09 * 36 * dt;
  }

  if (match.elapsed > 110) {
    finalizeMatch();
    return;
  }

  drawMatchFrame();
  renderMatchOverlay();
  renderMatchFeed();
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
    state.bank += 400_000 + Math.floor(Math.random() * 600_000);
    state.budget += 400_000 + Math.floor(Math.random() * 600_000);
    state.revenue += 300_000;
    state.morale = clamp(state.morale + 8, 50, 99);
    state.reputation = clamp(state.reputation + 2, 0, 100);
    addLog(`Victory! Lagos City FC beat ${fixture.opponent} ${homeGoals}-${awayGoals}. The crowd is buzzing.`);
    addHistory(`A memorable win over ${fixture.opponent} at ${fixture.venue.toLowerCase()} lifts the mood.`);
    updateLeagueTable(state.clubName, homeGoals, awayGoals, 'win');
    updateLeagueTable(fixture.opponent, awayGoals, homeGoals, 'loss');
  } else if (homeGoals < awayGoals) {
    state.losses += 1;
    state.morale = clamp(state.morale - 6, 50, 99);
    state.reputation = clamp(state.reputation - 1, 0, 100);
    addLog(`Defeat! ${fixture.opponent} win ${awayGoals}-${homeGoals}. Tactical changes are needed.`);
    addHistory(`${fixture.opponent} leave with a narrow win, leaving the club to regroup.`);
    updateLeagueTable(state.clubName, homeGoals, awayGoals, 'loss');
    updateLeagueTable(fixture.opponent, awayGoals, homeGoals, 'win');
  } else {
    state.draws += 1;
    state.points += 1;
    state.morale = clamp(state.morale + 2, 50, 99);
    addLog(`A draw against ${fixture.opponent}. It is a fair result after a hard-fought match.`);
    addHistory(`Lagos City FC take a hard-fought point against ${fixture.opponent}.`);
    updateLeagueTable(state.clubName, homeGoals, awayGoals, 'draw');
    updateLeagueTable(fixture.opponent, awayGoals, homeGoals, 'draw');
  }

  state.players = state.players.map((player) => {
    const fatigue = Math.round(Math.random() * 8 + 3);
    const newFitness = clamp((player.fitness ?? player.stamina ?? 70) - fatigue, 35, 99);
    const injuryRisk = Math.random() < 0.14 ? 1 + Math.floor(Math.random() * 2) : 0;
    const suspensionRisk = Math.random() < 0.09 ? 1 : 0;
    return {
      ...player,
      stamina: newFitness,
      fitness: newFitness,
      morale: clamp(player.morale - (injuryRisk > 0 || suspensionRisk > 0 ? 5 : 0), 45, 99),
      injury: injuryRisk > 0 ? injuryRisk : player.injury > 0 ? Math.max(0, player.injury - 1) : 0,
      suspension: suspensionRisk > 0 ? 1 : player.suspension > 0 ? Math.max(0, player.suspension - 1) : 0
    };
  });

  state.wageBill = state.players.reduce((sum, player) => sum + (player.weeklyWage || 0), 0);
  state.fans = Math.max(20000, state.fans + (homeGoals > awayGoals ? 1200 : 300));
  state.currentFixtureIndex += 1;
  state.matchRunning = false;
  state.matchStatus = `${fixture.opponent} ${awayGoals}-${homeGoals} Lagos City FC`;
  state.currentMatch = null;
  state.matchEvents = [];
  state.week += 1;

  if (state.currentFixtureIndex >= state.fixtures.length) {
    addLog(`The league campaign ends with ${state.points} points. The club now looks ahead to next season.`);
    addHistory('The league campaign ends and the board begins planning for the next chapter.');
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
  state.matchEvents = state.currentMatch.events;
  renderMatchOverlay();
  drawMatchFrame();
  renderMatchFeed();
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
    teams: { home: createTeamPlayers(true, '#44d37a'), away: createTeamPlayers(false, '#f6d365') },
    ball: { x: 430, y: 260, radius: 7 },
    colorScheme: { home: '#44d37a', away: '#f6d365', ball: '#fdf8ee' },
    events: generateMatchEvents(homeGoals, awayGoals)
  };

  state.matchStatus = `${fixture.opponent} ${awayGoals}-${homeGoals} Lagos City FC`;
  state.matchEvents = state.currentMatch.events;
  renderMatchOverlay();
  drawMatchFrame();
  renderMatchFeed();
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
    fitness: clamp((player.fitness ?? player.stamina ?? 70) + Math.floor(Math.random() * 3), 50, 99),
    injury: Math.max(0, (player.injury ?? 0) - 1),
    suspension: Math.max(0, (player.suspension ?? 0) - 1)
  }));
  state.morale = clamp(state.morale + 1, 50, 99);
  state.revenue = Math.max(400_000, state.revenue + 200_000);
  state.bank += state.revenue;
  state.budget += state.revenue;
  state.wageBill = state.players.reduce((sum, player) => sum + (player.weeklyWage || 0), 0);
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
  state.bank += 4_000_000;
  state.budget += 4_000_000;
  state.transferBudget += 1_500_000;
  state.fans = Math.max(20000, state.fans + 4000);
  state.fixtures = baseFixtures.map((fixture) => ({ ...fixture, status: 'Upcoming' }));
  state.reputation = clamp(state.reputation + 4, 0, 100);
  state.players = state.players.map((player) => ({
    ...player,
    morale: clamp(player.morale + 4, 50, 99),
    fitness: clamp((player.fitness ?? player.stamina ?? 70) + 5, 45, 99),
    stamina: clamp((player.stamina ?? player.fitness ?? 70) + 5, 45, 99),
    injury: Math.max(0, (player.injury ?? 0) - 1),
    suspension: Math.max(0, (player.suspension ?? 0) - 1)
  }));
  resetLeagueTable();
  addHistory(`Season ${state.season} begins with renewed investment and fresh ambition.`);
  addLog(`Season ${state.season} begins with a fresh campaign and a stronger budget for recruitment.`);
  render();
}

function resetGame() {
  state = structuredClone(defaultState);
  addLog('A new era begins at Lagos City FC. The club is ready for a fresh challenge.');
  render();
}

function switchPage(pageKey) {
  const targetPage = pageKey === 'dashboard' ? 'dashboardPage' : `${pageKey}Page`;
  document.querySelectorAll('.page-section').forEach((section) => {
    const isActive = section.id === targetPage;
    section.classList.toggle('active', isActive);
  });

  document.querySelectorAll('.page-tab').forEach((tab) => {
    const isActive = tab.dataset.page === pageKey;
    tab.classList.toggle('active', isActive);
  });
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

  document.querySelectorAll('.page-tab').forEach((tab) => {
    tab.addEventListener('click', () => switchPage(tab.dataset.page));
  });

  state.wageBill = state.players.reduce((sum, player) => sum + (player.weeklyWage || 0), 0);
  render();
  drawPitch();
}

init();
window.addEventListener('beforeunload', saveState);
