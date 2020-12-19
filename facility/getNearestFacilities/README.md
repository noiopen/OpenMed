# Info composition

## Descrizione

Data una coppia di coordinate, restituisce la facility più vicina alle coordinate in input tra quelle restituite dalla action _getFacilities_

### Parametri composition

* **latitude**: latitudine del punto geografico di riferimento

* **longitude**: latitudine del punto geografico di riferimento

### Definizione composition

* Installazione di openwhisk-composer, se non installato

  ```bash
  npm install -g openwhisk-composer
  compose -h # Verifica che l'installazione abbia avuto successo
  ```

* Creazione package, se inesistente

  ```bash
  ibmcloud fn package create facility
  ```

* Creazione composition

  ```bash
  compose index.js > getNearestFacilities.json
  ```

* Deploy composition

  ```bash
  deploy facility/getNearestFacilities getNearestFacilities.json --kind nodejs:12
  ```

### Esempio chiamata

  ```bash
  ibmcloud fn action invoke --result facility/getNearestFacilities --param longitude 45.90 --param latitude 56.90
  
  > {
      "payload": {
        "_id": "3d51c8242a613bbd5a0fd3387200e12b",
        "_rev": "2-b349d0a8ee001b8af7eaa9d8639d3d8f",
        "address": {
            "state": "New York",
            "stateCode": "NY",
            "street": "26186 Ronald Regan Alley",
            "town": "New York City",
            "zip": "10045"
        },
        "domain_identifier": "Victor",
        "email": "divanshintsev2@hubpages.com",
        "latitude": 40.7086,
        "longitude": -74.0087,
        "name": "OMG Medical Group, LLC"
      }
    }
  ```
  