# Spielplan-Manager
Erstellt Spielpläne und Tabellen für Deine Fußball-Liga.

Demo: http://michi83.github.io/Spielplan-Manager/

## Spielplan generieren
Es können Jeder-gegen-jeden-Turniere mit beliebig vielen Runden generiert werden. Die Anzahl der Mannschaften kann ungerade sein, in diesem Fall hat an jedem Spieltag eine Mannschaft spielfrei. Meistens, aber nicht immer, werden Mannschaften abwechselnd zu Hause und auswärts spielen.

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

Unabhängig von den gewählten Kriterien werden in den Tabellen folgende Statistiken angezeigt:
* Spiele
* Siege
* Unentschieden
* Niederlagen
* Tore : Gegentore
* Tordifferenz
* Punkte
* Platzveränderung seit dem letzten Spieltag

### direkter Vergleich
Beim direkten Vergleich wird eine Nebentabelle aufgestellt, in der nur Spiele zählen, in denen zwei der gleichrangigen Mannschaften gegeneinander gespielt haben. Die Nebentabelle kann nach anderen Kriterien sortiert werden als die Haupttabelle. Wenn sich die Gleichstände so nicht vollständig auflösen lassen, dann werden für die verbliebenen Gleichstände weitere Nebentabellen aufgestellt. Das wird so oft wiederholt, bis entweder alle Gleichstände aufgelöst sind oder sich nicht weiter auflösen lassen.

## Terminänderungen
Einzelne Spiele und ganze Spieltage können mit den Pfeilbuttons verschoben werden. Der Benutzer ist dann selbst dafür verantwortlich, dass keine Mannschaft mehrmals an einem Spieltag spielt, aber in jedem Spieltag werden doppelte Mannschaften rot angezeigt.
