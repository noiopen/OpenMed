# CLOUDANT

## Configurazione

* Link con documentazione completa:
  * [Cloudant](https://cloud.ibm.com/docs/openwhisk?topic=openwhisk-pkg_cloudant)
  * [Creazione di un'instanza Cloudant su IBM Cloud](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-creating-an-ibm-cloudant-instance-on-ibm-cloud-by-using-the-ibm-cloud-cli)

* Creare un account personale [Cloudant](https://www.ibm.com/it-it/cloud/cloudant):

* Creare un package di servizio Cloudant

  ```bash
  ibmcloud fn package bind /whisk.system/cloudant <cloudant_package_name>
  ```

* Elencare le risorse attive (tra cui il package appena creato)

  ```bash
  ibmcloud resource service-instances
  ```

* Creare le credenziali per il package Cloudant

  ```bash
  ibmcloud resource service-key-create <credentials_name> Manager --instance-name <cloudant_instance_name>
  ```

* Elencare le credenziali per il package Cloudant

  ```bash
  ibmcloud resource service-keys --instance-name <cloudant_instance_name>
  ```

* Creare un bind tra il package Cloudant e le Functions, usando le credenziali definite prima

  ```bash
  ibmcloud fn service bind cloudantnosqldb <cloudant_bind_name> --instance <cloudant_instance_name> --keyname '<credentials_name>'
  ```

* Verificare che il bind sia avvenuto con successo

  ```bash
  ibmcloud fn package get <cloudant_package_name> parameters
  ```

Nella directory [models](../models) sono a disposizione due file .json che contengono i dati di prova per le facility e gli user e che si possono facilmente importare nel proprio account Cloudant.
