# Info package

## Descrizione

Raccoglie le funzionalità e le informazioni relative alle facilities

### Utilizzo

* Login su "ibmcloud"

```bash
  ibmcloud login
  ```

* Specificare un target "org" e "space"

```bash
  ibmcloud target --cf
  ```

* deployare la action [getFacilities](./getFacilities/README.md) che si occupa di restituire tutte le facility disponibili

* deployare la action [getNearestFacilitiesFromList](./getNearestFacilitiesFromList/README.md) che dato un elenco di facilities e una coppia di coordinate, restituisce la facility più vicina alle coordinate in input

* deployare la action [getNearestFacilities](./getNearestFacilities/README.md) che data una coppia di coordinate, restituisce la facility più vicina alle coordinate in input tra quelle restituite dalla action _getFacilities_
