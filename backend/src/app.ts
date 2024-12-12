import { startServer } from './expressServer';
import { demoCleanup, tokenCleanUp } from './scripts/cronJobs';


tokenCleanUp.start();
// demoCleanup.start();
startServer();

