# OpenMED-app

Questa applicazione è una GUI che permette di interagire con le funzionalità della piattaforma OpenMED. Per accedere è necessario prima configurare alcuni componenti, come descritto nei paragrafi successivi.

## Prerequisiti

Affinchè l'applicativo funzioni correttamente è necessario:

### Configurazione ambiente di backend

La guida per la configurazione dell'ambiente di sviluppo è disponibile [qui](https://github.com/noiopen/OpenMed/blob/develop/v1.0.0.md). Di seguito sono elencati i passaggi necessari alla configurazione, in modo da semplificare la fruizione della guida:

- [Configurare un account personale IBMCloud](https://github.com/noiopen/OpenMed/blob/develop/docs/ibmcloud.md#configurazione)

- [Configurare un'istanza Cloudant](https://github.com/noiopen/OpenMed/blob/develop/docs/cloudant.md#configurazione)

- [Popolare il DB Cloudant con dati fittizi](https://github.com/noiopen/OpenMed/blob/develop/docs/cloudant.md#popolamento-dati)

- [Creare il package facility](https://github.com/noiopen/OpenMed/tree/develop/facility#creazione)

- Creare le action del package facility:

  - getFacilities
    - [Creazione del file .env](https://github.com/noiopen/OpenMed/blob/develop/facility/getFacilities/README.md#creazione-del-file-env)
    - [Creazione action](https://github.com/noiopen/OpenMed/blob/develop/facility/getFacilities/README.md#definizione-action)
  - getNearestFacilitiesFromList
    - [Creazione action](https://github.com/noiopen/OpenMed/blob/develop/facility/getNearestFacilitiesFromList/README.md#definizione-action)
  - getNearestFacilities
    - [Creazione composition](https://github.com/noiopen/OpenMed/blob/develop/facility/getNearestFacilities/README.md#definizione-composition)
  - getCoordinatesByAddress
    - [Creazione del file .env](https://github.com/noiopen/OpenMed/blob/develop/facility/getCoordinatesByAddress/README.md#creazione-del-file-env)
    - [Creazione action](https://github.com/noiopen/OpenMed/blob/develop/facility/getCoordinatesByAddress/README.md#definizione-action)

- [Creare le API relative alle actions](https://github.com/noiopen/OpenMed/blob/develop/docs/ibmcloud.md#comandi)

- [Configurare un'istanza locale di KeyCloak](https://github.com/noiopen/OpenMed/blob/develop/docs/keycloak.md)

### Configurazione file .env

Partendo dal file ".env.template" creare il file ".env" impostando correttamente le seguenti variabili:

- **REACT_APP_URL**: è l'URL su cui è esposto questo client, usato per il redirect da Keycloak a login avvenuto. In sviluppo sarà: [http://localhost:3000](http://localhost:3000)

- **REACT_APP_API_SERVER**: è l'URL dell'endpoint su cui sono esposte le API relative alle action. E' possibile recuperarlo dalla dashboard IBMCloud, alla pagina Functions -> API. Es: [https://123ab45c.eu-gb.apigw.appdomain.cloud](https://423fc70c.eu-gb.apigw.appdomain.cloud)

- **REACT_APP_KEYCLOAK**: è l'URL dell'endpoint di Keycloak. In sviluppo sarà: [http://localhost:8080/auth](http://localhost:8080/auth)

## Comandi Utili

- `npm i` : da lanciare per installare i pacchetti necessari per avviare l'applicazione
- `npm start` : lancia l'applicazione
