package com.praise105.naijafootballmanager

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import com.google.gson.Gson
import com.praise105.naijafootballmanager.model.*
import kotlin.math.max
import kotlin.random.Random

class GameViewModel(application: Application) : AndroidViewModel(application) {
    private val prefs = application.getSharedPreferences("naija-manager", Context.MODE_PRIVATE)
    private val gson = Gson()
    var state = runCatching { prefs.getString(KEY, null)?.let { gson.fromJson(it, GameState::class.java) } ?: GameState() }
        .getOrElse { GameState() }
        private set

    private fun update(next: GameState) { state = next; persist() }
    private fun persist() { prefs.edit().putString(KEY, gson.toJson(state)).apply() }
    private fun log(message: String, s: GameState = state) = s.copy(log = (listOf(message) + s.log).take(9))
    private fun history(message: String, s: GameState = state) = s.copy(history = (listOf(message) + s.history).take(8))
    private fun clamp(n: Int, low: Int = 0, high: Int = 99) = n.coerceIn(low, high)

    fun save() { persist(); update(log("Game saved successfully.")) }
    fun reset() { update(log("A new era begins at Lagos City FC. The club is ready for a fresh challenge.", GameState())) }

    fun train() {
        val s = state
        update(log("Training camp boosts squad fitness and confidence ahead of the next match.", s.copy(
            players = s.players.map { it.copy(fitness = clamp(it.fitness + Random.nextInt(2, 8)), morale = clamp(it.morale + Random.nextInt(2, 7))) },
            morale = clamp(s.morale + 5), reputation = clamp(s.reputation + 1), bank = s.bank - 250_000, budget = s.budget - 250_000
        )))
    }

    fun recover() {
        val s = state
        if (s.bank < 200_000) { update(log("There is not enough money for a recovery programme this week.")); return }
        update(log("The medical team restores the squad ahead of the fixture list.", s.copy(
            bank = s.bank - 200_000, budget = s.budget - 200_000,
            players = s.players.map { it.copy(fitness = clamp(it.fitness + 6), injuryWeeks = max(0, it.injuryWeeks - 1)) }
        )))
    }

    fun pressConference() {
        val s = state
        update(history("The club receives positive headlines after a strong press conference.", log("The press conference goes well. The media praises your leadership.", s.copy(
            morale = clamp(s.morale + if (s.wins >= s.losses) 6 else 2), reputation = clamp(s.reputation + 2)
        ))))
    }

    fun advanceWeek() {
        val s = state
        update(log("The squad completes another week of preparation.", s.copy(week = s.week + 1, players = s.players.map {
            it.copy(fitness = clamp(it.fitness + Random.nextInt(-2, 5), 35), morale = clamp(it.morale + Random.nextInt(-1, 3)), injuryWeeks = max(0, it.injuryWeeks - 1))
        })))
    }

    fun chooseTactic(tactic: String) {
        val s = state
        val players = if (tactic == "Attacking") s.players.map { it.copy(fitness = clamp(it.fitness - 1), morale = clamp(it.morale + 1)) } else s.players
        update(log("You switch to a $tactic setup. The squad adapts to the new plan.", s.copy(tactic = tactic, players = players)))
    }

    fun chooseFormation(formation: String) {
        update(log("The squad is set up in a $formation shape for the next phase of the season.", state.copy(formation = formation)))
    }

    fun scout() {
        val positions = listOf("ST", "CM", "CB", "RW", "GK")
        val id = System.currentTimeMillis()
        val talent = Player(id, "Young Star ${Random.nextInt(100, 1000)}", positions.random(), Random.nextInt(18, 23), Random.nextInt(72, 81), Random.nextInt(70, 91), weeklyWage = Random.nextLong(90_000, 190_001))
        update(log("Scouting reports identify ${talent.name}, a ${talent.position} with ${talent.rating} potential.", state.copy(market = state.market + talent)))
    }

    fun sign(playerId: Long, negotiate: Boolean = false) {
        val s = state
        val target = s.market.firstOrNull { it.id == playerId } ?: return
        val fee = if (negotiate) (target.rating * 25_000L * 0.85).toLong() else target.rating * 25_000L
        val total = fee + target.weeklyWage * 12 * target.contractYears
        if (s.bank < total) { update(log("The club cannot afford ${target.name} right now. Budget is too tight.")); return }
        val signed = target.copy(id = System.currentTimeMillis(), fitness = Random.nextInt(70, 91), morale = 75)
        update(log("${target.name} joins the club for ${money(total)} total package value.", s.copy(
            bank = s.bank - total, budget = s.budget - total, players = s.players + signed,
            market = s.market.filterNot { it.id == playerId }
        )))
    }

    fun playMatch() {
        val s = state
        val fixture = s.fixtures.getOrNull(s.fixtureIndex)
        if (fixture == null) { update(log("No fixtures remain this season.")); return }
        val strength = s.teamStrength + if (fixture.home) 2 else 0 + when (s.tactic) { "Attacking" -> 2; "Defensive" -> -1; else -> 0 }
        val homeScore = (0..4).count { Random.nextInt(100) < (38 + (strength - fixture.difficulty) * 2).coerceIn(12, 72) }
        val awayScore = (0..3).count { Random.nextInt(100) < (30 + (fixture.difficulty - s.teamStrength) * 2).coerceIn(10, 65) }
        finishMatch(fixture, homeScore, awayScore)
    }

    private fun finishMatch(fixture: Fixture, forGoals: Int, againstGoals: Int) {
        val s = state
        val won = forGoals > againstGoals
        val drawn = forGoals == againstGoals
        val reward = if (won) Random.nextLong(400_000, 1_000_001) else if (drawn) 180_000L else 0L
        val opponent = fixture.opponent
        val updatedLeague = s.league.map { team ->
            if (team.name == s.clubName) team.copy(played = team.played + 1, wins = team.wins + if (won) 1 else 0,
                draws = team.draws + if (drawn) 1 else 0, losses = team.losses + if (!won && !drawn) 1 else 0,
                goalsFor = team.goalsFor + forGoals, goalsAgainst = team.goalsAgainst + againstGoals,
                points = team.points + if (won) 3 else if (drawn) 1 else 0)
            else if (team.name == opponent) team.copy(played = team.played + 1, wins = team.wins + if (againstGoals > forGoals) 1 else 0,
                draws = team.draws + if (drawn) 1 else 0, losses = team.losses + if (forGoals > againstGoals) 1 else 0,
                goalsFor = team.goalsFor + againstGoals, goalsAgainst = team.goalsAgainst + forGoals,
                points = team.points + if (againstGoals > forGoals) 3 else if (drawn) 1 else 0)
            else team
        }
        val record = when { won -> "Victory"; drawn -> "A draw"; else -> "Defeat" }
        val result = "${fixture.opponent} $againstGoals - $forGoals ${s.clubName}"
        var next = s.copy(
            bank = s.bank + reward, budget = s.budget + reward, revenue = s.revenue + if (won) 300_000 else 100_000,
            points = s.points + if (won) 3 else if (drawn) 1 else 0,
            wins = s.wins + if (won) 1 else 0, draws = s.draws + if (drawn) 1 else 0, losses = s.losses + if (!won && !drawn) 1 else 0,
            morale = clamp(s.morale + if (won) 5 else if (drawn) 2 else -6, 50),
            reputation = clamp(s.reputation + if (won) 1 else if (drawn) 0 else -1),
            fans = max(20_000, s.fans + if (won) 1_200 else 300),
            fixtureIndex = s.fixtureIndex + 1,
            fixtures = s.fixtures.mapIndexed { i, f -> if (i == s.fixtureIndex) f.copy(played = true, scoreFor = forGoals, scoreAgainst = againstGoals) else f },
            league = updatedLeague, lastMatch = result,
            players = s.players.map { it.copy(fitness = clamp(it.fitness - Random.nextInt(3, 10), 35), injuryWeeks = if (Random.nextInt(100) < 8) 1 else it.injuryWeeks) }
        )
        next = history("Season ${s.season}: $record against $opponent.", log("$record! $result.", next))
        update(next)
    }

    fun advanceSeason() {
        val s = state
        if (s.fixtureIndex < s.fixtures.size) { update(log("Finish the current season before starting a new one.")); return }
        update(log("Season ${s.season + 1} begins. The board has added ₦4,000,000 to club funds.", history("A new season begins with fresh ambitions.", s.copy(
            season = s.season + 1, fixtureIndex = 0, week = 1, points = 0, wins = 0, draws = 0, losses = 0,
            bank = s.bank + 4_000_000, budget = s.budget + 4_000_000, fixtures = initialFixtures(), league = initialLeague()
        ))))
    }

    companion object { private const val KEY = "game-state-v1" }
}

fun money(value: Long): String = "₦" + String.format("%,d", value)
