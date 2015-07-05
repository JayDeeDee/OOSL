# Baukasten für Frontend Entwicklung

## Idee
Frontend Entwickler sowie Composer einer Frontendabteilung sollen bei der schnellen Erstellung statischer HTML-Vorlagen unterstützt werden.

Die Abteilung setzt IntelliJ unter MacOS ein, einige der Entwickler kennen sich mit Datenbanken und serverseitiger Programmierung nicht aus, sollen aber trotzdem in der Lage sein, einige Anpassungen an dem Baukasten vorzunehmen

## Funktionsumfangs
- übersichtliche Darstellung des aktuellen Entwicklungstands
	- in Arbeit
	- fertig gestellt
- Templatefunktionalität: Redundanzen vermeiden, templateübergreifende Seitenelemente als Includes ablegen, um Änderungen schneller umsetzen zu können
- automatisch erzeugte, aber konfigurierbare Vorlagenlisten für den Templatestand
- übersichtliche Möglichkeit, responsive Layouts zu testen
- wahlweise automatisches oder manuelles Kompilieren von LESS-Dateien
- wahlweise automatisches oder manuelles Konkatinieren von JS-Dateien
- Export von minifizierten JS- und CSS-Dateien
- Export von Entwicklungsständen mit der Möglichkeit, Vorlagen auszunehmen mit automatisch erzeugter Vorlagenliste
- Export von einzelnen Templates ohne Vorlagenliste
- gleichzeitige Erstellung von mehreren Screenshots eines Templates


## technische Voraussetzungen
* OS X 10.9 Mavericks or OS X 10.10 Yosemite
* IntelliJ Idea IDE
* Python 2.7
* Pip
* Node.js
* npm
* Virtualenv

## verwendete Technologien
* Django ohne Datenbankanbindung (Verzicht auf Models)
* Grunt
* LESS
* fabric
* webkit2png (nur MacOS!)
* Shell Skript

