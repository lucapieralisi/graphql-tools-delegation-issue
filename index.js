const {ApolloServer} = require("apollo-server")
const {makeExecutableSchema, mergeSchemas} = require('@graphql-tools/schema')
const {delegateToSchema} = require('@graphql-tools/delegate')

const userSchema = require("./schema/user")
const countrySchema = require("./schema/country")

const mergedSchema = mergeSchemas({
	schemas: [
		makeExecutableSchema(userSchema),
		makeExecutableSchema(countrySchema)
	],
	typeDefs: `
		extend type User {
			country: Country!
		}
	`,
	resolvers: {
		User: {
			country({countryId}, args, context, info) {
				return delegateToSchema({
					schema: info.schema,
					operation: "query",
					fieldName: "getCountry",
					args: {
		  				countryId: countryId,
					},
					context,
					info,
	  			});
			}
		}
	}
})

const server = new ApolloServer({
	schema: mergedSchema,
	context: {lang: "en"}
});

server.listen().then(({url}) => {
	console.log(`🚀  Server ready at ${url}`);
});