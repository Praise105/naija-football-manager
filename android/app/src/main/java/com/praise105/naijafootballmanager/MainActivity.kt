package com.praise105.naijafootballmanager

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.praise105.naijafootballmanager.model.*

private val Night = Color(0xFF071D14)
private val Panel = Color(0xFF12372D)
private val PanelLight = Color(0xFF1B4D3B)
private val Mint = Color(0xFF4DDC89)
private val Gold = Color(0xFFF0D26D)
private val TextMain = Color(0xFFEDF5EF)
private val TextMuted = Color(0xFFB8D0C2)

class MainActivity : ComponentActivity() {
    private val gameViewModel: GameViewModel by viewModels()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = android.graphics.Color.rgb(7, 29, 20)
        window.navigationBarColor = android.graphics.Color.rgb(7, 29, 20)
        setContent { NaijaManagerApp(gameViewModel) }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NaijaManagerApp(vm: GameViewModel) {
    val state by vm.uiState.collectAsStateWithLifecycle()
    var page by remember { mutableStateOf("Overview") }
    var tacticMenu by remember { mutableStateOf(false) }
    var filter by remember { mutableStateOf("All") }

    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = Mint,
            background = Night,
            surface = Panel,
            onBackground = TextMain,
            onSurface = TextMain
        )
    ) {
        Scaffold(
            containerColor = Night,
            topBar = {
                Column(Modifier.background(Night)) {
                    TopAppBar(
                        title = {
                            Column {
                                Text(
                                    "NIGERIA PREMIER LEAGUE",
                                    color = Gold,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    letterSpacing = 1.5.sp
                                )
                                Text(
                                    "Naija Football Manager",
                                    color = TextMain,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 19.sp
                                )
                            }
                        },
                        actions = {
                            TextButton(onClick = vm::save) {
                                Text("SAVE", color = Mint, fontWeight = FontWeight.Bold)
                            }
                            TextButton(onClick = { vm.reset(); page = "Overview" }) {
                                Text("RESET", color = Color(0xFFFF8585), fontWeight = FontWeight.Bold)
                            }
                        },
                        colors = TopAppBarDefaults.topAppBarColors(containerColor = Night)
                    )

                    Row(
                        Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()).padding(horizontal = 10.dp),
                        horizontalArrangement = Arrangement.spacedBy(7.dp)
                    ) {
                        listOf("Overview", "Squad", "Match", "Tactics", "Formation", "Transfers", "League", "Club").forEach { label ->
                            FilterChip(
                                selected = page == label,
                                onClick = { page = label },
                                label = { Text(label, fontSize = 12.sp) },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = PanelLight,
                                    selectedLabelColor = Mint
                                )
                            )
                        }
                    }
                }
            }
        ) { padding ->
            Box(Modifier.fillMaxSize().padding(padding)) {
                when (page) {
                    "Overview" -> OverviewPage(state, vm, onPage = { page = it }, tacticMenu = tacticMenu, setTacticMenu = { tacticMenu = it })
                    "Squad" -> SquadPage(state)
                    "Match" -> MatchPage(state, vm)
                    "Tactics" -> ChoicePage(
                        title = "Match tactics",
                        description = "Choose your coaching identity.",
                        choices = listOf(
                            "Balanced" to "Controlled possession with measured transitions.",
                            "Attacking" to "High press, quick breaks and aggressive forward runs.",
                            "Defensive" to "Compact shape, disciplined defending and counters."
                        ),
                        selected = state.tactic,
                        onChoose = vm::chooseTactic
                    )
                    "Formation" -> ChoicePage(
                        title = "Formations",
                        description = "Choose a shape that suits your squad.",
                        choices = listOf(
                            "4-3-3" to "Width, central control and forward pressing.",
                            "4-2-3-1" to "A flexible system with midfield protection and creativity.",
                            "3-5-2" to "Wing-back width and a dominant midfield.",
                            "5-3-2" to "A secure shape for difficult fixtures and counter-attacks."
                        ),
                        selected = state.formation,
                        onChoose = vm::chooseFormation
                    )
                    "Transfers" -> TransfersPage(state, vm, filter, { filter = it })
                    "League" -> LeaguePage(state)
                    else -> ClubPage(state, vm, onPage = { page = it })
                }
            }
        }
    }
}

@Composable
private fun PageColumn(content: @Composable ColumnScope.() -> Unit) {
    Column(
        Modifier.fillMaxSize().padding(horizontal = 14.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Column(
            Modifier.weight(1f).fillMaxWidth().verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            content = content
        )
        Spacer(Modifier.height(2.dp))
    }
}

@Composable
private fun OverviewPage(
    s: GameState,
    vm: GameViewModel,
    onPage: (String) -> Unit,
    tacticMenu: Boolean,
    setTacticMenu: (Boolean) -> Unit
) {
    PageColumn {
        CardBlock {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Box(
                    Modifier.size(54.dp).background(Color(0xFFB7E879), RoundedCornerShape(16.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text("LC", color = Night, fontWeight = FontWeight.Black, fontSize = 20.sp)
                }
                Column {
                    Text(s.clubName, fontSize = 20.sp, fontWeight = FontWeight.Bold)
                    Text(s.leagueName, color = TextMuted, fontSize = 13.sp)
                }
            }
        }

        SectionTitle("Club overview", "Season ${s.season} • Week ${s.week}")

        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                StatCard("Bank", money(s.bank), Modifier.weight(1f))
                StatCard("Transfer budget", money(s.transferBudget), Modifier.weight(1f))
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                StatCard("Points", "${s.points}  ·  ${s.wins}-${s.draws}-${s.losses}", Modifier.weight(1f))
                StatCard("Strength", "${s.teamStrength}", Modifier.weight(1f))
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                StatCard("Morale", "${s.morale}%", Modifier.weight(1f))
                StatCard("Fans", "${String.format("%,d", s.fans)}", Modifier.weight(1f))
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                StatCard("Revenue", money(s.revenue), Modifier.weight(1f))
                StatCard("Wage bill", money(s.wageBill), Modifier.weight(1f))
            }
        }

        CardBlock {
            SectionTitle("Next fixture", "${s.fixtureIndex.coerceAtMost(s.fixtures.size)}/${s.fixtures.size} played")
            val fixture = s.fixtures.getOrNull(s.fixtureIndex)
            Text(
                fixture?.let { "${if (it.home) "vs" else "@"} ${it.opponent}  ·  ${it.venueLabel()}" } ?: "Season complete",
                color = Gold,
                fontWeight = FontWeight.Bold
            )
            Text("Current setup: ${s.tactic} • ${s.formation}", color = TextMuted, fontSize = 13.sp)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                GameButton("Play next match", Modifier.weight(1f)) { onPage("Match") }
                GameButton("Quick result", Modifier.weight(1f), secondary = true) { vm.playMatch() }
            }
        }

        CardBlock {
            SectionTitle("Club actions")
            ExposedDropdownMenuBox(expanded = tacticMenu, onExpandedChange = setTacticMenu) {
                OutlinedButton(onClick = { setTacticMenu(true) }, modifier = Modifier.fillMaxWidth()) {
                    Text("Tactic: ${s.tactic}")
                }
                ExposedDropdownMenu(expanded = tacticMenu, onDismissRequest = { setTacticMenu(false) }) {
                    listOf("Balanced", "Attacking", "Defensive").forEach { item ->
                        DropdownMenuItem(
                            text = { Text(item) },
                            onClick = { vm.chooseTactic(item); setTacticMenu(false) }
                        )
                    }
                }
            }
            GameButton("Train squad  ·  ₦250,000") { vm.train() }
            GameButton("Press conference", secondary = true) { vm.pressConference() }
            GameButton("Recover squad  ·  ₦200,000", secondary = true) { vm.recover() }
            GameButton("Advance week", secondary = true) { vm.advanceWeek() }
            GameButton("Scout talent", secondary = true) { vm.scout(); onPage("Transfers") }
        }

        CardBlock {
            SectionTitle("Manager log")
            s.log.take(4).forEach { message ->
                Text("•  $message", color = TextMuted, fontSize = 13.sp)
                Divider(color = Color.White.copy(alpha = .07f))
            }
            TextButton(onClick = { onPage("Club") }) { Text("Club history and more", color = Mint) }
        }
    }
}

@Composable
private fun SquadPage(s: GameState) {
    PageColumn {
        SectionTitle("First team", "${s.players.size} players • strength ${s.teamStrength}")
        s.players.forEach { player -> PlayerCard(player) }
    }
}

@Composable
private fun PlayerCard(player: Player) {
    CardBlock {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(Modifier.weight(1f)) {
                Text(player.name, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Text("${player.position} • Age ${player.age} • Morale ${player.morale}", color = TextMuted, fontSize = 12.sp)
            }
            Box(
                Modifier.background(PanelLight, CircleShape).padding(horizontal = 13.dp, vertical = 8.dp)
            ) {
                Text("${player.rating}", color = Mint, fontWeight = FontWeight.Bold)
            }
        }
        Text(
            "Fitness ${player.fitness}%  •  ${money(player.weeklyWage)}/week  •  Contract ${player.contractYears}y",
            color = TextMuted,
            fontSize = 12.sp
        )
        Text(
            if (player.injuryWeeks > 0) "Injured · ${player.injuryWeeks} week(s)" else "Available for selection",
            color = if (player.injuryWeeks > 0) Color(0xFFFF8585) else Mint,
            fontSize = 12.sp
        )
    }
}

@Composable
private fun MatchPage(s: GameState, vm: GameViewModel) {
    PageColumn {
        SectionTitle("Matchday", s.fixtures.getOrNull(s.fixtureIndex)?.opponent ?: "Season complete")
        CardBlock {
            Text(s.lastMatch, color = Gold, fontWeight = FontWeight.Bold)
            Pitch(Modifier.fillMaxWidth().height(220.dp).padding(top = 12.dp))
            Text(
                "Next fixture: ${s.fixtures.getOrNull(s.fixtureIndex)?.let { "${it.opponent} · ${it.difficulty} rating" } ?: "No fixtures remain"}",
                color = TextMuted,
                fontSize = 13.sp
            )
            GameButton("Simulate match", enabled = s.fixtureIndex < s.fixtures.size) { vm.playMatch() }
            GameButton("Quick result", secondary = true, enabled = s.fixtureIndex < s.fixtures.size) { vm.playMatch() }
        }
        CardBlock {
            SectionTitle("Match flow")
            Text(
                if (s.lastMatch == "No match played yet") "Your match events will appear here after the first result." else "FULL TIME  •  ${s.lastMatch}",
                color = TextMuted
            )
        }
        CardBlock {
            SectionTitle("Current form")
            Text("${s.tactic} • ${s.formation}", color = Mint, fontWeight = FontWeight.Bold)
            Text("Team strength ${s.teamStrength} against the opponent's rating.", color = TextMuted)
        }
    }
}

@Composable
private fun Pitch(modifier: Modifier = Modifier) {
    Canvas(modifier.background(Color(0xFF147A3D), RoundedCornerShape(14.dp)).padding(8.dp)) {
        val inset = 8.dp.toPx()
        val stroke = 2.dp.toPx()
        drawRect(Color(0xFF178545), topLeft = Offset.Zero, size = Size(size.width, size.height))
        drawRect(
            Color.White.copy(alpha = .8f),
            topLeft = Offset(inset, inset),
            size = Size(size.width - 2 * inset, size.height - 2 * inset),
            style = androidx.compose.ui.graphics.drawscope.Stroke(stroke)
        )
        drawLine(Color.White.copy(alpha = .8f), Offset(size.width / 2, inset), Offset(size.width / 2, size.height - inset), stroke)
        drawCircle(Color.White.copy(alpha = .8f), radius = size.height * .16f, center = Offset(size.width / 2, size.height / 2), style = androidx.compose.ui.graphics.drawscope.Stroke(stroke))
        drawRect(Color.White.copy(alpha = .8f), Offset(inset, size.height * .29f), Size(size.width * .13f, size.height * .42f), style = androidx.compose.ui.graphics.drawscope.Stroke(stroke))
        drawRect(Color.White.copy(alpha = .8f), Offset(size.width - inset - size.width * .13f, size.height * .29f), Size(size.width * .13f, size.height * .42f), style = androidx.compose.ui.graphics.drawscope.Stroke(stroke))
        for (i in 0..4) {
            drawCircle(Mint, 7.dp.toPx(), Offset(size.width * (.12f + i * .12f), size.height * (.25f + (i % 3) * .22f)))
            drawCircle(Color(0xFFFFD86B), 7.dp.toPx(), Offset(size.width * (.88f - i * .12f), size.height * (.72f - (i % 3) * .22f)))
        }
        drawCircle(Color.White, 4.dp.toPx(), Offset(size.width * .52f, size.height * .48f))
    }
}

@Composable
private fun ChoicePage(
    title: String,
    description: String,
    choices: List<Pair<String, String>>,
    selected: String,
    onChoose: (String) -> Unit
) {
    PageColumn {
        SectionTitle(title, description)
        choices.forEach { (name, detail) ->
            CardBlock(border = if (selected == name) Mint else Color.Transparent) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(name, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    Text(
                        if (selected == name) "ACTIVE" else "AVAILABLE",
                        color = if (selected == name) Mint else TextMuted,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                Text(detail, color = TextMuted, fontSize = 13.sp)
                GameButton(if (selected == name) "Selected" else "Choose $title", enabled = selected != name) { onChoose(name) }
            }
        }
    }
}

@Composable
private fun TransfersPage(s: GameState, vm: GameViewModel, filter: String, setFilter: (String) -> Unit) {
    val shown = s.market.filter { filter == "All" || it.position == filter }
    PageColumn {
        SectionTitle("Transfer market", "Transfer budget: ${money(s.transferBudget)}")
        Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            listOf("All", "ST", "CM", "CB", "RW", "GK").forEach { item ->
                FilterChip(selected = filter == item, onClick = { setFilter(item) }, label = { Text(item) })
            }
        }
        if (shown.isEmpty()) {
            CardBlock { Text("No targets available for this position. Scout for more talent.", color = TextMuted) }
        }
        shown.forEach { player ->
            CardBlock {
                Text(player.name, fontWeight = FontWeight.Bold, fontSize = 17.sp)
                Text("${player.position} • Age ${player.age} • Rating ${player.rating}", color = TextMuted, fontSize = 13.sp)
                Text("Estimated fee: ${money(player.rating * 25_000L)}  •  Wage: ${money(player.weeklyWage)}/week", color = Gold, fontSize = 12.sp)
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
private fun LeaguePage(s: GameState) {
    val ranked = s.league.sortedWith(
        compareByDescending<LeagueTeam> { it.points }
            .thenByDescending { it.goalsFor - it.goalsAgainst }
            .thenByDescending { it.goalsFor }
    )

    PageColumn {
        SectionTitle("League table", s.leagueName)
        CardBlock {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("CLUB", color = Gold, fontWeight = FontWeight.Bold)
                Text("P   W   D   L   PTS", color = Gold, fontWeight = FontWeight.Bold, fontSize = 11.sp)
            }
            ranked.forEachIndexed { index, team ->
                Divider(color = Color.White.copy(alpha = .08f))
                Row(
                    Modifier.fillMaxWidth().padding(vertical = 9.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        "${index + 1}. ${team.name}",
                        color = if (team.name == s.clubName) Mint else TextMain,
                        fontWeight = if (team.name == s.clubName) FontWeight.Bold else FontWeight.Normal,
                        modifier = Modifier.weight(1f),
                        fontSize = 13.sp
                    )
                    Text("${team.played}   ${team.wins}   ${team.draws}   ${team.losses}   ${team.points}", color = TextMuted, fontSize = 12.sp)
                }
            }
        }

        SectionTitle("Fixtures")
        s.fixtures.forEachIndexed { index, fixture ->
            CardBlock {
                Text("${index + 1}. ${if (fixture.home) "vs" else "@"} ${fixture.opponent}", fontWeight = FontWeight.Bold)
                Text(
                    if (fixture.played) "Full time: ${fixture.scoreFor} - ${fixture.scoreAgainst}" else "${fixture.venueLabel()} • Difficulty ${fixture.difficulty}${if (index == s.fixtureIndex) " • Next up" else ""}",
                    color = TextMuted,
                    fontSize = 13.sp
                )
            }
        }
    }
}

@Composable
private fun ClubPage(s: GameState, vm: GameViewModel, onPage: (String) -> Unit) {
    PageColumn {
        SectionTitle("Club management", "Season ${s.season} • ${s.leagueName}")
        CardBlock {
            Text("Club finances", fontWeight = FontWeight.Bold)
            Text("Bank: ${money(s.bank)}", color = TextMuted)
            Text("Operating budget: ${money(s.budget)}", color = TextMuted)
            Text("Weekly wages: ${money(s.wageBill)}", color = TextMuted)
            Text("Reputation: ${s.reputation}  •  Morale: ${s.morale}  •  Fans: ${String.format("%,d", s.fans)}", color = TextMuted)
        }
        CardBlock {
            SectionTitle("Season control")
            GameButton("Advance season", enabled = s.fixtureIndex >= s.fixtures.size) { vm.advanceSeason() }
            if (s.fixtureIndex < s.fixtures.size) {
                Text("Complete all ${s.fixtures.size} fixtures before advancing.", color = Gold, fontSize = 12.sp)
            }
        }
        GameButton("View formations", secondary = true) { onPage("Formation") }
        GameButton("View league and fixtures", secondary = true) { onPage("League") }
        CardBlock { SectionTitle("Club history"); s.history.forEach { Text("•  $it", color = TextMuted, fontSize = 13.sp) } }
        CardBlock { SectionTitle("Manager log"); s.log.forEach { Text("•  $it", color = TextMuted, fontSize = 13.sp) } }
    }
}

@Composable
private fun CardBlock(border: Color = Color.Transparent, content: @Composable ColumnScope.() -> Unit) {
    Card(
        colors = CardDefaults.cardColors(containerColor = Panel),
        shape = RoundedCornerShape(16.dp),
        modifier = Modifier
            .fillMaxWidth()
            .then(if (border != Color.Transparent) Modifier.border(1.dp, border, RoundedCornerShape(16.dp)) else Modifier)
    ) {
        Column(Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(10.dp), content = content)
    }
}

@Composable
private fun SectionTitle(title: String, subtitle: String? = null) {
    Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
        Text(title, color = TextMain, fontWeight = FontWeight.Bold, fontSize = 18.sp)
        if (subtitle != null) Text(subtitle, color = TextMuted, fontSize = 12.sp)
    }
}

@Composable
private fun StatCard(label: String, value: String, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = Color(0xFF0D2A20)),
        shape = RoundedCornerShape(13.dp)
    ) {
        Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(5.dp)) {
            Text(label, color = TextMuted, fontSize = 11.sp)
            Text(value, color = TextMain, fontSize = 15.sp, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
private fun GameButton(
    text: String,
    modifier: Modifier = Modifier,
    secondary: Boolean = false,
    enabled: Boolean = true,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        enabled = enabled,
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(11.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = if (secondary) Color(0xFF234A3B) else Color(0xFF23975E),
            contentColor = TextMain,
            disabledContainerColor = Color(0xFF244035),
            disabledContentColor = TextMuted
        )
    ) {
        Text(text, fontWeight = FontWeight.Bold, fontSize = 13.sp)
    }
}

private fun Fixture.venueLabel() = if (home) "Home" else "Away"
