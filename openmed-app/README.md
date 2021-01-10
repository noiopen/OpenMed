# OpenMED-app

Questa applicazione è una GUI che permette di interagire con le funzionalità della piattaforma OpenMED. Per accedere è necessario prima configurare alcuni componenti, come descritto nei paragrafi successivi.

## Prerequisiti

Affinchè l'applicativo funzioni correttamente è necessario:

### Configurazione ambiente di backend

La guida per la configurazione dell'ambiente di sviluppo è disponibile [qui](../v1.0.0.md). Di seguito sono elencati i passaggi necessari alla configurazione, in modo da semplificare la fruizione della guida:

- [Configurare un account personale IBMCloud](../docs/ibmcloud.md#configurazione)

- [Configurare un'istanza Cloudant](../docs/cloudant.md#configurazione)

- [Popolare il DB Cloudant con dati fittizi](../docs/cloudant.md#popolamento-dati)

- [Creare il package facility](../facility/README.md#creazione)

- Creare le action del package facility:

  - getFacilities
    - [Creazione del file .env](../facility/getFacilities/README.md#creazione-del-file-env)
    - [Creazione action](../facility/getFacilities/README.md#definizione-action)
  - getNearestFacilitiesFromList
    - [Creazione action](../facility/getNearestFacilitiesFromList/README.md#definizione-action)
  - getNearestFacilities
    - [Creazione composition](../facility/getNearestFacilities/README.md#definizione-composition)
  - getCoordinatesByAddress
    - [Creazione del file .env](../facility/getCoordinatesByAddress/README.md#creazione-del-file-env)
    - [Creazione action](../facility/getCoordinatesByAddress/README.md#definizione-action)

- [Creare le API relative alle actions](../facility/README.md#creazione-api)

- [Configurare un'istanza locale di KeyCloak + Kong](../docs/keycloak.md)

### Configurazione file .env

Partendo dal file ".env.template" creare il file ".env" impostando correttamente le seguenti variabili:

- **REACT_APP_URL**: è l'URL su cui è esposto questo client, usato per il redirect da Keycloak a login avvenuto. In sviluppo sarà: [http://localhost:3000](http://localhost:3000)

- **REACT_APP_API_SERVER**: è l'URL dell'API server (Kong) attraverso cui sono esposte le API relative alle action. In sviluppo sarà: [http://localhost:8000](http://localhost:8000)

- **REACT_APP_KEYCLOAK**: è l'URL dell'endpoint di Keycloak. In sviluppo sarà: [https://172.33.0.100:8443/auth/](https://172.33.0.100:8443/auth/)

## Comandi Utili

- `npm i` : da lanciare per installare i pacchetti necessari per avviare l'applicazione
- `npm start` : lancia l'applicazione
