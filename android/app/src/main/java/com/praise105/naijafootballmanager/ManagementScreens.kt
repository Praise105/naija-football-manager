package com.praise105.naijafootballmanager

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.praise105.naijafootballmanager.model.Fixture
import com.praise105.naijafootballmanager.model.GameState
import com.praise105.naijafootballmanager.model.LeagueTeam

@Composable
fun MatchScreen(state: GameState, vm: GameViewModel) {
    PageColumn {
        SectionTitle("Matchday", state.fixtures.getOrNull(state.fixtureIndex)?.opponent ?: "Season complete")
        CardBlock {
            Text(state.lastMatch, color = GameTheme.Gold, fontWeight = FontWeight.Bold)
            Pitch(Modifier.fillMaxWidth().height(220.dp))
            val fixture = state.fixtures.getOrNull(state.fixtureIndex)
            Text(fixture?.let { "Next fixture: ${it.opponent} • Difficulty ${it.difficulty}" } ?: "No fixtures remain", color = GameTheme.TextMuted)
            GameButton("Simulate match", enabled = fixture != null) { vm.playMatch() }
        }
        CardBlock {
            SectionTitle("Match flow")
            Text(if (state.lastMatch == "No match played yet") "Your match events will appear here after the first result." else "FULL TIME • ${state.lastMatch}", color = GameTheme.TextMuted)
        }
        CardBlock {
            SectionTitle("Current setup")
            Text("${state.tactic} • ${state.formation} • Team strength ${state.teamStrength}", color = GameTheme.Mint)
        }
    }
}

@Composable
private fun Pitch(modifier: Modifier = Modifier) {
    Canvas(modifier.background(Color(0xFF147A3D))) {
        val inset = 8.dp.toPx()
        val line = Color.White.copy(alpha = .85f)
        val stroke = 2.dp.toPx()
        drawRect(Color(0xFF178545), size = size)
        drawRect(line, Offset(inset, inset), Size(size.width - 2 * inset, size.height - 2 * inset), style = Stroke(stroke))
        drawLine(line, Offset(size.width / 2, inset), Offset(size.width / 2, size.height - inset), stroke)
        drawCircle(line, size.height * .16f, Offset(size.width / 2, size.height / 2), style = Stroke(stroke))
        drawRect(line, Offset(inset, size.height * .29f), Size(size.width * .13f, size.height * .42f), style = Stroke(stroke))
        drawRect(line, Offset(size.width - inset - size.width * .13f, size.height * .29f), Size(size.width * .13f, size.height * .42f), style = Stroke(stroke))
        for (i in 0..4) {
            drawCircle(GameTheme.Mint, 7.dp.toPx(), Offset(size.width * (.12f + i * .12f), size.height * (.25f + (i % 3) * .22f)))
            drawCircle(Color(0xFFFFD86B), 7.dp.toPx(), Offset(size.width * (.88f - i * .12f), size.height * (.72f - (i % 3) * .22f)))
        }
        drawCircle(Color.White, 4.dp.toPx(), Offset(size.width * .52f, size.height * .48f))
    }
}

@Composable
fun ChoiceScreen(title: String, description: String, choices: List<Pair<String, String>>, selected: String, onChoose: (String) -> Unit) {
    PageColumn {
        SectionTitle(title, description)
        choices.forEach { (name, detail) ->
            CardBlock(border = if (selected == name) GameTheme.Mint else Color.Transparent) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(name, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    Text(if (selected == name) "ACTIVE" else "AVAILABLE", color = if (selected == name) GameTheme.Mint else GameTheme.TextMuted, fontSize = 10.sp)
                }
                Text(detail, color = GameTheme.TextMuted, fontSize = 13.sp)
                GameButton(if (selected == name) "Selected" else "Choose $name", enabled = selected != name) { onChoose(name) }
            }
        }
    }
}

@Composable
fun TransfersScreen(state: GameState, vm: GameViewModel, filter: String, setFilter: (String) -> Unit) {
    val shown = state.market.filter { filter == "All" || it.position == filter }
    PageColumn {
        SectionTitle("Transfer market", "Transfer budget: ${money(state.transferBudget)}")
        Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            listOf("All", "ST", "CM", "CB", "RW", "GK").forEach { position ->
                FilterChip(selected = filter == position, onClick = { setFilter(position) }, label = { Text(position) })
            }
        }
        if (shown.isEmpty()) CardBlock { Text("No players match this position. Scout for more talent.", color = GameTheme.TextMuted) }
        shown.forEach { player ->
            CardBlock {
                Text(player.name, fontWeight = FontWeight.Bold, fontSize = 17.sp)
                Text("${player.position} • Age ${player.age} • Rating ${player.rating}", color = GameTheme.TextMuted, fontSize = 13.sp)
                Text("Estimated fee: ${money(player.rating * 25_000L)} • Wage: ${money(player.weeklyWage)}/week", color = GameTheme.Gold, fontSize = 12.sp)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    GameButton("Sign", Modifier.weight(1f)) { vm.sign(player.id) }
                    GameButton("Negotiate", Modifier.weight(1f), secondary = true) { vm.sign(player.id, negotiate = true) }
                }
            }
        }
        GameButton("Scout another player") { vm.scout() }
    }
}

@Composable
fun LeagueScreen(state: GameState) {
    val ranked = state.league.sortedWith(compareByDescending<LeagueTeam> { it.points }.thenByDescending { it.goalsFor - it.goalsAgainst }.thenByDescending { it.goalsFor })
    PageColumn {
        SectionTitle("League table", state.leagueName)
        CardBlock {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("CLUB", color = GameTheme.Gold, fontWeight = FontWeight.Bold)
                Text("P  W  D  L  PTS", color = GameTheme.Gold, fontWeight = FontWeight.Bold, fontSize = 11.sp)
            }
            ranked.forEachIndexed { index, team ->
                Row(Modifier.fillMaxWidth().padding(vertical = 8.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text("${index + 1}. ${team.name}", color = if (team.name == state.clubName) GameTheme.Mint else GameTheme.TextMain, modifier = Modifier.weight(1f), fontSize = 13.sp)
                    Text("${team.played}  ${team.wins}  ${team.draws}  ${team.losses}  ${team.points}", color = GameTheme.TextMuted, fontSize = 12.sp)
                }
            }
        }
        SectionTitle("Fixtures")
        state.fixtures.forEachIndexed { index, fixture ->
            CardBlock {
                Text("${index + 1}. ${if (fixture.home) "vs" else "@"} ${fixture.opponent}", fontWeight = FontWeight.Bold)
                Text(if (fixture.played) "Full time: ${fixture.scoreFor} - ${fixture.scoreAgainst}" else "${if (fixture.home) "Home" else "Away"} • Difficulty ${fixture.difficulty}${if (index == state.fixtureIndex) " • Next up" else ""}", color = GameTheme.TextMuted, fontSize = 13.sp)
            }
        }
    }
}

@Composable
fun ClubScreen(state: GameState, vm: GameViewModel, onPage: (String) -> Unit) {
    PageColumn {
        SectionTitle("Club management", "Season ${state.season} • ${state.leagueName}")
        CardBlock {
            SectionTitle("Club finances")
            Text("Bank: ${money(state.bank)}", color = GameTheme.TextMuted)
            Text("Operating budget: ${money(state.budget)}", color = GameTheme.TextMuted)
            Text("Weekly wages: ${money(state.wageBill)}", color = GameTheme.TextMuted)
            Text("Reputation: ${state.reputation} • Morale: ${state.morale} • Fans: ${String.format("%,d", state.fans)}", color = GameTheme.TextMuted)
        }
        CardBlock {
            SectionTitle("Season control")
            GameButton("Advance season", enabled = state.fixtureIndex >= state.fixtures.size) { vm.advanceSeason() }
            if (state.fixtureIndex < state.fixtures.size) Text("Complete all fixtures before advancing.", color = GameTheme.Gold, fontSize = 12.sp)
        }
        GameButton("View formations", secondary = true) { onPage("Formation") }
        GameButton("View league and fixtures", secondary = true) { onPage("League") }
        CardBlock { SectionTitle("Club history"); state.history.forEach { Text("• $it", color = GameTheme.TextMuted, fontSize = 13.sp) } }
        CardBlock { SectionTitle("Manager log"); state.log.forEach { Text("• $it", color = GameTheme.TextMuted, fontSize = 13.sp) } }
    }
}
