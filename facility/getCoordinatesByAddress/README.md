# Info action

## Descrizione

Restituisce un oggetto contenente, oltre all'esito della richiesta, una coppia di coordinate e l'indirizzo completo rilevato dal servizio di GeoCoding

## Parametri action

- **address**: indirizzo per il quale si vogliono ottenere le coordinate

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

- Creazione della action, se inesistente

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
```

oppure per specifica un indirizzo:

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
