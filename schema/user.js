const users = [
	{
		id: 1,
		username: "username1",
		countryId: 1
	},
	{
		id: 2,
		username: "username2",
		countryId: 2
	}
];

module.exports = {
	resolvers: {
		Query: {
			users: () => users
		}
	},
	typeDefs: `
		type User {
			id: Int!
			username: String!
		}

		type Query {
			users: [User]
		}
	`
}