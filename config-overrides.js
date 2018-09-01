const rewireScss = require('react-app-rewire-scss');

module.exports = (config, env) => {
	config = rewireScss(config, env);
	return config;
};