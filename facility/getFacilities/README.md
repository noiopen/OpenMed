# Info action

Questa action permette di recuperare i dati relativi agli ambulatori che sono presenti sulla piattaforma: la action si aspetta di poter leggere i dati da una collection _facility_ su Cloudant.

## Descrizione

Questa action mette a disposizione una API per leggere e filtrare gli ambulatori. In particolare:

- quando viene chiamata senza parametri, vengono restituite tutte gli ambulatori presenti

```bash
/v1/facilities
```

- quando viene chiamata con il parametro "id", viene restituito l'ambulatorio specifico

```bash
/v1/facilities?id=.......
```

- quando viene chiamata con i parametri "latitude" e "longitude", viene restituito l'ambulatorio più vicino al punto geografico indicato

```bash
/v1/facilities?latitude=.........&longitude=.........
```

## Creazione del file .env

```bash
# posizionarsi nella directory "getFacilities"
touch .env
echo "### CLOUDANT" >> .env
echo "CLOUDANT_URL=<env_variable_value>" >> .env
echo "CLOUDANT_API_KEY=<env_variable_value>" >> .env
echo "CLOUDANT_DATABASE=<env_variable_value>" >> .env
```

### Parametri .env

- **cloudant_url**: url di connessione al package Cloudant (attributo 'url'). Recuperabile tramite:

```bash
  ibmcloud fn package get <cloudant_package_name> parameters
```

- **cloudant_api_key**: api key per l'accesso al package Cloudant (attributo 'apikey'). Recuperabile tramite

```bash
  ibmcloud fn package get <cloudant_package_name> parameters
```

## Importazione dei dati

Per popolare il database delle facility si può utilizzare la funzionalità di import:

```bash
  node src/utils/import-csv.js
```

Prima di lanciare lo script è necessario:

- configurare il database: assicurarsi di aver impostato la variabile "CLOUDANT_DATABASE" nel file .env e di aver creato il database su cloudant
- posizionare il file CSV nella directory "facility/models" ed aggiungere la variabile "IMPORT_CSV_FILENAME" nel file .env impostando il nome del file CSV da processare

Il set di dai minimo è il seguente:

- town
- county
- country (default è 'IT')

Aggiungendo anche il codice postale e l'indirizzo chiaramente c'è la possibilità di ottenere le coordinate precise del posto.

- postalcode
- street

## Parametri action

Nessun parametro

## Definizione action

Da terminale, nella directory principale del progetto:

- eseguire il login su ibmcloud

  ```bash
  ibmcloud login
  ```

  se necessario, impostare il "target", come ad esempio:

  ```bash
  ibmcloud target -o "tua_mail" -s "dev" -g Default
  ```

- Creazione package, se inesistente

  ```bash
  ibmcloud fn package create facility
  ```

- Creazione della action

  ```bash
  npm run create:ibmcloud
  ```

in caso di modifiche, per deployare le nuove versioni si può utilizzare il seguente comando:

```bash
npm run deploy
```

## Esempio chiamata

```bash
npm run invoke:action

> {
    "facilities": [
      {
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
      },
      {
          "_id": "23e72ef34c853539062d012f8f08028f",
          "_rev": "1-ead92d0d7a72f6a1fcc29d2de5a68ade",
          "address": {
              "state": "Montana",
              "stateCode": "MT",
              "street": "77 Tomscot Park",
              "town": "Billings",
              "zip": "59112"
          },
          "domain_identifier": "Yankee",
          "email": "cdoull3@flavors.me",
          "latitude": 45.9783,
          "longitude": -108.1945,
          "name": "TRP Company"
      }
    ]
  }
```
