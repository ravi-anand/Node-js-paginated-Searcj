# Node JS CURD operation

Node JS paginated Search

Backend for paginated Search on JSON list.

## CONTENTS OF THIS FILE

- Introduction
- Requirements
- Recommended modules
- Installation
- Configuration
- Troubleshooting
- FAQ
- Maintainers

## REQUIREMENTS

- Node.JS

## Installation

Clone the repository and run ```npm install```

## Start Server

To start the server run ```npm start```.</br>    
Server will start at 4000 port
```http://localhost:4000/````

## Modules

* ```/api/search```  
    Method: Get  
    API to fetch search result  
    parameters: name, country_code, domain, limit, skip

    * name: Key word to search in universities
    * country_code: filter record on country ocde
    * domain: filter record based on domain
    * limit: record per page
    * skip: record to skip 

    Response: 
    * result: list of universities
    * limit: number of record
    * start: current starting index

* ```/api/universities```  
    Method: Get  
    API to fetch all record result  
    query parameters: limit (optional), skip (optional)

    * limit: record per page
    * skip: record to skip 

    Response: 
    * result: list of universities
    * limit: number of record
    * start: current starting index

* ```/api/universities```  
    Method: Post  
    create new record  
    body parameters: alpha_two_code, country, domain, name, web_page

    * name: Univerdity name
    * alpha_two_code: country ocde
    * domain:  domain
    * country: country
    * web_page: web_page
    
* ```/api/universities/```  
    Method: Delete  
    Delete new record  
    Query parameters: name

    

* ```/api/universities/:name_update/```  
    Method: Put  
    Update record  
    Query parameters: name of university  
    Body Parameter: new name

    

    