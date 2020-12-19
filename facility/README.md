# Info package

## Descrizione

Raccoglie le funzionalità e le informazioni relative alle facilities

### Creazione

* Loggarsi su IBMCloud e specificare un target "org" e "space"

```bash
  ibmcloud login
  ibmcloud target -o "indirizzo@email.com" -s "dev" -g Default
```

* Creare il package

```bash
  ibmcloud fn package create facility
```

### Funzionalità disponibili

* Action [getFacilities](./getFacilities/README.md) : restituisce la lista di tutte le facility disponibili

* Action [getNearestFacilitiesFromList](./getNearestFacilitiesFromList/README.md) : dato un elenco di facilities e una coppia di coordinate, restituisce la facility più vicina alle coordinate in input

* Action [getNearestFacilities](./getNearestFacilities/README.md) : data una coppia di coordinate, restituisce la facility più vicina alle coordinate in input tra quelle disponibili (necessita delle prime due per funzionare)

* Action [getCoordinatesByAddress](./getCoordinatesByAddress/README.md) : dato un indirizzo, restituisce le coordinate geografiche relative all'indirizzo fornito in input

### Creazione API

Le API di IBMCloud permettono di creare uno strato di interfaccia che disaccoppia le chiamate web del frontend dalle action. Per creare le API relative alle action definite nel paragrafo precedente seguire i passaggi elencati.

* accedere alla dashboard di IBMCloud e dal menu laterale andare su Functions -> API

* procedere con la creazione di una nuova API

* specificare i seguenti parametri:
  * Nome API: facility
  * Percorso di base API: /facility

* creare le seguenti operazioni:
  * endpoint per **getFacilities**
    * Percorso: /nearest
    * Verbo: GET
    * Package: facility
    * Azione: getFacilities
    * Tipo di contenuto: application/json
  * endpoint per **getNearestFacilities**
    * Percorso: /nearest
    * Verbo: GET
    * Package: facility
    * Azione: getNearestFacilities
    * Tipo di contenuto: application/json
  * endpoint per **getCoordinatesByAddress**
    * Percorso: /nearest
    * Verbo: GET
    * Package: facility
    * Azione: getNearestFacilities
    * Tipo di contenuto: application/json

* lasciare gli altri parametri ai valori di default e salvare le modifiche
* tornando alla pagina API, si vedrà l'endpoint appena creato e l'url a cui è possibile raggiungerlo
