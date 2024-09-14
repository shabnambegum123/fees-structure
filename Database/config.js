module.exports = {
   function(result) {
    
    let config = {};
    switch (result) {
      case "mysql":
        return config = {
          database: "firstproject",
          user: "root",
          password: "1511",
          host: "127.0.0.1",
          dialect: "mysql",
        };

      case "postgres":
        console.log("resylt" , result)
        return config = {
          database: "Feestructure",
          user: "postgres",
          password: "1511",
          host: "localhost",
          dialect: "postgres",
        };
    
      default:
        return config = {
          database: "firstproject",
          user: "root",
          password: "1511",
          host: "127.0.0.1",
          dialect: "mysql",
        };
    }
  },
};
