import dayjs from "dayjs";
import logger from "pino";

const log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamps: () => `,'time': ${dayjs().format()}`,
});

export default log;
