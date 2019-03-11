This repo is no longer being maintained. This generator has been deprecated in favor of [integrating this template into the multi-template system of the greater learn-module-generator Yeoman system](https://github.com/patridge/learn-module-generator#generate-a-module-knowledge-check).

# yo learn-knowledge-check - Microsoft Learn knowledge check generator

A Yeoman generator to create a knowledge check for Microsoft Learn modules.

## Install the Generator

Install [Yeoman](http://yeoman.io/) and the [learn-knowledge-check generator](https://www.npmjs.com/package/generator-learn-knowledge-check):

```bash
npm install -g yo generator-learn-knowledge check
```

> NOTE: To run any Yeoman generators, you need to have npm installed, which required Node.js.
> To [install Node.js](https://nodejs.org/en/download/), download the run the latest LTS release for your operating system.
> With Node.js installed, run the following command to install npm for managing Node.js packages.
>
> ```bash
> npm install npm@latest -g .
> ```

## Run yo generator-learn-knowledge-check

The learn-knowledge-check generator will walk you through the steps required to create a knowledge check for a Microsoft Learn module, prompting for values used to generate the proper YAML structure.

To launch the generator simply type:

```bash
yo learn-knowledge-check
```

## Generator Output

This generator will create a YAML file with the appropriate knowledge check structure.

* 00-knowledge-check.yml

## History

* 0.1.0: Initial attempt

## License

[MIT](https://github.com/patridge/learn-knowledge-check-generator/blob/master/LICENSE)
