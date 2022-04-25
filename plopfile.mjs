import { plopGenerators } from './plop-templates/index.mjs';

export default function (plop) {
    plopGenerators.forEach((generator) => {
        plop.setGenerator(generator.name, generator.config);
    });
}
