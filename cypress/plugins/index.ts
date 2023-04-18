import istanbul from 'istanbul-lib-coverage';

module.exports = (on, config) => {
  on('task', {
    coverage: () => {
      const coverage = global.__coverage__ || {};
      return coverage;
    },
  });
};
