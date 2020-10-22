## Info action

### Descrizione

Dato un elenco di facilities e una coppia di coordinate, restituisce la facility più vicina alle coordinate in input

### Parametri .env

Nessun parametro

### Parametri action

* **latitude**: latitudine del punto geografico di riferimento

* **longitude**: latitudine del punto geografico di riferimento

* **facilities**: array di oggetti contenenti degli attributi _latitude_ e _longitude_

### Definizione action

* Creazione package, se inesistente
  ```
  ibmcloud fn package create facility
  ```

* Creazione action
  ```
  ibmcloud fn action create facility/getNearestFacilitiesFromList --kind nodejs:10 <path_to_zip>
  ```

### Esempio chiamata

  ```
  ibmcloud fn action invoke --result facility/getNearestFacilitiesFromList --param latitude 56.90 --param longitude 45.90 --param facilities '[{ "_id": "1363d15e2478f02c518b2361dc00d4e9", "_rev": "2-48da62fa322aa03fc6e17d399bdedf0c", "address": { "state": "Ohio", "stateCode": "OH", "street": "7426 Caliangt Way", "town": "Akron", "zip": "44310" }, "domain_identifier": "Oscar", "email": "hmaior8@ted.com", "latitude": 41.1075, "longitude": -81.5006, "name": "Beiersdorf Inc" }]'

  > {
      "payload": {
        "_id": "1363d15e2478f02c518b2361dc00d4e9",
        "_rev": "2-48da62fa322aa03fc6e17d399bdedf0c",
        "address": {
            "state": "Ohio",
            "stateCode": "OH",
            "street": "7426 Caliangt Way",
            "town": "Akron",
            "zip": "44310"
        },
        "domain_identifier": "Oscar",
        "email": "hmaior8@ted.com",
        "latitude": 41.1075,
        "longitude": -81.5006,
        "name": "Beiersdorf Inc"
      }
    }
  ```