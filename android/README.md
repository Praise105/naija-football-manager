# Naija Football Manager — Android

Native Kotlin/Jetpack Compose implementation of the browser football manager game.

## Open and run

1. Open the `android/` directory in Android Studio (Giraffe or newer).
2. Allow Gradle sync and install Android SDK 35 if prompted.
3. Run the `app` configuration on an emulator or Android device (API 24+).

Or build from the `android/` directory with a Java 17 installation:

```bash
./gradlew assembleDebug
```

The game is fully offline. Career saves are kept on-device using Android `SharedPreferences` and Gson. The original browser version remains unchanged at the repository root.

## Included in this first native port

- Compose dashboard with club finances, form, next fixture, and management actions
- Squad roster and player fitness/morale details
- Tactical styles and selectable formations
- Transfer market filters, scouting, signing, and negotiation
- Quick match simulation with results, league table and fixture progression
- Season advancement, history/log, save and reset

Match simulation is a native turn-based quick-result flow; it does not yet recreate the animated browser match timeline.
