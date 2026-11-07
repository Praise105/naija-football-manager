package com.praise105.naijafootballmanager

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import com.google.gson.Gson
import com.praise105.naijafootballmanager.model.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlin.math.max
import kotlin.random.Random

class GameViewModel(application: Application) : AndroidViewModel(application) {
    private val preferences = application.getSharedPreferences("naija-manager", Context.MODE_PRIVATE)
    private val gson = Gson()

    private val _uiState = MutableStateFlow(loadState())
    val uiState: StateFlow<GameState> = _uiState.asStateFlow()

    private fun loadState(): GameState = runCatching {
        preferences.getString(SAVE_KEY, null)?.let { gson.fromJson(it, GameState::class.java) } ?: GameState()
    }.getOrElse { GameState() }

    private fun commit(next: GameState) {
        _uiState.value = next
        preferences.edit().putString(SAVE_KEY, gson.toJson(next)).apply()
    }

    private fun clamp(value: Int, minimum: Int = 0, maximum: Int = 99) = value.coerceIn(minimum, maximum)
    private fun addLog(state: GameState, message: String) = state.copy(log = (listOf(message) + state.log).take(9))
    private fun addHistory(state: GameState, message: String) = state.copy(history = (listOf(message) + state.history).take(8))

    fun save() {
        commit(addLog(_uiState.value, "Game saved successfully."))
    }

    fun reset() {
        commit(addLog(GameState(), "A new era begins at Lagos City FC. The club is ready for a fresh challenge."))
    }

    fun train() {
        val s = _uiState.value
        if (s.bank < TRAINING_COST) {
            commit(addLog(s, "The club cannot afford the training camp."))
            return
        }
        val next = s.copy(
            players = s.players.map { it.copy(fitness = clamp(it.fitness + Random.nextInt(2, 8)), morale = clamp(it.morale + Random.nextInt(2, 7))) },
            morale = clamp(s.morale + 5),
            reputation = clamp(s.reputation + 1),
            bank = s.bank - TRAINING_COST,
            budget = s.budget - TRAINING_COST
        )
        commit(addLog(next, "Training camp boosts squad fitness and confidence ahead of the next match."))
    }

    fun recover() {
        val s = _uiState.value
        if (s.bank < RECOVERY_COST) {
            commit(addLog(s, "There is not enough money for a recovery programme this week."))
            return
        }
        val next = s.copy(
            bank = s.bank - RECOVERY_COST,
            budget = s.budget - RECOVERY_COST,
            players = s.players.map { it.copy(fitness = clamp(it.fitness + 6), injuryWeeks = max(0, it.injuryWeeks - 1)) }
        )
        commit(addLog(next, "The medical team restores the squad ahead of the fixture list."))
    }

    fun pressConference() {
        val s = _uiState.value
        val next = s.copy(
            morale = clamp(s.morale + if (s.wins >= s.losses) 6 else 2),
            reputation = clamp(s.reputation + 2)
        )
        commit(addHistory(addLog(next, "The press conference goes well. The media praises your leadership."), "The club receives positive headlines after a strong press conference."))
    }

    fun advanceWeek() {
        val s = _uiState.value
        val next = s.copy(
            week = s.week + 1,
            players = s.players.map {
                it.copy(
                    fitness = clamp(it.fitness + Random.nextInt(-2, 5), 35),
                    morale = clamp(it.morale + Random.nextInt(-1, 3)),
                    injuryWeeks = max(0, it.injuryWeeks - 1)
                )
            }
        )
        commit(addLog(next, "The squad completes another week of preparation."))
    }

    fun chooseTactic(tactic: String) {
        if (tactic !in TACTICS) return
        val s = _uiState.value
        val players = if (tactic == "Attacking") s.players.map { it.copy(fitness = clamp(it.fitness - 1), morale = clamp(it.morale + 1)) } else s.players
        commit(addLog(s.copy(tactic = tactic, players = players), "You switch to a $tactic setup. The squad adapts to the new plan."))
    }

    fun chooseFormation(formation: String) {
        if (formation !in FORMATIONS) return
        val s = _uiState.value
        commit(addLog(s.copy(formation = formation), "The squad is set up in a $formation shape for the next phase of the season."))
    }

    fun scout() {
        val s = _uiState.value
        val positions = listOf("ST", "CM", "CB", "RW", "GK")
        val talent = Player(
            id = System.currentTimeMillis(),
            name = "Young Star ${Random.nextInt(100, 1000)}",
            position = positions.random(),
            age = Random.nextInt(18, 23),
            rating = Random.nextInt(72, 81),
            fitness = Random.nextInt(70, 91),
            weeklyWage = Random.nextLong(90_000, 190_001)
        )
        commit(addLog(s.copy(market = s.market + talent), "Scouting reports identify ${talent.name}, a ${talent.position} with ${talent.rating} potential."))
    }

    fun sign(playerId: Long, negotiate: Boolean = false) {
        val s = _uiState.value
        val target = s.market.firstOrNull { it.id == playerId } ?: return
        val fee = target.rating * 25_000L * if (negotiate) 85 / 100 else 1
        val total = fee + target.weeklyWage * 12 * target.contractYears
        if (s.bank < total) {
            commit(addLog(s, "The club cannot afford ${target.name} right now. Budget is too tight."))
            return
        }
        val signed = target.copy(id = System.currentTimeMillis(), fitness = Random.nextInt(70, 91), morale = 75)
        val next = s.copy(
            bank = s.bank - total,
            budget = s.budget - total,
            players = s.players + signed,
            market = s.market.filterNot { it.id == playerId }
        )
        commit(addLog(next, "${target.name} joins the club for ${money(total)} total package value."))
    }

    fun playMatch() {
        val s = _uiState.value
        val fixture = s.fixtures.getOrNull(s.fixtureIndex)
        if (fixture == null) {
            commit(addLog(s, "No fixtures remain this season."))
            return
        }
        val tacticBonus = when (s.tactic) { "Attacking" -> 2; "Defensive" -> -1; else -> 0 }
        val clubStrength = s.teamStrength + (if (fixture.home) 2 else 0) + tacticBonus
        val clubChance = (38 + (clubStrength - fixture.difficulty) * 2).coerceIn(12, 72)
        val opponentChance = (30 + (fixture.difficulty - s.teamStrength) * 2).coerceIn(10, 65)
        val clubGoals = (0..4).count { Random.nextInt(100) < clubChance }
        val opponentGoals = (0..3).count { Random.nextInt(100) < opponentChance }
        finishMatch(fixture, clubGoals, opponentGoals)
    }

    private fun finishMatch(fixture: Fixture, clubGoals: Int, opponentGoals: Int) {
        val s = _uiState.value
        val won = clubGoals > opponentGoals
        val drawn = clubGoals == opponentGoals
        val reward = when { won -> Random.nextLong(400_000, 1_000_001); drawn -> 180_000L; else -> 0L }
        val league = s.league.map { team ->
            when (team.name) {
                s.clubName -> team.copy(
                    played = team.played + 1,
                    wins = team.wins + if (won) 1 else 0,
                    draws = team.draws + if (drawn) 1 else 0,
                    losses = team.losses + if (!won && !drawn) 1 else 0,
                    goalsFor = team.goalsFor + clubGoals,
                    goalsAgainst = team.goalsAgainst + opponentGoals,
                    points = team.points + if (won) 3 else if (drawn) 1 else 0
                )
                fixture.opponent -> team.copy(
                    played = team.played + 1,
                    wins = team.wins + if (opponentGoals > clubGoals) 1 else 0,
                    draws = team.draws + if (drawn) 1 else 0,
                    losses = team.losses + if (clubGoals > opponentGoals) 1 else 0,
                    goalsFor = team.goalsFor + opponentGoals,
                    goalsAgainst = team.goalsAgainst + clubGoals,
                    points = team.points + if (opponentGoals > clubGoals) 3 else if (drawn) 1 else 0
                )
                else -> team
            }
        }
        val result = "${fixture.opponent} $opponentGoals - $clubGoals ${s.clubName}"
        val outcome = when { won -> "Victory"; drawn -> "A draw"; else -> "Defeat" }
        val next = s.copy(
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
            fixtures = s.fixtures.mapIndexed { index, item ->
                if (index == s.fixtureIndex) item.copy(played = true, scoreFor = clubGoals, scoreAgainst = opponentGoals) else item
            },
            league = league,
            lastMatch = result,
            players = s.players.map {
                it.copy(
                    fitness = clamp(it.fitness - Random.nextInt(3, 10), 35),
                    injuryWeeks = if (Random.nextInt(100) < 8) max(1, it.injuryWeeks) else it.injuryWeeks
                )
            }
        )
        commit(addHistory(addLog(next, "$outcome! $result."), "Season ${s.season}: $outcome against ${fixture.opponent}."))
    }

    fun advanceSeason() {
        val s = _uiState.value
        if (s.fixtureIndex < s.fixtures.size) {
            commit(addLog(s, "Finish the current season before starting a new one."))
            return
        }
        val next = s.copy(
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
        commit(addLog(addHistory(next, "A new season begins with fresh ambitions."), "Season ${next.season} begins. The board has added ₦4,000,000 to club funds."))
    }

    companion object {
        private const val SAVE_KEY = "game-state-v1"
        private const val TRAINING_COST = 250_000L
        private const val RECOVERY_COST = 200_000L
        private val TACTICS = setOf("Balanced", "Attacking", "Defensive")
        private val FORMATIONS = setOf("4-3-3", "4-2-3-1", "3-5-2", "5-3-2")
    }
}

fun money(value: Long): String = "₦" + String.format("%,d", value)
