const {ApolloServer} = require("apollo-server")
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {stitchSchemas} = require("@graphql-tools/stitch")
const {delegateToSchema} = require('@graphql-tools/delegate')

const userSchema = require("./schema/user")
const countrySchema = require("./schema/country")

const gatewaySchema = stitchSchemas({
	subschemas: [
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
			country: {
				selectionSet: `{countryId}`,
				resolve({countryId}, args, context, info) {
					console.log("delegateToSchema: ", countryId)
					return delegateToSchema({
						schema: info.schema,
						operation: "query",
						fieldName: "getCountry",
						args: {
							countryId: countryId,
						},
						context,
						info,
					})
				}
			}
		}
	}
})

const server = new ApolloServer({
	schema: gatewaySchema,
	context: {lang: "en"}
})

server.listen(4005).then(({url}) => {
	console.log(`🚀  Server ready at ${url}`);
})