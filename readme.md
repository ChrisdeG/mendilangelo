# Mendilangelo

> Create microflows for a Mendix application based on existing ones.

Use it to automate the routine work, copy microflows to other entities or migrate other software logic to Mendix.

## Prerequisites

This project requires NodeJS (version 14 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v 
8.9.0
$ node -v
v16.14.0
```

## Table of contents

- [Project Name](#project-name)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Running the app](#Running-the-app)
  - [Contributing](#contributing)
  - [Built With](#built-with)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Get a [Personal Access Token](https://docs.mendix.com/apidocs-mxsdk/mxsdk/setup-your-pat/) and an [API username and password](https://docs.mendix.com/apidocs-mxsdk/apidocs/authentication/) from Mendix.
Place them in Environment Variables as described in the documentation. They should be named 
1.  MENDIX_API_KEY
2.  MENIDX_API_USER
3.  MENDIX_TOKEN


Start with cloning this repo on your local machine:

```sh
$ npm install mendilangelo
```

To install and set up the library, run:

```sh
$ npm install 
```

Or if you prefer using Yarn:

```sh
$ yarn add 
```

## Usage

### Running the app

```sh
$ npm start
```

Select a project and module. Making a online working copy takes some time (10-30 seconds).
The application will create a module named Mendilangelo in your project. For every entity in the domain model a folder with a set of microflows is created. 
1.  {Entity}_FindOrCreate. 
2.  {Entity}_DeleteAll. 
3.  {Entity}_Save
4.  {Entity}_Validate

Open Studio Pro. Update you project and the module should appeared. It is marked in history as a SDK commit.
Copy or move the ones you need to your module, but never use them in the Mendilangelo module. This module should be thrown away in the end. 

### FindOrCreate

This is meant for settings and other entities has have one instance or instance per user. Modify the filters and the input if required.

### DeleteAll

Convenience microflow for development functions. Never place this in Production environments. It deletes all data in batches.

### Save
This will call the validate and if validated commit the object and close the page.

### Validate

Validates the attributes in an entity. Latest version of Mendix have this as an AI option in Studio Pro.

## Expanding Mendilangelo

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/ChrisDeG/Mendilangelo.git
$ cd PROJECT
```

If you have for example a set of microflows to import data from Excel sheets you can export them to 
a folder. Adapt the generated typescript to pass the entity, adapt Mendilangelo and let it generate it for 
all entities.

### Generate Typescript

Run this command to export all microflows to typescript. 

```sh
$ npm run export
```
This will generate a folder called GeneratedMicroflows. Copy the ones you need to the project folder and delete the rest. Deleting is important because the compiler will see the files as incorrect.

Look for entities in the file, replace them with the parameters.

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request 

## Built With

*   Visual Studio Code
*   Mendix Studio Pro

## Authors

* **Chris de Gelder** - *Initial work* - [Chris de Gelder](https://github.com/ChrisdG)

See also the list of [contributors](https://github.com/ChrisdG/mendilangelo/contributors) who participated in this project.

## License

[MIT License](https://andreasonny.mit-license.org/2019) © Chris de Gelder
