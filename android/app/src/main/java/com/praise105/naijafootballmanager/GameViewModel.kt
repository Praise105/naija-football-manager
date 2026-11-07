package com.praise105.naijafootballmanager

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import com.google.gson.Gson
import com.praise105.naijafootballmanager.model.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlin.math.max
import kotlin.random.Random

class GameViewModel(application: Application) : AndroidViewModel(application) {
    private val prefs = application.getSharedPreferences("naija-manager", Context.MODE_PRIVATE)
    private val gson = Gson()

    private val _uiState = MutableStateFlow(loadState())
    val uiState: StateFlow<GameState> = _uiState.asStateFlow()

    private fun persist(state: GameState) {
        prefs.edit().putString(KEY, gson.toJson(state)).apply()
    }

    private fun loadState(): GameState {
        return runCatching {
            prefs.getString(KEY, null)?.let { gson.fromJson(it, GameState::class.java) }
                ?: GameState()
        }.getOrElse { GameState() }
    }

    private fun clamp(value: Int, minimum: Int = 0, maximum: Int = 99): Int = value.coerceIn(minimum, maximum)

    private fun withLog(message: String, state: GameState = _uiState.value): GameState {
        return state.copy(log = (listOf(message) + state.log).take(9))
    }

    private fun withHistory(message: String, state: GameState = _uiState.value): GameState {
        return state.copy(history = (listOf(message) + state.history).take(8))
    }

    fun save() {
        val current = _uiState.value
        persist(current)
        _uiState.update { withLog("Game saved successfully.", current) }
    }

    fun reset() {
        val fresh = GameState()
        val next = withLog("A new era begins at Lagos City FC. The club is ready for a fresh challenge.", fresh)
        persist(next)
        _uiState.value = next
    }

    fun train() {
        val s = _uiState.value
        val next = withLog(
            "Training camp boosts squad fitness and confidence ahead of the next match.",
            s.copy(
                players = s.players.map {
                    it.copy(
                        fitness = clamp(it.fitness + Random.nextInt(2, 8)),
                        morale = clamp(it.morale + Random.nextInt(2, 7))
                    )
                },
                morale = clamp(s.morale + 5),
                reputation = clamp(s.reputation + 1),
                bank = s.bank - 250_000,
                budget = s.budget - 250_000
            )
        )
        persist(next)
        _uiState.value = next
    }

    fun recover() {
        val s = _uiState.value
        if (s.bank < 200_000) {
            val next = withLog("There is not enough money for a recovery programme this week.")
            persist(next)
            _uiState.value = next
            return
        }

        val next = withLog(
            "The medical team restores the squad ahead of the fixture list.",
            s.copy(
                bank = s.bank - 200_000,
                budget = s.budget - 200_000,
                players = s.players.map {
                    it.copy(
                        fitness = clamp(it.fitness + 6),
                        injuryWeeks = max(0, it.injuryWeeks - 1)
                    )
                }
            )
        )
        persist(next)
        _uiState.value = next
    }

    fun pressConference() {
        val s = _uiState.value
        val next = withHistory(
            "The club receives positive headlines after a strong press conference.",
            withLog(
                "The press conference goes well. The media praises your leadership.",
                s.copy(
                    morale = clamp(s.morale + if (s.wins >= s.losses) 6 else 2),
                    reputation = clamp(s.reputation + 2)
                )
            )
        )
        persist(next)
        _uiState.value = next
    }

    fun advanceWeek() {
        val s = _uiState.value
        val next = withLog(
            "The squad completes another week of preparation.",
            s.copy(
                week = s.week + 1,
                players = s.players.map {
                    it.copy(
                        fitness = clamp(it.fitness + Random.nextInt(-2, 5), 35),
                        morale = clamp(it.morale + Random.nextInt(-1, 3)),
                        injuryWeeks = max(0, it.injuryWeeks - 1)
                    )
                }
            )
        )
        persist(next)
        _uiState.value = next
    }

    fun chooseTactic(tactic: String) {
        val s = _uiState.value
        val players = if (tactic == "Attacking") {
            s.players.map { it.copy(fitness = clamp(it.fitness - 1), morale = clamp(it.morale + 1)) }
        } else s.players

        val next = withLog(
            "You switch to a $tactic setup. The squad adapts to the new plan.",
            s.copy(tactic = tactic, players = players)
        )
        persist(next)
        _uiState.value = next
    }

    fun chooseFormation(formation: String) {
        val next = withLog(
            "The squad is set up in a $formation shape for the next phase of the season.",
            _uiState.value.copy(formation = formation)
        )
        persist(next)
        _uiState.value = next
    }

    fun scout() {
        val positions = listOf("ST", "CM", "CB", "RW", "GK")
        val id = System.currentTimeMillis()
        val talent = Player(
            id,
            "Young Star ${Random.nextInt(100, 1000)}",
            positions.random(),
            Random.nextInt(18, 23),
            Random.nextInt(72, 81),
            Random.nextInt(70, 91),
            weeklyWage = Random.nextLong(90_000, 190_001)
        )

        val next = withLog(
            "Scouting reports identify ${talent.name}, a ${talent.position} with ${talent.rating} potential.",
            _uiState.value.copy(market = _uiState.value.market + talent)
        )
        persist(next)
        _uiState.value = next
    }

    fun sign(playerId: Long, negotiate: Boolean = false) {
        val s = _uiState.value
        val target = s.market.firstOrNull { it.id == playerId } ?: return
        val fee = if (negotiate) (target.rating * 25_000L * 0.85).toLong() else target.rating * 25_000L
        val total = fee + target.weeklyWage * 12 * target.contractYears

        if (s.bank < total) {
            val next = withLog("The club cannot afford ${target.name} right now. Budget is too tight.")
            persist(next)
            _uiState.value = next
            return
        }

        val signed = target.copy(id = System.currentTimeMillis(), fitness = Random.nextInt(70, 91), morale = 75)
        val next = withLog(
            "${target.name} joins the club for ${money(total)} total package value.",
            s.copy(
                bank = s.bank - total,
                budget = s.budget - total,
                players = s.players + signed,
                market = s.market.filterNot { it.id == playerId }
            )
        )
        persist(next)
        _uiState.value = next
    }

    fun playMatch() {
        val s = _uiState.value
        val fixture = s.fixtures.getOrNull(s.fixtureIndex) ?: run {
            val next = withLog("No fixtures remain this season.")
            persist(next)
            _uiState.value = next
            return
        }

        val strength = s.teamStrength + if (fixture.home) 2 else 0 + when (s.tactic) {
            "Attacking" -> 2
            "Defensive" -> -1
            else -> 0
        }

        val homeScore = (0..4).count { Random.nextInt(100) < (38 + (strength - fixture.difficulty) * 2).coerceIn(12, 72) }
        val awayScore = (0..3).count { Random.nextInt(100) < (30 + (fixture.difficulty - s.teamStrength) * 2).coerceIn(10, 65) }
        finishMatch(fixture, homeScore, awayScore)
    }

    private fun finishMatch(fixture: Fixture, forGoals: Int, againstGoals: Int) {
        val s = _uiState.value
        val won = forGoals > againstGoals
        val drawn = forGoals == againstGoals
        val reward = if (won) Random.nextLong(400_000, 1_000_001) else if (drawn) 180_000L else 0L
        val opponent = fixture.opponent

        val updatedLeague = s.league.map { team ->
            if (team.name == s.clubName) {
                team.copy(
                    played = team.played + 1,
                    wins = team.wins + if (won) 1 else 0,
                    draws = team.draws + if (drawn) 1 else 0,
                    losses = team.losses + if (!won && !drawn) 1 else 0,
                    goalsFor = team.goalsFor + forGoals,
                    goalsAgainst = team.goalsAgainst + againstGoals,
                    points = team.points + if (won) 3 else if (drawn) 1 else 0
                )
            } else if (team.name == opponent) {
                team.copy(
                    played = team.played + 1,
                    wins = team.wins + if (againstGoals > forGoals) 1 else 0,
                    draws = team.draws + if (drawn) 1 else 0,
                    losses = team.losses + if (forGoals > againstGoals) 1 else 0,
                    goalsFor = team.goalsFor + againstGoals,
                    goalsAgainst = team.goalsAgainst + forGoals,
                    points = team.points + if (againstGoals > forGoals) 3 else if (drawn) 1 else 0
                )
            } else team
        }

        val record = when {
            won -> "Victory"
            drawn -> "A draw"
            else -> "Defeat"
        }

        val result = "${fixture.opponent} $againstGoals - $forGoals ${s.clubName}"
        val next = withHistory(
            "Season ${s.season}: $record against $opponent.",
            withLog(
                "$record! $result.",
                s.copy(
                    bank = s.bank + reward,
                    budget = s.budget + reward,
                    revenue = s.revenue + if (won) 300_000 else 100_000,
                    points = s.points + if (won) 3 else if (drawn) 1 else 0,
                    wins = s.wins + if (won) 1 else 0,
                    draws = s.draws + if (drawn) 1 else 0,
                    losses = s.losses + if (!won && !drawn) 1 else 0,
                    morale = clamp(s.morale + if (won) 5 else if (drawn) 2 else -6, 50),
                    reputation = clamp(s.reputation + if (won) 1 else if (drawn) 0 else -1),
                    fans = max(20_000, s.fans + if (won) 1_200 else 300),
                    fixtureIndex = s.fixtureIndex + 1,
                    fixtures = s.fixtures.mapIndexed { index, value ->
                        if (index == s.fixtureIndex) value.copy(played = true, scoreFor = forGoals, scoreAgainst = againstGoals) else value
                    },
                    league = updatedLeague,
                    lastMatch = result,
                    players = s.players.map {
                        it.copy(
                            fitness = clamp(it.fitness - Random.nextInt(3, 10), 35),
                            injuryWeeks = if (Random.nextInt(100) < 8) 1 else it.injuryWeeks
                        )
                    }
                )
            )
        )
        persist(next)
        _uiState.value = next
    }

    fun advanceSeason() {
        val s = _uiState.value
        if (s.fixtureIndex < s.fixtures.size) {
            val next = withLog("Finish the current season before starting a new one.")
            persist(next)
            _uiState.value = next
            return
        }

        val next = withLog(
            "Season ${s.season + 1} begins. The board has added ₦4,000,000 to club funds.",
            withHistory(
                "A new season begins with fresh ambitions.",
                s.copy(
                    season = s.season + 1,
                    fixtureIndex = 0,
                    week = 1,
                    points = 0,
                    wins = 0,
                    draws = 0,
                    losses = 0,
                    bank = s.bank + 4_000_000,
                    budget = s.budget + 4_000_000,
                    fixtures = initialFixtures(),
                    league = initialLeague()
                )
            )
        )
        persist(next)
        _uiState.value = next
    }

    companion object {
        private const val KEY = "game-state-v1"
    }
}

fun money(value: Long): String = "₦" + String.format("%,d", value)
