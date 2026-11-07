package com.praise105.naijafootballmanager

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

object GameTheme {
    val Night = Color(0xFF071D14)
    val Panel = Color(0xFF12372D)
    val PanelLight = Color(0xFF1B4D3B)
    val Mint = Color(0xFF4DDC89)
    val Gold = Color(0xFFF0D26D)
    val TextMain = Color(0xFFEDF5EF)
    val TextMuted = Color(0xFFB8D0C2)
}

@Composable
fun NaijaManagerTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = GameTheme.Mint,
            background = GameTheme.Night,
            surface = GameTheme.Panel,
            onBackground = GameTheme.TextMain,
            onSurface = GameTheme.TextMain
        ),
        content = content
    )
}
