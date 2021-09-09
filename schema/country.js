const countries = [
	{
		id: 1,
		it: "Italia",
		en: "Italy"
	},
	{
		id: 2,
		it: "Regno Unito",
		en: "United Kingdom"
	}
];

let callNumber = 0

module.exports = {
	resolvers: {
		Query: {
			getCountry: (parent, {countryId}) => {
				let countryFound = {}
				countries.forEach((country) => {
					if (country.id === countryId) {
						countryFound = country
					}
				})

				return countryFound
			}
		},
		Country: {
			name: (parent, data, {lang}) => {
				callNumber++
				console.log(`country.name call: ${callNumber}`, parent)
				return parent[lang]
			}
		}
	},
	typeDefs: `
		type Country {
			id: Int!
			name: String!
		}

		type Query {
			getCountry(countryId: Int!): Country
		}
	`
}