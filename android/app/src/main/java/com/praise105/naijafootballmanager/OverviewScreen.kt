package com.praise105.naijafootballmanager

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.FilterChip
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.praise105.naijafootballmanager.model.GameState
import com.praise105.naijafootballmanager.model.Player

@Composable
fun OverviewScreen(state: GameState, vm: GameViewModel, onPage: (String) -> Unit) {
    PageColumn {
        CardBlock {
            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                Box(
                    Modifier.size(54.dp).background(Color(0xFFB7E879), RoundedCornerShape(16.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text("LC", color = GameTheme.Night, fontWeight = FontWeight.Black, fontSize = 20.sp)
                }
                Column {
                    Text(state.clubName, fontSize = 20.sp, fontWeight = FontWeight.Bold)
                    Text(state.leagueName, color = GameTheme.TextMuted, fontSize = 13.sp)
                }
            }
        }

        SectionTitle("Club overview", "Season ${state.season} • Week ${state.week}")
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                StatCard("Bank", money(state.bank), Modifier.weight(1f))
                StatCard("Transfer budget", money(state.transferBudget), Modifier.weight(1f))
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                StatCard("Points", "${state.points} · ${state.wins}-${state.draws}-${state.losses}", Modifier.weight(1f))
                StatCard("Strength", "${state.teamStrength}", Modifier.weight(1f))
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                StatCard("Morale", "${state.morale}%", Modifier.weight(1f))
                StatCard("Fans", String.format("%,d", state.fans), Modifier.weight(1f))
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                StatCard("Revenue", money(state.revenue), Modifier.weight(1f))
                StatCard("Wage bill", money(state.wageBill), Modifier.weight(1f))
            }
        }

        CardBlock {
            SectionTitle("Next fixture", "${state.fixtureIndex.coerceAtMost(state.fixtures.size)}/${state.fixtures.size} played")
            val fixture = state.fixtures.getOrNull(state.fixtureIndex)
            Text(
                fixture?.let { "${if (it.home) "vs" else "@"} ${it.opponent} · ${it.venueLabel()}" } ?: "Season complete",
                color = GameTheme.Gold,
                fontWeight = FontWeight.Bold
            )
            Text("Current setup: ${state.tactic} • ${state.formation}", color = GameTheme.TextMuted, fontSize = 13.sp)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                GameButton("Play next match", Modifier.weight(1f)) { onPage("Match") }
                GameButton("Quick result", Modifier.weight(1f), secondary = true) { vm.playMatch() }
            }
        }

        CardBlock {
            SectionTitle("Tactics")
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                listOf("Balanced", "Attacking", "Defensive").forEach { tactic ->
                    FilterChip(
                        selected = state.tactic == tactic,
                        onClick = { vm.chooseTactic(tactic) },
                        label = { Text(tactic) }
                    )
                }
            }
        }

        CardBlock {
            SectionTitle("Club actions")
            GameButton("Train squad · ₦250,000", enabled = state.bank >= 250_000) { vm.train() }
            GameButton("Press conference", secondary = true) { vm.pressConference() }
            GameButton("Recover squad · ₦200,000", secondary = true, enabled = state.bank >= 200_000) { vm.recover() }
            GameButton("Advance week", secondary = true) { vm.advanceWeek() }
            GameButton("Scout talent", secondary = true) { vm.scout(); onPage("Transfers") }
        }

        CardBlock {
            SectionTitle("Manager log")
            state.log.take(4).forEach { Text("• $it", color = GameTheme.TextMuted, fontSize = 13.sp) }
            TextButton(onClick = { onPage("Club") }) { Text("Club history and more", color = GameTheme.Mint) }
        }
    }
}

@Composable
fun SquadScreen(state: GameState) {
    PageColumn {
        SectionTitle("First team", "${state.players.size} players • strength ${state.teamStrength}")
        state.players.forEach { PlayerCard(it) }
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
                Text("${player.position} • Age ${player.age} • Morale ${player.morale}", color = GameTheme.TextMuted, fontSize = 12.sp)
            }
            Box(Modifier.background(GameTheme.PanelLight, CircleShape).padding(horizontal = 13.dp, vertical = 8.dp)) {
                Text("${player.rating}", color = GameTheme.Mint, fontWeight = FontWeight.Bold)
            }
        }
        Text("Fitness ${player.fitness}% • ${money(player.weeklyWage)}/week • Contract ${player.contractYears}y", color = GameTheme.TextMuted, fontSize = 12.sp)
        Text(
            if (player.injuryWeeks > 0) "Injured · ${player.injuryWeeks} week(s)" else "Available for selection",
            color = if (player.injuryWeeks > 0) Color(0xFFFF8585) else GameTheme.Mint,
            fontSize = 12.sp
        )
    }
}
