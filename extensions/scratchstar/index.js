const scratchStar = formatMessage=> ({
    name: 'Scratch Star',
    extensionId: 'scratchstar',
    version: '1.0.0',
    supportDevice: ['scratchstar'],
    author: 'Stemstar',
    description: formatMessage({
        id: 'scratchstar.description',
        default: 'Scratch Star.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    helpLink: 'https://code.stemstar.com'
});

module.exports = scratchStar;
