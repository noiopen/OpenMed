## Info action

### Descrizione

Restituisce un array contenente gli oggetti presenti nel DB _facility_ su Cloudant

### Parametri .env

* **cloudant_url**: url di connessione al package Cloudant. Recuperabile tramite
	```
  ibmcloud fn package get <cloudant_package_name> parameters
  ```
* **cloudant_api_key**: url di connessione al package Cloudant. Recuperabile tramite
	```
  ibmcloud fn package get <cloudant_package_name> parameters
  ```

### Parametri action

Nessun parametro

### Definizione action

* Creazione package, se inesistente
  ```
  ibmcloud fn package create facility
  ```

* Creazione action
  ```
  ibmcloud fn action create facility/getFacilities --kind nodejs:10 <path_to_zip>
  ```

### Esempio chiamata

  ```
  ibmcloud fn action invoke --result facility/getFacilities
  
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