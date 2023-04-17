export const EnvConfiguration = () => {
  return {
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGO_LOCAL,
    port: process.env.PORT || 3002,
  };
};
