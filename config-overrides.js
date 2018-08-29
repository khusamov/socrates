const rewireScss = require('react-app-rewire-scss');

module.exports = function override(config, env) {
	config = rewireScss(config, env);
	return config;
}