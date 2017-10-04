import seneca from 'seneca';
import Commands from './commands';
import senecaConfig from './config/seneca'

const start = async () => {
  seneca()
    .use(Commands.start())
    .listen(senecaConfig);
  // start server
};
export default { start };
