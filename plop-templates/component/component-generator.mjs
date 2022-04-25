export const componentGenerator = {
    name: 'component',
    config: {
        description: 'vue component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'component name',
            },
            {
                type: 'input',
                name: 'path',
                message: 'component path',
                default: 'components',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/{{path}}/{{name}}/{{name}}.vue',
                templateFile: 'plop-templates/component/component.hbs',
            },
            {
                type: 'add',
                path: 'src/{{path}}/{{name}}/{{name}}.spec.js',
                templateFile: 'plop-templates/component/component.spec.hbs',
            },
            {
                type: 'add',
                path: 'src/{{path}}/{{name}}/{{name}}.stories.js',
                templateFile: 'plop-templates/component/component.stories.hbs',
            },
        ],
    },
};
