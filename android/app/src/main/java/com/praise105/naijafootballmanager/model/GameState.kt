package com.praise105.naijafootballmanager.model

data class Player(
    val id: Long,
    val name: String,
    val position: String,
    val age: Int,
    val rating: Int,
    val fitness: Int = 80,
    val morale: Int = 75,
    val weeklyWage: Long = 150_000,
    val contractYears: Int = 2,
    val injuryWeeks: Int = 0
)

data class Fixture(
    val opponent: String,
    val home: Boolean,
    val difficulty: Int,
    val played: Boolean = false,
    val scoreFor: Int? = null,
    val scoreAgainst: Int? = null
)

data class LeagueTeam(
    val name: String,
    val played: Int = 0,
    val wins: Int = 0,
    val draws: Int = 0,
    val losses: Int = 0,
    val goalsFor: Int = 0,
    val goalsAgainst: Int = 0,
    val points: Int = 0
)

data class GameState(
    val clubName: String = "Lagos City FC",
    val leagueName: String = "Nigeria Premier League",
    val bank: Long = 18_000_000,
    val budget: Long = 18_000_000,
    val revenue: Long = 1_500_000,
    val transferBudget: Long = 4_000_000,
    val reputation: Int = 62,
    val morale: Int = 74,
    val fans: Int = 42_000,
    val points: Int = 0,
    val wins: Int = 0,
    val draws: Int = 0,
    val losses: Int = 0,
    val week: Int = 1,
    val season: Int = 1,
    val tactic: String = "Balanced",
    val formation: String = "4-3-3",
    val fixtureIndex: Int = 0,
    val players: List<Player> = initialPlayers(),
    val fixtures: List<Fixture> = initialFixtures(),
    val market: List<Player> = initialMarket(),
    val league: List<LeagueTeam> = initialLeague(),
    val history: List<String> = listOf(
        "The season opens with a new manager and bright ambitions for Lagos City FC.",
        "The board expects progress. The road to glory begins with steady results."
    ),
    val log: List<String> = listOf(
        "You have been appointed manager of Lagos City FC. Build a title-winning side.",
        "Your first task is to steady the squad and get points on the board."
    ),
    val lastMatch: String = "No match played yet"
) {
    val wageBill: Long get() = players.sumOf { it.weeklyWage }
    val teamStrength: Int get() = if (players.isEmpty()) 0 else players.sumOf { it.rating + (it.fitness - 80) / 4 } / players.size
}

fun initialPlayers() = listOf(
    Player(1, "Ayo Balogun", "GK", 25, 78, 82, 80, 220_000),
    Player(2, "Tunde Adebayo", "RB", 24, 75, 77, 78, 200_000),
    Player(3, "Eze Nwosu", "CB", 27, 81, 79, 80, 280_000, 3),
    Player(4, "Musa Ibrahim", "CB", 23, 76, 81, 76, 170_000),
    Player(5, "Kelechi Okafor", "LB", 22, 74, 75, 74, 160_000),
    Player(6, "Seyi Lawal", "CM", 26, 82, 84, 83, 320_000, 3),
    Player(7, "Babatunde Ali", "CM", 25, 79, 80, 81, 210_000, 3),
    Player(8, "Emmanuel Oke", "RW", 24, 80, 81, 82, 260_000),
    Player(9, "Nnamdi Akin", "ST", 28, 84, 76, 79, 430_000),
    Player(10, "Chibuzor Eze", "LW", 25, 81, 78, 80, 310_000, 3),
    Player(11, "Ifeanyi Udo", "AM", 27, 83, 83, 84, 360_000, 3)
)

fun initialFixtures() = listOf(
    Fixture("Kano Pillars", true, 77), Fixture("Enugu Rangers", false, 81),
    Fixture("Akwa United", true, 74), Fixture("Plateau United", false, 79),
    Fixture("Abia Warriors", true, 72), Fixture("Remo Stars", false, 83)
)

fun initialMarket() = listOf(
    Player(101, "Daniel Okon", "ST", 25, 76, weeklyWage = 190_000, contractYears = 2).copy(),
    Player(102, "Yemi Folarin", "CM", 23, 75, weeklyWage = 180_000),
    Player(103, "Femi Owolabi", "CB", 22, 74, weeklyWage = 150_000, contractYears = 3),
    Player(104, "Stanley Bassey", "RW", 24, 77, weeklyWage = 205_000),
    Player(105, "Umar Musa", "GK", 21, 73, weeklyWage = 120_000)
)

fun initialLeague() = listOf(
    "Lagos City FC", "Kano Pillars", "Enugu Rangers", "Akwa United",
    "Plateau United", "Abia Warriors", "Remo Stars", "Rivers United"
).map { LeagueTeam(it) }
