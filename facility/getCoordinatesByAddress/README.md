# Info action

## Descrizione

Restituisce un oggetto contenente, oltre all'esito della richiesta, una coppia di coordinate e l'indirizzo completo rilevato dal servizio di GeoCoding

## Creazione del file .env

  ```bash
  # posizionarsi nella directory "getCoordinatesByAddress" e lanciare
  touch .env
  echo "gmaps_endpoint=<google_maps_geocoding_endpoint>" >> .env
  echo "gmaps_api_key=<google_maps_api_key>" >> .env
  ```

### Parametri .env

* **gmaps_endpoint**: url di accesso al servizio di GeoCoding di Google Maps. Al momento è

```bash
  https://maps.googleapis.com/maps/api/geocode/json
  ```

* **gmaps_api_key**: api key fornita da google per l'accesso ai servizi di Maps

## Parametri action

* **address**: indirizzo per il quale si vogliono ottenere le coordinate

## Definizione action

* Creazione dello zip: posizionarsi nella directory "getCoordinatesByAddress" e lanciare

  ```bash
  npm i
  zip -r getCoordinatesByAddress .
  ```

* Creazione package, se inesistente

  ```bash
  ibmcloud fn package create facility
  ```

* Creazione della action

  ```bash
  ibmcloud fn action create facility/getCoordinatesByAddress --kind nodejs:12 getCoordinatesByAddress.zip
  ```

  in caso di aggiornamento, ricreare il file .zip e lanciare il seguento comando:

  ```bash
  ibmcloud fn action update facility/getCoordinatesByAddress --kind nodejs:12 getCoordinatesByAddress.zip
  ```

## Esempio chiamata

  ```bash
  ibmcloud fn action invoke --result facility/getCoordinatesByAddress --param address "via Paolo Fabbri 43, Bologna"
  
  > {
      "payload": {
          "address": "Via Paolo Fabbri, 43, 40138 Bologna BO, Italy",
          "lat": 44.4949594,
          "lon": 11.3628083
      },
      "status": "OK"
    }
  ```
  
