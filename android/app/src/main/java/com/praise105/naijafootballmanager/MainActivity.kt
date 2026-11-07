package com.praise105.naijafootballmanager

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle

private val navPages = listOf("Overview", "Squad", "Match", "Tactics", "Formation", "Transfers", "League", "Club")

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
    var filter by remember { mutableStateOf("All") }

    NaijaManagerTheme {
        Scaffold(
            containerColor = GameTheme.Night,
            topBar = {
                Column(Modifier.background(GameTheme.Night)) {
                    TopAppBar(
                        title = {
                            Column {
                                Text("NIGERIA PREMIER LEAGUE", color = GameTheme.Gold, fontSize = 10.sp, fontWeight = FontWeight.Bold, letterSpacing = 1.5.sp)
                                Text("Naija Football Manager", color = GameTheme.TextMain, fontWeight = FontWeight.Bold, fontSize = 19.sp)
                            }
                        },
                        actions = {
                            TextButton(onClick = vm::save) { Text("SAVE", color = GameTheme.Mint, fontWeight = FontWeight.Bold) }
                            TextButton(onClick = { vm.reset(); page = "Overview" }) { Text("RESET", color = Color(0xFFFF8585), fontWeight = FontWeight.Bold) }
                        },
                        colors = TopAppBarDefaults.topAppBarColors(containerColor = GameTheme.Night)
                    )
                    Row(
                        Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()).padding(horizontal = 10.dp),
                        horizontalArrangement = Arrangement.spacedBy(7.dp)
                    ) {
                        navPages.forEach { label ->
                            FilterChip(
                                selected = page == label,
                                onClick = { page = label },
                                label = { Text(label, fontSize = 12.sp) },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = GameTheme.PanelLight,
                                    selectedLabelColor = GameTheme.Mint
                                )
                            )
                        }
                    }
                }
            }
        ) { padding ->
            Box(Modifier.fillMaxSize().padding(padding)) {
                when (page) {
                    "Overview" -> OverviewScreen(state, vm, onPage = { page = it })
                    "Squad" -> SquadScreen(state)
                    "Match" -> MatchScreen(state, vm)
                    "Tactics" -> ChoiceScreen(
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
                    "Formation" -> ChoiceScreen(
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
                    "Transfers" -> TransfersScreen(state, vm, filter) { filter = it }
                    "League" -> LeagueScreen(state)
                    else -> ClubScreen(state, vm) { page = it }
                }
            }
        }
    }
}
