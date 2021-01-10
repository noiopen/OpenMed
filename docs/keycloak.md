# Keycloak & Kong & Konga

Questi tre componenti permettono di gestire l'autenticazione e l'accesso alle risorse:

* Keycloak  --> Identity e Access Management (registrazione utente, login utente, gruppi di utenti, ecc.)
* Kong      --> Api Gateway
* Konga     --> GUI per la gestione di Kong

Gli applicativi vengono lanciati via docker con una configurazione base che rende funzionante la piattaforma fin dalla prima installazione.

La prima volta che vengono lanciati i container, bisogna effettuare la migrazione dei db di kong e konga. Questa è un'operazione una tantum\
Per fare questo, nella directory principale del progetto lanciare:

```bash
docker-compose up -d kong-db-postgres kong-migration konga-db-postgres konga-migration
```

Una volta che le migrazioni sono state completate è possibile lanciare tutti i componenti con il seguente comando, dalla directory principale del progetto:

```bash
docker-compose up -d
```

Verrano creati tutti i container necessari ed eseguita la configurazione di Keycloak in automatico. Questa installazione deve essere eseguita prima di lanciare l'applicazione utente, altrimenti non sarà possibile eseguire il login.

La configurazione di Kong e Konga non è automatica, pertanto, ad installazione finita, procedere come segue:

## Konga

Per configurare Konga, accedere al [pannello di amministrazione](http://localhost:1337):

```bash
user        : admin
password    : admin123456admin
```

ed impostare una nuova connessione verso l'installazione di Kong:

```bash
Name              : Kong
Kong admin URL    : http://kong:8001/
```

## Kong

La prima configurazione di Kong può essere fatta via GUI attraverso Konga o lanciando le seguente chiamate CURL. Prima di lanciare le chiamate CURL è necessario impostare l' "API_SERVER", ovvero l'endpoint sul quale sono state configurate le [API di OpenMED](./ibmcloud.md):

```bash
# Configurazione del servizio getFacilities
curl -i -X POST \
--url http://localhost:8001/services/ \
--data 'name=getFacilities' \
--data 'url=**API_SERVER**/facility/list'
```

```bash
# Configurazione della route getFacilities 
curl -i -X POST \
 --url http://localhost:8001/services/getFacilities/routes \
 --data 'strip_path=true' \
 --data 'name=getFacilitiesRoute' \
 --data 'paths[]=/facility/list' \
 --data 'methods[1]=GET' \
 --data 'methods[2]=OPTIONS'
 ```

```bash
# Configurazione del plugin jwt-keycloak
curl -i -X POST http://localhost:8001/services/getFacilities/plugins \
--data name="jwt-keycloak" \
--data "config.uri_param_names=jwt" \
--data "config.claims_to_verify=exp" \
--data "config.run_on_preflight=true" \
--data "config.maximum_expiration=0" \
--data "config.algorithm=RS256" \
--data "config.allowed_iss=https://172.33.0.100:8443/auth/realms/OpenMED" \
--data "config.iss_key_grace_period=10" \
--data "config.well_known_template=%25s/.well-known/openid-configuration" \
--data "config.consumer_match_claim=azp"
```

```bash
# Configurazione del plugin cors
curl -i -X POST http://localhost:8001/services/getFacilities/plugins \
    --data "name=cors"  \
    --data "config.origins=http://localhost:3000" \
    --data "config.origins=**API_SERVER**/facilities/list" \
    --data "config.origins=*" \
    --data "config.methods=GET" \
    --data "config.methods=POST" \
    --data "config.methods=PUT" \
    --data "config.methods=PATCH" \
    --data "config.methods=DELETE" \
    --data "config.methods=OPTIONS" \
    --data "config.headers=Accept" \
    --data "config.headers=Accept-Version" \
    --data "config.headers=Content-Length" \
    --data "config.headers=Content-MD5" \
    --data "config.headers=Content-Type" \
    --data "config.headers=Date" \
    --data "config.headers=X-Auth-Token" \
    --data "config.headers=X-Requested-With" \
    --data "config.headers=Access-Control-Allow-Origin" \
    --data "config.headers=Access-Control-Allow-Headers" \
    --data "config.headers=User-Agent" \
    --data "config.headers=Origin" \
    --data "config.headers=Authorization" \
    --data "config.headers=Referer" \
    --data "config.exposed_headers=Accept" \
    --data "config.exposed_headers=Accept-Version" \
    --data "config.exposed_headers=Content-Length" \
    --data "config.exposed_headers=Content-MD5" \
    --data "config.exposed_headers=Content-Type" \
    --data "config.exposed_headers=Date" \
    --data "config.exposed_headers=X-Auth-Token" \
    --data "config.exposed_headers=X-Requested-With" \
    --data "config.exposed_headers=Access-Control-Allow-Origin" \
    --data "config.exposed_headers=Access-Control-Allow-Headers" \
    --data "config.exposed_headers=User-Agent" \
    --data "config.exposed_headers=Origin" \
    --data "config.exposed_headers=Authorization" \
    --data "config.exposed_headers=Referer" \
    --data "config.credentials=true" \
    --data "config.max_age=3600"
```

A questo punto è possibile lanciare l'[applicazione utente](../openmed-app/README.md) ed accedere con l'utente "user" creato automaticamente:

```bash
user        : user
password    : user
```

## Tips

* Il pannello di amministazione di Keycloak è disponibile al seguente indirizzo: [https://172.33.0.100:8443/auth](https://172.33.0.100:8443/auth). L'utenza di amministrazione è la seguente:

  ```bash
  user        : admin
  password    : admin
  ```

* La configurazione OpenMED di Keycloak viene salvata sul file [openmed.json](../keycloak/config/openmed.json). Se modificata, è possibile esportarla lanciando il seguente comando:

  ```bash
  docker-compose exec keycloak /opt/jboss/keycloak/bin/standalone.sh \
      -Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=export \
      -Dkeycloak.migration.provider=singleFile \
      -Dkeycloak.migration.realmName=OpenMED \
      -Dkeycloak.migration.usersExportStrategy=REALM_FILE \
      -Dkeycloak.migration.file=/tmp/config/openmed.json
  ```
