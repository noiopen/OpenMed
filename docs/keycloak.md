# KEYCLOAK

## Installazione

- Scaricare il docker-compose di keycloak + postgres da [qui](https://github.com/keycloak/keycloak-containers/blob/master/docker-compose-examples/keycloak-postgres.yml)

- Lanciare l'applicativo con il seguente comando:

  ```bash
  docker-compose -f path/to/keycloak-postgres.yml up
  ```

## Configurazione

- Accedere al pannello di amministrazione all'[indirizzo predefinito](http://localhost:8080/auth)

  - Le credenziali sono specificate nel docker-compose: KEYCLOAK_USER e KEYCLOAK_PASSWORD

- Creare un nuovo realm denominato 'OpenMED' e selezionarlo

- Creare un nuovo client denominato 'openmed-app'

  - Settare come Root URL, Admin URL, Web Origins l'indirizzo dell'app di frontend. Es: [http://localhost:3000](http://localhost:3000)

  - Settare come Redirect URI l'insieme di indirizzi dell'app di frontend. Es: [http://localhost:3000/*](http://localhost:3000/*)

- Creare un nuovo utente e configurarne le credenziali
