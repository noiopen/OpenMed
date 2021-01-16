# CLOUDANT

## Configurazione

* Link con documentazione completa:
  * [Creazione di un'instanza Cloudant su IBM Cloud](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-creating-an-ibm-cloudant-instance-on-ibm-cloud-by-using-the-ibm-cloud-cli)
  * [Cloudant](https://cloud.ibm.com/docs/openwhisk?topic=openwhisk-pkg_cloudant)

* Creare un account personale [Cloudant](https://www.ibm.com/it-it/cloud/cloudant):

* Fare il login su IBMCloud

  ```bash
  ibmcloud login
  ```

* Impostare un target (ad esempio allo spazio di sviluppo personale) su IBMCloud

  ```bash
  ibmcloud target -o "indirizzo@email.com" -s "dev" -g Default
  ```

* Creare l'istanza di servizio Cloudant. Il comando restituisce il nome dell'istanza appena creata

  ```bash
  # Comando generico
  ibmcloud resource service-instance-create SERVICE_INSTANCE_NAME cloudantnosqldb lite eu-de -p '{"legacyCredentials":false}'

  # Comando di esempio
  ibmcloud resource service-instance-create CloudantService cloudantnosqldb lite eu-de -p '{"legacyCredentials":false}'
  ```

* Elencare le istanze di servizio attive (tra cui l'istanza appena creata)

  ```bash
  ibmcloud resource service-instances
  ```

* Creare le credenziali di accesso al servizio Cloudant

  ```bash
  # Comando generico
  ibmcloud resource service-key-create CREDENTIALS_NAME Manager --instance-name SERVICE_INSTANCE_NAME

  # Comando di esempio
  ibmcloud resource service-key-create CloudantServiceCreds Manager --instance-name CloudantService
  ```

* Elencare le credenziali attive (tra cui quelle appena create)

  ```bash
  ibmcloud resource service-keys
  ```

* Creare un package che punta al servizio Cloudant appena creato

  ```bash
  # Comando generico
  ibmcloud fn package bind /whisk.system/cloudant PACKAGE_NAME

  #Comando di esempio
  ibmcloud fn package bind /whisk.system/cloudant CloudantPackage
  `````

* Creare un bind tra il servizio Cloudant e il package appena creato, usando le credenziali definite prima

  ```bash
  # Comando generico
  ibmcloud fn service bind cloudantnosqldb PACKAGE_NAME --instance SERVICE_INSTANCE_NAME --keyname CREDENTIALS_NAME

  #Comando di esempio
  ibmcloud fn service bind cloudantnosqldb CloudantPackage --instance CloudantService --keyname CloudantServiceCreds
  ```

* Verificare che il bind sia avvenuto con successo

  ```bash
  # Comando generico
  ibmcloud fn package get PACKAGE_NAME parameters

  #Comando di esempio
  ibmcloud fn package get CloudantPackage parameters
  ```

## Popolamento dati

* Dalla dashboard di IBMCloud, accedere all'elenco risorse e selezionare il servizio Cloudant

* Dalla pagina di dettaglio del servizio lanciare la dashboard Cloudant

* Nella pagina 'Databases' creare il database 'facility'

* Accedere al database appena creato e creare i documenti fittizi elencati nel file [facility.json](../facility/models/facility.json)
  N.B. Bisogna inserire un documento per ogni elemento del file json
