# League Schedule Manager
Generates league schedules and tables for football (soccer) tournaments.

Demo: http://michi83.github.io/League-Schedule-Manager/

## Generate league schedules
League Schedules for round-robin tournaments with any number of teams and rounds can be generated. There may be an odd number of teams. In this case, one team has a bye on each matchday. Teams will play at home and on the road alternately most of the time but not always.

## Calculate league tables
League tables can be sorted by the following criteria:
* points
* goal difference
* goals
* away goals
* goal average
* matches won
* head-to-head comparison

The user can choose which criteria are applied and the sequence in which they are applied.

League tables will show the following statistics:
* matches played
* matches won
* matches drawn
* matches lost
* goals for - goals against
* goal difference
* points
* change in position since last matchday

## Head-to-head comparisons
In head-to-head comparisons a subtable is used, considering only matches between two of the tied teams. The subtable may be sorted by different criteria as the main table. If this does not completely resolve ties, then additional subtables are used for the remaining ties. This is repeated until either all ties are resolved or cannot be resolved any further.

## Technology
League Schedule Manager is written entirely in client-side JavaScript. You can host it on your web server or just double-click index.html.

### Browser compatibility
Should run fine in the newest versions of Chrome and Firefox. Please keep in mind that this is a hobby project. I will not waste any of my precious spare time on ugly browser hacks.

# Spielplan-Manager
Erstellt Spielpläne und Tabellen für Fußballturniere.

Demo: http://michi83.github.io/League-Schedule-Manager/

## Spielplan generieren
Es können Spielpläne für Jeder-gegen-jeden-Turniere mit beliebig vielen Mannschaften und Runden generiert werden. Die Anzahl der Mannschaften kann ungerade sein, in diesem Fall hat an jedem Spieltag eine Mannschaft spielfrei. Meistens, aber nicht immer, werden Mannschaften abwechselnd zu Hause und auswärts spielen.

## Tabellen berechnen
Tabellen können nach folgenden Kriterien sortiert werden:
* Punkte
* Tordifferenz
* Tore
* Auswärtstore
* Torquotient
* Siege
* direkter Vergleich

Der Benutzer kann wählen, welche Kriterien angewendet werden und in welcher Reihenfolge sie angewendet werden.

In den Tabellen werden folgende Statistiken angezeigt:
* Spiele
* Siege
* Unentschieden
* Niederlagen
* Tore - Gegentore
* Tordifferenz
* Punkte
* Platzveränderung seit dem letzten Spieltag

### direkter Vergleich
Beim direkten Vergleich wird eine Nebentabelle aufgestellt, in der nur Spiele zählen, in denen zwei der gleichrangigen Mannschaften gegeneinander gespielt haben. Die Nebentabelle kann nach anderen Kriterien sortiert werden als die Haupttabelle. Wenn sich die Gleichstände so nicht vollständig auflösen lassen, dann werden für die verbliebenen Gleichstände weitere Nebentabellen aufgestellt. Das wird so oft wiederholt, bis entweder alle Gleichstände aufgelöst sind oder sich nicht weiter auflösen lassen.

## Technologie
League Schedule Manager wurde vollständig in clientseitigem JavaScript geschrieben. Man kann es auf einem Webserver hosten oder einfach durch Doppelklick auf index.html starten.

### Browser compatibility
Sollte in den neuesten Versionen von Chrome und Firefox funktionieren. Bitte beachte, dass das ein Hobby-Projekt ist und ich keine wertvolle Freizeit für hässliche Browser-Hacks verschwenden werde.
