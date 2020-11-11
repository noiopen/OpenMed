# Info package

## Descrizione

Raccoglie le funzionalità e le informazioni relative alle facilities

### Utilizzo

- Login su "ibmcloud"

```bash
  ibmcloud login
```

- Specificare un target "org" e "space"

```bash
  ibmcloud target -o "indirizzo@email.com" -s "dev" -g Default
```

per verificare

```bash
  ibmcloud target --cf
```

### Funzionalità disponibili

- Action [getFacilities](./getFacilities/README.md) : restituisce la lista di tutte le facility disponibili

- Action [getNearestFacilitiesFromList](./getNearestFacilitiesFromList/README.md) : dato un elenco di facilities e una coppia di coordinate, restituisce la facility più vicina alle coordinate in input

- Action [getNearestFacilities](./getNearestFacilities/README.md) : data una coppia di coordinate, restituisce la facility più vicina alle coordinate in input tra quelle disponibili (necessita delle prime due per funzionare)

- Action [getCoordinatesByAddress](./getCoordinatesByAddress/README.md) : dato un indirizzo, restituisce le coordinate geografiche relative all'indirizzo fornito in input
