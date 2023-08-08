const getallLogger = (req, res) => {
    req.logger.fatal('Prueba Fatal')
    req.logger.error('Prueba Error');
    req.logger.warning('Prueba Warning');
    req.logger.info('Prueba info');
    req.logger.http('Prueba http');
    req.logger.debug('Prueba Debug');
};

export { getallLogger };