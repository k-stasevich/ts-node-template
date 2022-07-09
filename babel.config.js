module.exports = {
  presets: [
    //
    ['@babel/preset-env', { targets: { node: 'current' } }],
    [
      '@babel/preset-typescript',
      {
        // Allow to use "declare <field>" for sequelize in model definitions
        allowDeclareFields: true,
      },
    ],
  ],
  plugins: [],
};
