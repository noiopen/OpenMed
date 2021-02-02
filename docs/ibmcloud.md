# IBMCLOUD

## Configurazione

- Creare un account personale su [IBMCloud](https://cloud.ibm.com/registration) selezionando la region 'eu-gb' (altre region non hanno tutte le risorse disponibili):
- Scaricare la CLI:

  ```bash
  curl -sL https://ibm.biz/idt-installer | bash # Installa la CLI
  ibmcloud dev help # Verifica che l'installazione sia andata a buon fine
  ```

- Configurare l'ambiente IBMCloud

  - Effettua il login al proprio account:

    ```bash
    ibmcloud login
    ```

  - Configurare il puntamento al namespace principale (es: organization = <your_email>, space = dev):

    ```bash
    ibmcloud target -o <organization> -s <space> -g Default
    ```

    es.

    ```bash
    ibmcloud target -o "indirizzo@email.com" -s "dev" -g Default
    ```

### Comandi

- Elenco delle action disponibili

  ```bash
  ibmcloud fn action list
  ```

- Creazione o aggiornamento di una action

  ```bash
  ibmcloud fn action [create | update] <package_name>/<action_name> <action_file>
  ```

- Cancellazione di una action

  ```bash
  ibmcloud fn action delete <package_name>/<action_name>
  ```

- Mostra i dettagli di una action

  ```bash
  ibmcloud fn action get <package_name>/<action_name>
  ```

- Invocazione di una action

  ```bash
  ibmcloud fn action invoke -r <package_name>/<action_name> -param <param_1_name> <param_1_value> -param <param_2_name> <param_2_value>
  ```
