'use strict';

let Generator = require('yeoman-generator');
let _ = require('lodash');
let validator = require('./validator');
let yosay = require('yosay');
let path = require('path');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('moduleId', { type: String });
        this.option('knowledgeCheckPublishDate', { type: String });
        this.option('moduleAuthorGitHubId', { type: String });
        this.option('moduleAuthorMicrosoftId', { type: String });
        this.option('moduleLearnContactMicrosoftId', { type: String });

        this.outputConfig = Object.create(null);
    }

    initializing() {
        // Welcome
        this.log(yosay('Welcome to the Microsoft Learn knowledge check generator!'));

        // Configure anything early (e.g., environment values)
        // Example taken from VS Code extension generator:
        // let outputConfig = this.outputConfig;
        // return env.getLatestVSCodeVersion().then(version => { outputConfig.vsCodeEngine = version; });
    }

    prompting() {
        let generator = this;
        // Pulled from https://review.docs.microsoft.com/en-us/new-hope/information-architecture/metadata/taxonomies?branch=master#learn-product
        // var products = [];
        // var currentTier1 = null;
        // var trElements = $("#product").next().next().find("tbody tr");
        // for (var trElement of trElements) {
        //   	var $e = $(trElement);
        //     var product = {
        //     	slug: $e.find("td:nth-child(1)").text(),
        //       name: $e.find("td:nth-child(2)").text(),
        //       tier: $e.find("td:nth-child(3)").text(),
        //     };
        //     if (product.tier === "1") {
        //       if (currentTier1 !== null) {
        //       	products.push(currentTier1);
        //       }
        //     	currentTier1 = { product: product, subProducts: [] };
        //     }
        //     else if (product.tier === "2") {
        //       currentTier1.subProducts.push(product);
        //     }
        // }
        // if (currentTier1 !== null) {
        //   if (currentTier1 !== null) {
        //     products.push(currentTier1);
        //   }
        // }
        // JSON.stringify(products);
        /**
         * @typedef {Object} product
         * @property {string} slug
         * @property {string} name
         * @property {string} tier
         */
        /**
         * @typedef {Object} tier1Product
         * @property {product} product
         * @property {Array<product>} subProducts
         */
        /** @type {Array<tier1Product>} */
        let learnProducts = [{"product":{"slug":"dotnet","name":".NET","tier":"1"},"subProducts":[{"slug":"aspnet","name":"ASP.NET","tier":"2"},{"slug":"dotnet-core","name":".NET Core","tier":"2"}]},{"product":{"slug":"azure","name":"Azure","tier":"1"},"subProducts":[{"slug":"azure-active-directory","name":"Active Directory","tier":"2"},{"slug":"azure-advisor","name":"Advisor","tier":"2"},{"slug":"azure-cdn","name":"Content Delivery Network","tier":"2"},{"slug":"azure-clis","name":"CLIs","tier":"2"},{"slug":"azure-cloud-shell","name":"Cloud Shell","tier":"2"},{"slug":"azure-cognitive-services","name":"Cognitive Services","tier":"2"},{"slug":"azure-container-instances","name":"Container Instances","tier":"2"},{"slug":"azure-container-registry","name":"Container Registry","tier":"2"},{"slug":"azure-cosmos-db","name":"Cosmos DB","tier":"2"},{"slug":"azure-cost-management","name":"Cost Management","tier":"2"},{"slug":"azure-digital-twins","name":"Digital Twins","tier":"2"},{"slug":"azure-event-grid","name":"Event Grid","tier":"2"},{"slug":"azure-event-hubs","name":"Event Hubs","tier":"2"},{"slug":"azure-functions","name":"Functions","tier":"2"},{"slug":"azure-iot-edge","name":"IoT Edge","tier":"2"},{"slug":"azure-iot-hub","name":"IoT Hub","tier":"2"},{"slug":"azure-iot-central","name":"IoT Central","tier":"2"},{"slug":"azure-key-vault","name":"Key Vault","tier":"2"},{"slug":"azure-machine-learning-service","name":"Machine Learning service","tier":"2"},{"slug":"azure-machine-learning-studio","name":"Machine Learning Studio","tier":"2"},{"slug":"azure-maps","name":"Maps","tier":"2"},{"slug":"azure-monitor","name":"Monitor","tier":"2"},{"slug":"azure-portal","name":"Microsoft Azure portal","tier":"2"},{"slug":"azure-redis-cache","name":"Cache for Redis","tier":"2"},{"slug":"azure-resource-manager","name":"Resource Manager","tier":"2"},{"slug":"azure-sdks","name":"SDKs","tier":"2"},{"slug":"azure-service-bus","name":"Service Bus","tier":"2"},{"slug":"azure-sql-database","name":"SQL Database","tier":"2"},{"slug":"azure-storage","name":"Storage","tier":"2"},{"slug":"azure-virtual-machines","name":"Virtual Machines","tier":"2"}]},{"product":{"slug":"dynamics","name":"Dynamics 365","tier":"1"},"subProducts":[{"slug":"dynamics-ai-market-insights","name":"AI for Market Insights","tier":"2"},{"slug":"dynamics-ai-customer-service","name":"AI for Customer Service","tier":"2"},{"slug":"dynamics-ai-sales","name":"AI for Sales","tier":"2"},{"slug":"dynamics-business-central","name":"Business Central","tier":"2"},{"slug":"dynamics-customer-engagement","name":"Customer Engagement","tier":"2"},{"slug":"dynamics-customer-service","name":"Customer Service","tier":"2"},{"slug":"dynamics-field-service","name":"Field Service","tier":"2"},{"slug":"dynamics-finance-operations","name":"Finance and Operations","tier":"2"},{"slug":"dynamics-layout","name":"Layout","tier":"2"},{"slug":"dynamics-marketing","name":"Marketing","tier":"2"},{"slug":"dynamics-operations","name":"Operations","tier":"2"},{"slug":"dynamics-project-service","name":"Project Service Automation","tier":"2"},{"slug":"dynamics-remote-assist","name":"Remote Assist","tier":"2"},{"slug":"dynamics-retail","name":"Retail","tier":"2"},{"slug":"dynamics-sales","name":"Sales","tier":"2"},{"slug":"dynamics-talent","name":"Talent","tier":"2"}]},{"product":{"slug":"office","name":"Office","tier":"1"},"subProducts":[{"slug":"office-access","name":"Access","tier":"2"},{"slug":"office-adaptive-cards","name":"Adaptive Cards","tier":"2"},{"slug":"office-excel","name":"Excel","tier":"2"},{"slug":"office-kaizala","name":"Kaizala","tier":"2"},{"slug":"office-ms-graph","name":"Microsoft Graph","tier":"2"},{"slug":"office-365","name":"Office 365","tier":"2"},{"slug":"office-add-ins","name":"Office Add-ins","tier":"2"},{"slug":"office-ui-fabric","name":"Office UI Fabric","tier":"2"},{"slug":"office-onedrive","name":"OneDrive","tier":"2"},{"slug":"office-onenote","name":"OneNote","tier":"2"},{"slug":"office-outlook","name":"Outlook","tier":"2"},{"slug":"office-planner","name":"Planner","tier":"2"},{"slug":"office-powerpoint","name":"PowerPoint","tier":"2"},{"slug":"office-project","name":"Project","tier":"2"},{"slug":"office-publisher","name":"Publisher","tier":"2"},{"slug":"office-sp-framework","name":"SharePoint","tier":"2"},{"slug":"office-sp-framework","name":"SharePoint Framework","tier":"2"},{"slug":"office-skype-business","name":"Skype for Business","tier":"2"},{"slug":"office-teams","name":"Teams","tier":"2"},{"slug":"office-visio","name":"Visio","tier":"2"},{"slug":"office-word","name":"Word","tier":"2"},{"slug":"office-yammer","name":"Yammer","tier":"2"}]},{"product":{"slug":"power-platform","name":"Power platform","tier":"1"},"subProducts":[{"slug":"common-data-service","name":"Common Data Service for Apps","tier":"2"},{"slug":"flow","name":"Microsoft Flow","tier":"2"},{"slug":"power-bi","name":"Power BI","tier":"2"},{"slug":"powerapps","name":"PowerApps","tier":"2"}]},{"product":{"slug":"skype","name":"Skype","tier":"1"},"subProducts":[]},{"product":{"slug":"vs","name":"Visual Studio","tier":"1"},"subProducts":[{"slug":"vs-code","name":"Visual Studio Code","tier":"2"},{"slug":"xamarin","name":"Xamarin","tier":"2"}]},{"product":{"slug":"windows","name":"Windows","tier":"1"},"subProducts":[{"slug":"windows-uwp","name":"Universal Windows Platform (UWP)","tier":"2"},{"slug":"windows-wpf","name":"Windows Presentation Foundation (WPF)","tier":"2"}]}];
        let prompts = {
            askForModuleId: () => {
                let moduleTitle = generator.options['moduleTitle'];
                if (moduleTitle && validator.validateNonEmpty(moduleTitle)) {
                    // Provided via argument. No need to prompt.
                    generator.outputConfig.moduleTitle = moduleTitle;
                    generator.outputConfig.moduleTitleId = generator.convertToId(moduleTitle);
                    return Promise.resolve();
                }

                return generator.prompt({
                    type: 'input',
                    name: 'moduleTitle',
                    message: 'What\'s the title for your module (with appropriate capitalization and spaces)?',
                    validate: validator.validateNonEmpty
                }).then(moduleTitleAnswer => {
                    generator.outputConfig.moduleTitle = moduleTitleAnswer.moduleTitle;
                    generator.outputConfig.moduleTitleId = generator.convertToId(moduleTitleAnswer.moduleTitle);
                });
            },
            // TODO: description?
            askForPublishDate: () => {
                let modulePublishDate = generator.options['modulePublishDate'];
                if (modulePublishDate && validator.validatePublishDateString(modulePublishDate)) {
                    // Provided via argument. No need to prompt.
                    generator.outputConfig.modulePublishDate = modulePublishDate;
                    return Promise.resolve();
                }

                return generator.prompt({
                    type: 'input',
                    name: 'modulePublishDate',
                    message: 'What is the publish date of this module ("MM/dd/yyyy")?',
                    /**
                     *
                     * @param {date} Date
                     */
                    default: (function (date) {
                        let month = date.getMonth() + 1; // because JavaScript reasons (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)
                        let day = date.getDate();
                        let year = date.getFullYear();
                        /**
                         *
                         * @param {source} string
                         * @param {pad} string
                         * @param {length} number
                         */
                        let leftPad = function(source, pad, length) {
                            let paddedResult = source + ""; // Make sure it's really a string.
                            while (paddedResult.length < length) {
                                paddedResult = pad + paddedResult;
                            }
                            return paddedResult;
                        };
                        return leftPad(month, "0", 2) + "/" + leftPad(day, "0", 2) + "/" + year;
                    })(new Date()),
                    validate: validator.validatePublishDateString
                }).then(modulePublishDateAnswer => {
                    generator.outputConfig.modulePublishDate = modulePublishDateAnswer.modulePublishDate;
                });
            },
            askForBadgeIconUrl: () => {
                let moduleBadgeIconUrl = generator.options['moduleBadgeIconUrl'];
                if (moduleBadgeIconUrl) {
                    // Module name provided via argument. No need to prompt.
                    generator.outputConfig.moduleBadgeIconUrl = moduleBadgeIconUrl;
                    return Promise.resolve();
                }

                return generator.prompt({
                    type: 'input',
                    name: 'moduleBadgeIconUrl',
                    message: 'What\'s the URL of your module\'s badge icon?',
                    default: 'http://via.placeholder.com/120x120'
                }).then(moduleBadgeIconUrlAnswer => {
                    generator.outputConfig.moduleBadgeIconUrl = moduleBadgeIconUrlAnswer.moduleBadgeIconUrl;
                });
            },
            askForAuthorGitHubId: () => {
                let storageKey = 'GitHubId';
                let moduleAuthorGitHubId = generator.options['moduleAuthorGitHubId'];
                if (moduleAuthorGitHubId) {
                    // Provided via argument. No need to prompt.
                    generator.outputConfig.moduleAuthorGitHubId = moduleAuthorGitHubId;
                    return Promise.resolve();
                }

                generator.log(this.config.get(storageKey));

                return generator.prompt({
                    type: 'input',
                    name: 'moduleAuthorGitHubId',
                    message: 'What is the GitHub username for the author?',
                    default: this.config.get(storageKey)
                }).then(moduleAuthorGitHubIdAnswer => {
                    generator.log("got a value");
                    if (!this.config.get(storageKey)) {
                        generator.log("need to store value");
                        this.config.set(storageKey, moduleAuthorGitHubIdAnswer.moduleAuthorGitHubId);

                        generator.log(this.config.get(storageKey));
                    }
                    generator.outputConfig.moduleAuthorGitHubId = moduleAuthorGitHubIdAnswer.moduleAuthorGitHubId;
                });
            },
            askForAuthorMicrosoftId: () => {
                let moduleAuthorMicrosoftId = generator.options['moduleAuthorMicrosoftId'];
                if (moduleAuthorMicrosoftId) {
                    // Provided via argument. No need to prompt.
                    generator.outputConfig.moduleAuthorMicrosoftId = moduleAuthorMicrosoftId;
                    return Promise.resolve();
                }

                return generator.prompt({
                    type: 'input',
                    name: 'moduleAuthorMicrosoftId',
                    message: 'What is the Microsoft username for the author?'
                }).then(moduleAuthorMicrosoftIdAnswer => {
                    generator.outputConfig.moduleAuthorMicrosoftId = moduleAuthorMicrosoftIdAnswer.moduleAuthorMicrosoftId;
                });
            },
            askForLearnContactMicrosoftId: () => {
                let moduleLearnContactMicrosoftId = generator.options['moduleLearnContactMicrosoftId'];
                if (moduleLearnContactMicrosoftId) {
                    // Provided via argument. No need to prompt.
                    generator.outputConfig.moduleLearnContactMicrosoftId = moduleLearnContactMicrosoftId;
                    return Promise.resolve();
                }

                return generator.prompt({
                    type: 'input',
                    name: 'moduleLearnContactMicrosoftId',
                    message: 'What is the Microsoft username for the Learn team maintainer?',
                    default: generator.outputConfig.moduleAuthorMicrosoftId
                }).then(moduleLearnContactMicrosoftIdAnswer => {
                    generator.outputConfig.moduleLearnContactMicrosoftId = moduleLearnContactMicrosoftIdAnswer.moduleLearnContactMicrosoftId;
                });
            },
            // TODO: summary?
            // TODO: Objective task statement 1?
            // TODO: Objective task statement ..?
            // TODO: Prerequisite ask (else none)?
            // TODO: Prerequisite 1?
            // TODO: Prerequisite ..?
            askForMicrosoftProductValue: () => {
                return generator.prompt({
                    type: 'list',
                    name: 'moduleMsProdValue',
                    message: 'Select a Microsoft Product value:',
                    choices: [
                        // Pulled from https://review.docs.microsoft.com/en-us/new-hope/information-architecture/metadata/taxonomies?branch=master#learn-product
                        // Via jQuery call: `$("#product").next().next().find("tr").filter(function (i, e) { return $(e).find("td:last").text() === "1"; }).find("td:first").map(function () { return "{\n\tvalue: \"" + $(this).text() + "\"\n},\n"; }).get().join("")`
                        // FUTURE: Pull from an up-to-date list directly.
                        // TODO: Determine if name is required or if it can be inferred from value.
                        {
                            value: "learning-dotnet"
                        },
                        {
                            value: "learning-azure"
                        },
                        {
                            value: "learning-dynamics"
                        },
                        {
                            value: "learning-office"
                        },
                        {
                            value: "learning-power-platform"
                        },
                        {
                            value: "learning-skype"
                        },
                        {
                            value: "learning-vs"
                        },
                        {
                            value: "learning-windows"
                        }
                    ]
                }).then(moduleMsProdValueAnswer => {
                    generator.outputConfig.moduleMsProdValue = moduleMsProdValueAnswer.moduleMsProdValue;
                });
            },
            askForLevel: () => {
                return generator.prompt({
                    type: 'list',
                    name: 'moduleLevel',
                    message: 'Select a module level:',
                    choices: [
                        // Pulled from https://review.docs.microsoft.com/en-us/new-hope/information-architecture/metadata/taxonomies?branch=master#learn-product
                        // Via jQuery call: `$("#level").next().find("tr").find("td:first").map(function () { return "{\n\tvalue: \"" + $(this).text() + "\"\n},\n"; }).get().join("")`
                        // FUTURE: Pull from an up-to-date list directly.
                        {
                            value: "beginner"
                        },
                        {
                            value: "intermediate"
                        },
                        {
                            value: "advanced"
                        }
                    ]
                }).then(moduleLevelAnswer => {
                    generator.outputConfig.moduleLevel = moduleLevelAnswer.moduleLevel;
                });
            },
            askForFirstRole: () => {
                return generator.prompt({
                    type: 'list',
                    name: 'moduleFirstRole',
                    message: 'Select a first module role (others added manually):',
                    choices: [
                        // Pulled from https://review.docs.microsoft.com/en-us/new-hope/information-architecture/metadata/taxonomies?branch=master#learn-product
                        // Via jQuery call: `$("#role").next().find("tr").find("td:first").map(function () { return "{\n\tname: \"" + $(this).text().replace("-", " ") + "\",\n\tvalue: \"" + $(this).text() + "\"\n},\n"; }).get().join("")`
                        // FUTURE: Pull from an up-to-date list directly.
                        {
                            name: "administrator",
                            value: "administrator"
                        },
                        {
                            name: "business analyst",
                            value: "business analyst"
                        },
                        {
                            name: "business user",
                            value: "business user"
                        },
                        {
                            name: "developer",
                            value: "developer"
                        },
                        {
                            name: "functional consultant",
                            value: "functional consultant"
                        },
                        {
                            name: "solution architect",
                            value: "solution architect"
                        }
                    ]
                }).then(moduleFirstRoleAnswer => {
                    generator.outputConfig.moduleFirstRole = moduleFirstRoleAnswer.moduleFirstRole;
                });
            },
            askForFirstProduct: () => {
                return generator.prompt({
                    type: 'list',
                    name: 'moduleFirstProduct',
                    message: 'Select first module product (others added manually):',
                    choices: _.map(learnProducts, function (tier1Product) { return { name: tier1Product.product.name, value: tier1Product.product.slug }; })
                }).then(moduleFirstProductAnswer => {
                    generator.outputConfig.moduleFirstProduct = moduleFirstProductAnswer.moduleFirstProduct;
                });
            },
            askForSecondProduct: () => {
                return generator.prompt({
                    type: 'list',
                    name: 'moduleSecondProduct',
                    message: 'Select second module product (others added manually):',
                    choices: _.map(_.filter(learnProducts, function (tier1Product) { return generator.outputConfig.moduleFirstProduct && tier1Product.product.slug === generator.outputConfig.moduleFirstProduct; })[0].subProducts, function (subProduct) { return { name: subProduct.name, value: subProduct.slug }; })
                }).then(moduleSecondProductAnswer => {
                    generator.outputConfig.moduleSecondProduct = moduleSecondProductAnswer.moduleSecondProduct;
                });
            }//,
        };

        // Ask prompt system borrowed from VS Code extension generator.
        // Run all prompts in sequence. Results can be ignored.
        let result = Promise.resolve();
        for (let taskName in prompts) {
            let prompt = prompts[taskName];
            result = result.then(_ => {
                return new Promise((s, r) => {
                    setTimeout(_ => prompt().then(s, r), 0); // set timeout is required, otherwise node hangs
                });
            })
        }
        return result;
    }

    writing() {
        this.sourceRoot(path.join(__dirname, './templates/module'));
        this._writingModule();
    }

    _writingModule() {
        // Set up context for `copyTpl` template values.
        let context = this.outputConfig;

        // Copy over [templated] initial ./index.yml
        this.fs.copyTpl(this.sourceRoot() + '/index.yml', context.moduleTitleId + '/index.yml', context);
        // TODO: Append block to root/parent achievements.yml.
        // Copy over [templated] some achievement boilerplate for root achievements.yml file.
        this.fs.copyTpl(this.sourceRoot() + '/TODO-copy-to-achievements.yml', context.moduleTitleId + '/TODO-copy-to-achievements.yml', context);
        // Copy over [templated] initial unit YAML modules (./unit-name.yml)
        this.fs.copyTpl(this.sourceRoot() + '/1-introduction.yml', context.moduleTitleId + '/1-introduction.yml', context);
        this.fs.copyTpl(this.sourceRoot() + '/6-summary.yml', context.moduleTitleId + '/6-summary.yml', context);
        // Copy over initial ./includes folder
        this.fs.copy(this.sourceRoot() + '/includes', context.moduleTitleId + '/includes');
        // TODO: Copy over or create initial ./media folder (but Yeoman doesn't like empty folders)
        // this.fs.copy(this.sourceRoot() + '/media', context.moduleTitleId + '/media');
    }
};