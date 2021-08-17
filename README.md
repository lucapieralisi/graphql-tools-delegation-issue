# graphql-tools-delegation-issue

Steps to reproduce the behavior:
1) Run npm install, then npm start.

2) Visit http://localhost:4000/ and run query:
`query ExampleQuery {
  users {
    id,
    country {id, name}
  }
}`

3) See the logs in the console and notice that the resolver `name` of Type `Country` was called twice (with different result) for every user:
> country.name call: 1 { id: 1, it: 'Italia', en: 'Italy' }
> country.name call: 2 [Object: null prototype] { id: 1, name: 'countryName' }
> country.name call: 3 { id: 2, it: 'Regno Unito', en: 'United Kingdom' }
> country.name call: 4 [Object: null prototype] { id: 2, name: 'countryName' }
