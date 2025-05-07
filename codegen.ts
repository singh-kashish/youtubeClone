import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://nola.stepzen.net/api/peeking-whale/__graphql": {
        headers: {
          Authorization:
            "apikey nola::stepzen.net+1000::669b1fc4c2367f35add977774d8225bb6bfe8c6398e66dee0d5f8e678b20c351",
        },
      },
    },
  ],
  documents: ["src/**/*.tsx", "graphql/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/graphql.ts": {
      plugins: ["typescript","typescript-operations","typescript-react-apollo"],
    },  
  },
};

export default config;
